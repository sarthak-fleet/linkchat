const API_URL = process.env.SAASMAKER_API_URL!;
const ADMIN_KEY = process.env.SAASMAKER_ADMIN_KEY!;

interface SaasMakerOptions {
  apiKey?: string;
}

function headers(opts?: SaasMakerOptions): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Project-Key': opts?.apiKey || ADMIN_KEY,
  };
}

export async function createIndex(apiKey: string, name: string): Promise<{ id: string }> {
  const res = await fetch(`${API_URL}/v1/indexes`, {
    method: 'POST',
    headers: headers({ apiKey }),
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`Failed to create index: ${await res.text()}`);
  return res.json();
}

export async function ingestDocument(
  apiKey: string,
  indexId: string,
  content: string,
  metadata?: Record<string, unknown>
): Promise<{ id: string; chunks_created: number }> {
  const res = await fetch(`${API_URL}/v1/indexes/${indexId}/documents`, {
    method: 'POST',
    headers: headers({ apiKey }),
    body: JSON.stringify({ content, metadata }),
  });
  if (!res.ok) throw new Error(`Failed to ingest document: ${await res.text()}`);
  return res.json();
}

export async function deleteDocument(apiKey: string, indexId: string, docId: string): Promise<void> {
  const res = await fetch(`${API_URL}/v1/indexes/${indexId}/documents/${docId}`, {
    method: 'DELETE',
    headers: headers({ apiKey }),
  });
  if (!res.ok) throw new Error(`Failed to delete document: ${await res.text()}`);
}

export async function search(
  apiKey: string,
  indexId: string,
  query: string,
  topK = 5
): Promise<{ results: { document_id: string; chunk_content: string; score: number }[] }> {
  const res = await fetch(`${API_URL}/v1/indexes/${indexId}/search`, {
    method: 'POST',
    headers: headers({ apiKey }),
    body: JSON.stringify({ query, top_k: topK }),
  });
  if (!res.ok) throw new Error(`Failed to search: ${await res.text()}`);
  return res.json();
}

export async function chatCompletion(
  apiKey: string,
  indexId: string,
  query: string,
  systemPrompt?: string
): Promise<ReadableStream> {
  const res = await fetch(`${API_URL}/v1/ai/rag`, {
    method: 'POST',
    headers: headers({ apiKey }),
    body: JSON.stringify({
      index_id: indexId,
      query,
      system_prompt: systemPrompt,
      stream: true,
    }),
  });
  if (!res.ok) throw new Error(`Chat failed: ${await res.text()}`);
  return res.body!;
}

export async function generateCompletion(
  apiKey: string,
  indexId: string,
  query: string,
  systemPrompt: string
): Promise<string> {
  const res = await fetch(`${API_URL}/v1/ai/rag`, {
    method: 'POST',
    headers: headers({ apiKey }),
    body: JSON.stringify({
      index_id: indexId,
      query,
      system_prompt: systemPrompt,
      stream: false,
    }),
  });
  if (!res.ok) throw new Error(`Generation failed: ${await res.text()}`);
  const data = await res.json();
  return data.response ?? data.text ?? JSON.stringify(data);
}

export function parseAIResponse<T>(raw: string): T {
  // Try direct JSON parse first
  try {
    return JSON.parse(raw);
  } catch {
    // Extract JSON from markdown code blocks
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) return JSON.parse(match[1].trim());
    // Try finding first { to last }
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end > start) return JSON.parse(raw.slice(start, end + 1));
    throw new Error('Could not parse AI response as JSON');
  }
}
