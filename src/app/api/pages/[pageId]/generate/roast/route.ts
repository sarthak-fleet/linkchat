import { db, ensureProjectsTable } from '@/db';
import { pages, users, infoBlocks, generatedPages } from '@/db/schema';
import type { PageSettings } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { generateCompletion, parseAIResponse } from '@/lib/saasmaker';
import { ROAST_SYSTEM_PROMPT } from '@/lib/ai-prompts';
import { rateLimit } from '@/lib/rate-limit';
import type { RoastContent } from '@/lib/generated-page-types';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;

  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { ok } = rateLimit(`roast:${ip}`);
  if (!ok) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
    });
  }

  await ensureProjectsTable();

  // Get page and user
  const [page] = await db.select().from(pages).where(eq(pages.id, pageId));
  if (!page || !page.roastEnabled) {
    return new Response(JSON.stringify({ error: 'Roast not enabled' }), {
      status: 404,
    });
  }

  const [user] = await db.select().from(users).where(eq(users.id, page.userId));
  if (!user?.smApiKey || !user?.smIndexId) {
    return new Response(JSON.stringify({ error: 'AI not configured' }), {
      status: 503,
    });
  }

  // Check for existing recent roast (cache for 24h)
  const existing = await db
    .select()
    .from(generatedPages)
    .where(
      and(eq(generatedPages.pageId, pageId), eq(generatedPages.type, 'roast'))
    )
    .limit(1);

  if (existing[0]?.status === 'ready' && existing[0].content) {
    return Response.json(existing[0].content);
  }

  // Get body data
  const body = await req.json().catch(() => ({}));
  const { linkTitles = [], projectTitles = [] } = body;

  // Collect all info blocks
  const blocks = await db
    .select()
    .from(infoBlocks)
    .where(eq(infoBlocks.pageId, pageId));

  // Read page settings for roast customization
  const settings = (page.pageSettings as PageSettings | null)?.roast;

  const context = [
    `Name: ${page.displayName}`,
    `Bio: ${page.bio || 'No bio provided'}`,
    `Links: ${linkTitles.join(', ') || 'None'}`,
    `Projects: ${projectTitles.join(', ') || 'None'}`,
    ...blocks.map((b) => `${b.title || b.type}: ${b.content}`),
    ...(settings?.context ? [`Additional context from the person: ${settings.context}`] : []),
  ].join('\n\n');

  // Build system prompt with tone preference
  let systemPrompt = ROAST_SYSTEM_PROMPT;
  if (settings?.tone && settings.tone !== 'Savage') {
    systemPrompt += `\n\nIMPORTANT: Write the roast in a "${settings.tone}" tone. ${
      settings.tone === 'Friendly'
        ? 'Keep it light-hearted and good-natured. Tease rather than roast.'
        : settings.tone === 'Sarcastic'
          ? 'Be dripping with sarcasm and irony. Use dry wit and deadpan humor.'
          : ''
    }`;
  }

  try {
    const raw = await generateCompletion(
      user.smApiKey,
      user.smIndexId,
      `Roast this person based on their profile:\n\n${context}`,
      systemPrompt
    );

    const roast = parseAIResponse<RoastContent>(raw);

    // Upsert generated page
    if (existing[0]) {
      await db
        .update(generatedPages)
        .set({
          content: roast as any,
          status: 'ready',
          updatedAt: new Date(),
        })
        .where(eq(generatedPages.id, existing[0].id));
    } else {
      await db.insert(generatedPages).values({
        pageId,
        type: 'roast',
        content: roast as any,
        status: 'ready',
      });
    }

    return Response.json(roast);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to generate roast' }), {
      status: 500,
    });
  }
}
