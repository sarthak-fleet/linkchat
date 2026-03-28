import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import { PublicTopBar } from '@/components/public/public-top-bar';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
});

const features = [
  {
    title: 'Links + Projects',
    description: 'Combine quick links with portfolio pieces on one page.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    title: 'AI Chat Assistant',
    description: 'Visitors ask questions, your profile answers instantly.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: 'Built-in Analytics',
    description: 'Views, clicks, and leads tracked from your dashboard.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Themes + Sections',
    description: 'Modular layouts with curated presets. No code needed.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

const aiPages = [
  {
    title: 'Encyclopedia',
    description: 'A Wikipedia-style article generated from your profile.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Roast Me',
    description: 'A brutally honest AI review with scores and breakdowns.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    title: 'Newspaper',
    description: 'A front-page story generated from your profile data.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      {/* Single subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-[160px]" />

      <PublicTopBar current="home" variant="minimal" />

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-5xl px-5 pb-32 pt-32 text-center sm:px-6 sm:pt-40">
        <h1 className={`${fraunces.className} mx-auto max-w-3xl text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl`}>
          <span className="text-white">Your link in bio, </span>
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            upgraded.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg text-slate-400">
          Links, projects, AI chat, and analytics in one profile page.
        </p>

        <div className="mt-10">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-gray-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            Start Your Profile
          </Link>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/[0.08] p-6 transition-colors hover:border-white/15"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AI PAGES ===== */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 sm:px-6">
        <h2 className={`${fraunces.className} text-center text-3xl tracking-tight text-white sm:text-4xl`}>
          AI-powered pages, built in
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-slate-400">
          Every profile generates three unique pages from your data.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {aiPages.map((page) => (
            <div
              key={page.title}
              className="rounded-2xl border border-white/[0.08] p-6 text-center transition-colors hover:border-white/15"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                {page.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{page.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{page.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative mx-auto max-w-5xl px-5 py-32 text-center sm:px-6">
        <Link
          href="/create"
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-gray-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
        >
          Start Your Profile
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-sm text-slate-500">
        Built by Sarthak
      </footer>
    </main>
  );
}
