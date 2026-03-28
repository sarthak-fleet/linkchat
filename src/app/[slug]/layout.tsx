import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPageBySlug, getPageUser } from './_lib/get-page-data';
import { GlassCard } from '@/components/public/glass-card';
import { ChatWidget } from '@/components/public/chat-widget';
import { PublicTopBar } from '@/components/public/public-top-bar';
import { ProfileNav } from '@/components/public/profile-nav';
import { resolveThemeConfig } from '@/lib/themes';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: page.displayName,
    description: page.bio ?? `${page.displayName}'s links`,
    openGraph: {
      title: page.displayName,
      description: page.bio ?? `${page.displayName}'s links`,
      ...(page.avatarUrl && { images: [page.avatarUrl] }),
    },
  };
}

export default async function SlugLayout({ params, children }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const user = await getPageUser(page.userId);
  const theme = resolveThemeConfig(page.themeConfig);

  const enabledPages = {
    encyclopedia: page.encyclopediaEnabled ?? false,
    roast: page.roastEnabled ?? false,
    newspaper: page.newspaperEnabled ?? false,
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gray-950"
      style={{
        background: `linear-gradient(180deg, ${theme.gradientFrom}18 0%, ${theme.gradientTo}1c 42%, #020617 100%)`,
      }}
    >
      {/* Animated gradient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full blur-[128px]"
          style={{ backgroundColor: `${theme.gradientFrom}4d` }}
        />
        <div
          className="absolute top-1/3 -right-40 h-80 w-80 animate-pulse rounded-full blur-[128px] [animation-delay:2s]"
          style={{ backgroundColor: `${theme.gradientTo}42` }}
        />
        <div
          className="absolute -bottom-40 left-1/3 h-80 w-80 animate-pulse rounded-full blur-[128px] [animation-delay:4s]"
          style={{ backgroundColor: `${theme.accentColor}38` }}
        />
      </div>

      <PublicTopBar current="profile" accentColor={theme.accentColor} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        {/* Profile card */}
        <div
          className="rounded-[28px] p-[1px]"
          style={{
            background: `linear-gradient(135deg, ${theme.accentColor}66, ${theme.gradientFrom}26)`,
            boxShadow: `0 30px 90px -50px ${theme.accentColor}`,
          }}
        >
          <GlassCard className="w-full p-8 text-center sm:p-10">
            <div className="mx-auto max-w-2xl">
              {page.avatarUrl && (
                <Image
                  src={page.avatarUrl}
                  alt={page.displayName}
                  width={96}
                  height={96}
                  sizes="96px"
                  className="mx-auto mb-5 h-24 w-24 rounded-full border-2 border-white/20 object-cover shadow-lg shadow-black/30"
                />
              )}
              <p
                className="text-[11px] font-medium uppercase tracking-[0.32em]"
                style={{ color: theme.accentColor }}
              >
                Personal Profile
              </p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {page.displayName}
              </h1>
              {page.bio && (
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                  {page.bio}
                </p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Navigation tabs */}
        <ProfileNav
          slug={slug}
          accentColor={theme.accentColor}
          enabledPages={enabledPages}
        />

        {/* Page content */}
        {children}

        {/* Footer */}
        <p className="mt-auto pt-12 text-center text-xs text-white/30">
          Powered by{' '}
          <Link
            href="/"
            className="font-medium text-white/50 transition-colors hover:text-white"
          >
            LinkChat
          </Link>
        </p>
      </div>

      {page.chatEnabled && (
        <ChatWidget
          slug={slug}
          displayName={page.displayName}
          accentColor={theme.accentColor}
          position={theme.chatPosition}
        />
      )}
      {user?.smProjectId && (
        <script
          defer
          src="https://unpkg.com/@saas-maker/analytics-sdk"
          data-project={user.smProjectId}
        />
      )}
    </main>
  );
}
