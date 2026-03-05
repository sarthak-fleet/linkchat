import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages, infoBlocks } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pageId } = await params;

  const page = await db.query.pages.findFirst({
    where: and(eq(pages.id, pageId), eq(pages.userId, session.user.id)),
  });

  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const blocks = await db.query.infoBlocks.findMany({
    where: eq(infoBlocks.pageId, pageId),
    orderBy: [infoBlocks.sortOrder],
  });

  return NextResponse.json(blocks);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pageId } = await params;

  const page = await db.query.pages.findFirst({
    where: and(eq(pages.id, pageId), eq(pages.userId, session.user.id)),
  });

  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const { type, title, content } = body;

  if (!type || !content) {
    return NextResponse.json(
      { error: 'type and content are required' },
      { status: 400 },
    );
  }

  // Auto-determine sortOrder
  const existing = await db.query.infoBlocks.findMany({
    where: eq(infoBlocks.pageId, pageId),
    orderBy: [desc(infoBlocks.sortOrder)],
    limit: 1,
  });

  const nextSort = existing.length > 0 ? (existing[0].sortOrder ?? 0) + 1 : 0;

  const [block] = await db
    .insert(infoBlocks)
    .values({
      pageId,
      type,
      title: title || null,
      content,
      sortOrder: nextSort,
    })
    .returning();

  return NextResponse.json(block, { status: 201 });
}
