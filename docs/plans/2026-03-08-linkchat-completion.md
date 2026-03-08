# LinkChat Completion — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete remaining features (AI key setup, info block ingestion, rate limiting, input validation) and deploy to Vercel.

**Architecture:** Add `smDocumentId` to infoBlocks schema for saas-maker sync. Auto-provision saas-maker index on AI key save. Rate limit chat API with in-memory sliding window. Validate inputs at API boundaries.

**Tech Stack:** Next.js 16, Drizzle ORM, Turso, saas-maker API, Vercel

---

### Task 1: Add `smDocumentId` to infoBlocks schema + migration

**Files:**
- Modify: `src/db/schema.ts:106-117`

**Step 1: Add smDocumentId column**

In `src/db/schema.ts`, add to the `infoBlocks` table:

```typescript
smDocumentId: text('smDocumentId'), // saas-maker document ID for RAG sync
```

Add it after the `content` field, before `sortOrder`.

**Step 2: Generate and run migration**

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

**Step 3: Commit**

```bash
git add src/db/schema.ts drizzle/
git commit -m "feat: add smDocumentId to infoBlocks for saas-maker sync"
```

---

### Task 2: AI Key Setup API + Auto-provision saas-maker index

**Files:**
- Create: `src/app/api/settings/ai-key/route.ts`

**Step 1: Create the API route**

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createIndex } from '@/lib/saasmaker';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db.select({ smApiKey: users.smApiKey }).from(users).where(eq(users.id, session.user.id));
  return NextResponse.json({ hasKey: !!user?.smApiKey });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { aiKey } = body;

  if (!aiKey?.trim()) {
    return NextResponse.json({ error: 'AI key is required' }, { status: 400 });
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  let indexId = user.smIndexId;

  // Auto-create saas-maker index if none exists
  if (!indexId) {
    try {
      const adminKey = process.env.SAASMAKER_ADMIN_KEY!;
      const index = await createIndex(adminKey, `linkchat-${session.user.id}`);
      indexId = index.id;
    } catch {
      return NextResponse.json({ error: 'Failed to initialize chat index' }, { status: 502 });
    }
  }

  await db
    .update(users)
    .set({ smApiKey: aiKey.trim(), smIndexId: indexId })
    .where(eq(users.id, session.user.id));

  return NextResponse.json({ success: true });
}
```

**Step 2: Commit**

```bash
git add src/app/api/settings/ai-key/route.ts
git commit -m "feat: add AI key setup API with auto-provisioned saas-maker index"
```

---

### Task 3: AI Key Settings UI in Dashboard

**Files:**
- Create: `src/components/dashboard/ai-key-settings.tsx`
- Modify: `src/app/dashboard/memory/page.tsx` (add component above chat settings)

**Step 1: Create the AI key settings component**

```tsx
'use client';

import { useState } from 'react';

