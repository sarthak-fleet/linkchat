import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages, links } from '@/db/schema';
import { and, eq, desc } from 'drizzle-orm';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify page ownership
  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.userId, session.user.id)));

  if (!page)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const pageLinks = await db
    .select()
    .from(links)
    .where(eq(links.pageId, pageId))
    .orderBy(links.sortOrder);

  return NextResponse.json(pageLinks);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify page ownership
  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.userId, session.user.id)));

  if (!page)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { title, url } = body;

  if (!title || !url) {
    return NextResponse.json(
      { error: 'title and url are required' },
      { status: 400 },
    );
  }

  // Auto-increment sortOrder
  const [maxLink] = await db
    .select({ sortOrder: links.sortOrder })
    .from(links)
    .where(eq(links.pageId, pageId))
    .orderBy(desc(links.sortOrder))
    .limit(1);

  const nextOrder = (maxLink?.sortOrder ?? -1) + 1;

  const [link] = await db
    .insert(links)
    .values({
      pageId,
      title,
      url,
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(link, { status: 201 });
}
