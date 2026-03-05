import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages, infoBlocks } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ pageId: string; blockId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pageId, blockId } = await params;

  const page = await db.query.pages.findFirst({
    where: and(eq(pages.id, pageId), eq(pages.userId, session.user.id)),
  });

  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await db
    .delete(infoBlocks)
    .where(and(eq(infoBlocks.id, blockId), eq(infoBlocks.pageId, pageId)));

  return NextResponse.json({ success: true });
}
