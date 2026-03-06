import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-white">Analytics</h1>
      <p className="mb-6 text-sm text-gray-400">
        Page views, link clicks, and visitor insights.
      </p>
      {user?.smProjectId ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white mb-2">SaaS Maker Analytics</h2>
            <p className="text-sm text-gray-400 mb-4">
              Your analytics are being tracked with project ID:{' '}
              <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/80">
                {user.smProjectId}
              </code>
            </p>
            <a
              href={`https://saas-maker.io/projects/${user.smProjectId}/analytics`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              View in SaaS Maker
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-gray-400 mb-2">Analytics not configured yet.</p>
          <p className="text-sm text-gray-500">
            Set up your SaaS Maker integration by adding your project ID in settings to start tracking page views and visitor insights.
          </p>
        </div>
      )}
    </div>
  );
}