export function AiKeySettings({ hasKey }: { hasKey: boolean }) {
  const [aiKey, setAiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [configured, setConfigured] = useState(hasKey);

  async function handleSave() {
    if (!aiKey.trim()) return;
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/settings/ai-key', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiKey: aiKey.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Failed to save');
        return;
      }

      setMessage('AI key saved successfully');
      setConfigured(true);
      setAiKey('');
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-1 text-lg font-semibold text-white">AI API Key</h2>
      <p className="mb-4 text-sm text-gray-400">
        {configured
          ? 'Your AI key is configured. Enter a new key to update it.'
          : 'Add your AI API key to enable the chat feature.'}
      </p>

      <div className="flex gap-3">
        <input
          type="password"
          value={aiKey}
          onChange={(e) => setAiKey(e.target.value)}
          placeholder={configured ? '••••••••••••••••' : 'Enter your AI API key'}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30"
        />
        <button
          onClick={handleSave}
          disabled={saving || !aiKey.trim()}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {message && (
        <p className={`mt-2 text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      {!configured && (
        <p className="mt-3 text-xs text-yellow-400/80">
          Chat will not work until an AI key is configured.
        </p>
      )}
    </div>
  );
}
```

**Step 2: Add to memory page**

In `src/app/dashboard/memory/page.tsx`, import `AiKeySettings` and `users` table, query `hasKey`, and render `<AiKeySettings hasKey={hasKey} />` above the ChatSettings section.

**Step 3: Commit**

```bash
git add src/components/dashboard/ai-key-settings.tsx src/app/dashboard/memory/page.tsx
git commit -m "feat: add AI key settings UI in dashboard"
```

---

### Task 4: Info Block Ingestion — sync to saas-maker on create/delete

**Files:**
- Modify: `src/app/api/pages/[pageId]/info/route.ts` (POST — ingest after insert)
- Modify: `src/app/api/pages/[pageId]/info/[blockId]/route.ts` (DELETE — delete doc from index)

**Step 1: Update POST to ingest into saas-maker**

After inserting the info block, check if user has `smApiKey` and `smIndexId`. If so, call `ingestDocument` with the admin key, and update the block's `smDocumentId`.

```typescript
// After the insert, add:
import { users } from '@/db/schema';
import { ingestDocument } from '@/lib/saasmaker';

// ... after const [block] = await db.insert(...).returning();

// Ingest into saas-maker if configured
const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
if (user?.smIndexId) {
  try {
    const adminKey = process.env.SAASMAKER_ADMIN_KEY!;
    const doc = await ingestDocument(adminKey, user.smIndexId, content, {
      type,
      title: title || undefined,
      blockId: block.id,
    });
    await db.update(infoBlocks).set({ smDocumentId: doc.id }).where(eq(infoBlocks.id, block.id));
    block.smDocumentId = doc.id;
  } catch {
    // Non-blocking: block saved but ingestion failed
    console.error('Failed to ingest info block into saas-maker');
  }
}
```

**Step 2: Update DELETE to remove from saas-maker**

Before deleting the info block, check if it has a `smDocumentId`. If so, delete from saas-maker.

```typescript
import { users } from '@/db/schema';
import { deleteDocument } from '@/lib/saasmaker';

// Before the delete, look up the block and user:
const [block] = await db.select().from(infoBlocks).where(and(eq(infoBlocks.id, blockId), eq(infoBlocks.pageId, pageId)));

if (block?.smDocumentId) {
  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
  if (user?.smIndexId) {
    try {
      const adminKey = process.env.SAASMAKER_ADMIN_KEY!;
      await deleteDocument(adminKey, user.smIndexId, block.smDocumentId);
    } catch {
      console.error('Failed to delete document from saas-maker');
    }
  }
}

// Then delete from DB
await db.delete(infoBlocks).where(and(eq(infoBlocks.id, blockId), eq(infoBlocks.pageId, pageId)));
```

**Step 3: Commit**

```bash
git add src/app/api/pages/[pageId]/info/route.ts src/app/api/pages/[pageId]/info/[blockId]/route.ts
git commit -m "feat: sync info blocks to saas-maker on create/delete"
```

---

### Task 5: Rate Limiting on Chat API

**Files:**
- Create: `src/lib/rate-limit.ts`
- Modify: `src/app/api/chat/[slug]/route.ts`

**Step 1: Create rate limiter**

```typescript
const windows = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 20;

export function rateLimit(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = windows.get(key) ?? [];

  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    windows.set(key, valid);
    return { ok: false, remaining: 0 };
  }

  valid.push(now);
  windows.set(key, valid);

  // Cleanup old keys periodically
  if (windows.size > 10_000) {
    for (const [k, v] of windows) {
      if (v.every((t) => now - t >= WINDOW_MS)) windows.delete(k);
    }
  }

  return { ok: true, remaining: MAX_REQUESTS - valid.length };
}
```

**Step 2: Apply to chat route**

At the top of the POST handler in `src/app/api/chat/[slug]/route.ts`:

```typescript
import { rateLimit } from '@/lib/rate-limit';

// Inside POST, before any DB queries:
const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
const { ok, remaining } = rateLimit(ip);
if (!ok) {
  return new Response(JSON.stringify({ error: 'Too many requests' }), {
    status: 429,
    headers: { 'Retry-After': '60' },
  });
}
```

**Step 3: Commit**

```bash
git add src/lib/rate-limit.ts src/app/api/chat/[slug]/route.ts
git commit -m "feat: add rate limiting to chat API (20 req/min/IP)"
```

---

### Task 6: Input Validation

**Files:**
- Modify: `src/app/api/pages/route.ts` (slug + displayName validation on POST)
- Modify: `src/app/api/pages/[pageId]/route.ts` (slug validation on PUT)
- Modify: `src/app/api/pages/[pageId]/links/route.ts` (URL validation on POST)
- Modify: `src/app/api/pages/[pageId]/info/route.ts` (content length on POST)

**Step 1: Add validation helpers**

Create `src/lib/validation.ts`:

```typescript
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const MAX_CONTENT_LENGTH = 50_000; // 50KB
export const MAX_BIO_LENGTH = 500;
export const MAX_TITLE_LENGTH = 100;
```

**Step 2: Apply to pages POST**

In `src/app/api/pages/route.ts`, after the `!slug || !displayName` check:

```typescript
import { isValidSlug, MAX_TITLE_LENGTH } from '@/lib/validation';

if (!isValidSlug(slug)) {
  return NextResponse.json(
    { error: 'Slug must be 3-50 chars, lowercase alphanumeric and hyphens only' },
    { status: 400 },
  );
}

if (displayName.length > MAX_TITLE_LENGTH) {
  return NextResponse.json(
    { error: 'Display name too long (max 100 chars)' },
    { status: 400 },
  );
}
```

**Step 3: Apply to pages PUT**

In `src/app/api/pages/[pageId]/route.ts`, validate slug if provided:

```typescript
import { isValidSlug, MAX_BIO_LENGTH } from '@/lib/validation';

if (slug && !isValidSlug(slug)) {
  return NextResponse.json(
    { error: 'Slug must be 3-50 chars, lowercase alphanumeric and hyphens only' },
    { status: 400 },
  );
}

if (bio && bio.length > MAX_BIO_LENGTH) {
  return NextResponse.json(
    { error: 'Bio too long (max 500 chars)' },
    { status: 400 },
  );
}
```

**Step 4: Apply URL validation to links POST**

In `src/app/api/pages/[pageId]/links/route.ts`, after `!title || !url` check:

```typescript
import { isValidUrl, MAX_TITLE_LENGTH } from '@/lib/validation';

if (!isValidUrl(url)) {
  return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
}

if (title.length > MAX_TITLE_LENGTH) {
  return NextResponse.json({ error: 'Title too long (max 100 chars)' }, { status: 400 });
}
```

**Step 5: Apply content length validation to info POST**

In `src/app/api/pages/[pageId]/info/route.ts`, after `!type || !content` check:

```typescript
import { MAX_CONTENT_LENGTH } from '@/lib/validation';

if (content.length > MAX_CONTENT_LENGTH) {
  return NextResponse.json(
    { error: 'Content too long (max 50,000 chars)' },
    { status: 400 },
  );
}
```

**Step 6: Commit**

```bash
git add src/lib/validation.ts src/app/api/pages/route.ts src/app/api/pages/[pageId]/route.ts src/app/api/pages/[pageId]/links/route.ts src/app/api/pages/[pageId]/info/route.ts
git commit -m "feat: add input validation (slug, URL, content length)"
```

---

### Task 7: Build verification + Deploy to Vercel

**Step 1: Verify build passes**

```bash
pnpm build
```

**Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Set env vars in Vercel dashboard or via CLI:
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `SAASMAKER_API_URL`
- `SAASMAKER_ADMIN_KEY`
- `NEXT_PUBLIC_APP_URL`

**Step 3: Commit any deployment config**

```bash
git add -A
git commit -m "chore: deployment config"
```
