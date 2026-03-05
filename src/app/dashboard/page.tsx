import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const page = await db.query.pages.findFirst({
    where: eq(pages.userId, session.user.id),
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Overview</h1>

      {page ? (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-1 text-lg font-semibold text-white">
            {page.displayName}
          </h2>
          <p className="mb-4 text-sm text-gray-400">
            Your page is live at{' '}
            <Link
              href={`/${page.slug}`}
              className="text-blue-400 underline hover:text-blue-300"
            >
              /{page.slug}
            </Link>
          </p>
          <div className="flex gap-3">
            <Link
              href="/dashboard/links"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Manage Links
            </Link>
            <Link
              href={`/${page.slug}`}
              target="_blank"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5"
            >
              View Page
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Create your page
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Set up your LinkChat page to start sharing your links and enabling
            AI chat.
          </p>
          <Link
            href="/dashboard/settings"
            className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
          >
            Create Page
          </Link>
        </div>
      )}
    </div>
  );
}
