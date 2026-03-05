import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages, infoBlocks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { InfoEditor } from '@/components/dashboard/info-editor';

export default async function InfoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const page = await db.query.pages.findFirst({
    where: eq(pages.userId, session.user.id),
  });

  if (!page) {
    return (
      <div>
        <h1 className="mb-2 text-2xl font-bold text-white">Info & Content</h1>
        <p className="mb-6 text-sm text-gray-400">
          Create a page first before adding info blocks.
        </p>
      </div>
    );
  }

  const blocks = await db.query.infoBlocks.findMany({
    where: eq(infoBlocks.pageId, page.id),
    orderBy: [infoBlocks.sortOrder],
  });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Info & Content</h1>
      <p className="mb-6 text-sm text-gray-400">
        Add information that the AI chat can use to answer visitor questions.
      </p>
      <InfoEditor pageId={page.id} initialBlocks={blocks} />
    </div>
  );
}
