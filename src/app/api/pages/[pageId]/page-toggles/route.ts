import { auth } from '@/lib/auth';
import { db, ensureProjectsTable } from '@/db';
import { pages } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function PUT(req: Request, { params }: { params: Promise<{ pageId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { pageId } = await params;
  await ensureProjectsTable();

  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.userId, session.user.id)));

  if (!page) {
    return new Response(JSON.stringify({ error: 'Page not found' }), { status: 404 });
  }

  const body = await req.json();
  const { encyclopediaEnabled, roastEnabled, newspaperEnabled } = body;

  await db
    .update(pages)
    .set({
      encyclopediaEnabled: encyclopediaEnabled ?? page.encyclopediaEnabled,
      roastEnabled: roastEnabled ?? page.roastEnabled,
      newspaperEnabled: newspaperEnabled ?? page.newspaperEnabled,
      updatedAt: new Date(),
    })
    .where(eq(pages.id, pageId));

  return Response.json({ ok: true });
}
