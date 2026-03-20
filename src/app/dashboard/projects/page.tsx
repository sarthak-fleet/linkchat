import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db, ensureProjectsTable } from '@/db';
import { pages, projects } from '@/db/schema';
import { ProjectEditor } from '@/components/dashboard/project-editor';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const page = await db.query.pages.findFirst({
    where: eq(pages.userId, session.user.id),
  });

  if (!page) {
    return (
      <div>
        <h1 className="mb-2 text-2xl font-bold text-white">Projects</h1>
        <p className="text-sm text-gray-400">
          Create a page first from the Appearance tab.
        </p>
      </div>
    );
  }

  await ensureProjectsTable();

  const pageProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.pageId, page.id))
    .orderBy(projects.sortOrder);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Projects</h1>
      <p className="mb-6 text-sm text-gray-400">
        Add portfolio pieces visitors can explore directly from your profile.
        Use the move buttons to reorder them.
      </p>
      <ProjectEditor pageId={page.id} initialProjects={pageProjects} />
    </div>
  );
}
