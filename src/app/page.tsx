import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import { PublicTopBar } from '@/components/public/public-top-bar';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
});

const signalPills = ['Projects', 'AI chat', 'Themes', 'Sections', 'Analytics beta', 'Lead capture'];

const narrativeCards = [
  {
    eyebrow: 'Show the work',
    title: 'Put projects next to your links instead of hiding them three clicks away.',
    description:
      'Use link stacks for quick actions, then pull real portfolio pieces, social proof, and richer sections into the same page.',
  },
  {
    eyebrow: 'Answer faster',
    title: 'Let visitors ask the obvious questions without waiting for you to reply.',
    description:
      'LinkChat turns your memory blocks into a bottom-anchored assistant that handles the repeat questions while you stay focused.',
  },
  {
    eyebrow: 'See what landed',
    title: 'Track attention from the same dashboard you use to update the page.',
    description:
      'Views, destination clicks, section impressions, and incoming leads are already wired into the product with no extra setup.',
  },
];

const featureCards = [
  {
    title: 'Projects and links together',
    description:
      'Profiles are not limited to a dead list of buttons. Add portfolio cards with titles, descriptions, URLs, and images.',
  },
  {
    title: 'Themes that feel deliberate',
    description:
      'Start from curated presets, custom accents, and avatar styling so each page feels branded instead of template-flat.',
  },
  {
    title: 'Modular sections',
    description:
      'Drop in text, testimonial, CTA, contact, and social sections, then reorder everything without touching code.',
  },
  {
    title: 'Contact capture built in',
    description:
      'Turn profile visits into leads with contact forms that land directly in your dashboard inbox.',
  },
  {
    title: 'Native analytics',
    description:
      'See page views, top destinations, and section performance from the same product that powers the page.',
  },
  {
    title: 'Uploads and AI memory',
    description:
      'Upload avatars and project images to R2, then train the chat assistant with memory blocks that reflect your actual work.',
  },
];

const launchSteps = [
  {
    step: '01',
    title: 'Start in preview mode',
    description:
      'Draft the page visually before signup. Shape the bio, theme, username idea, and page direction with zero friction.',
  },
  {
    step: '02',
    title: 'Claim the identity',
    description:
      'When the draft feels right, log in, claim the username, and publish the page as your public profile.',
  },
  {
    step: '03',
    title: 'Keep learning from traffic',
    description:
      'Add projects, update sections, review leads, and let analytics show what is actually earning attention.',
  },
];

const heroMetrics = [
  { label: 'Page views', value: '412' },
  { label: 'Project clicks', value: '38' },
  { label: 'Leads captured', value: '7' },
];

const themeSwatches = ['#7dd3fc', '#34d399', '#f59e0b', '#f97316'];

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
        {eyebrow}
      </p>
      <h2 className={`${fraunces.className} mt-4 text-3xl tracking-tight text-white sm:text-4xl`}>
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function HeroStudio() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute inset-x-6 top-6 h-48 rounded-full bg-cyan-400/18 blur-[96px]" />
      <div className="absolute inset-x-10 bottom-0 h-44 rounded-full bg-amber-300/10 blur-[100px]" />

      <div className="relative rounded-[34px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_48px_120px_-70px_rgba(34,211,238,0.85)] backdrop-blur-2xl sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="rounded-[28px] border border-white/12 bg-[#06111d]/90 p-5 shadow-inner shadow-black/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
                  Live Draft
                </p>
                <p className="mt-1 text-sm text-slate-300">Public profile preview</p>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-100">
                Claim later
              </span>
            </div>

            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-200/25 bg-gradient-to-br from-cyan-300/25 to-emerald-300/10 text-xl font-semibold text-white">
                SA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                  Founder Profile
                </p>
                <h3 className={`${fraunces.className} mt-2 text-2xl text-white`}>
                  Sarthak Agrawal
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Building software, sharing experiments, and turning a link page into a profile that actually closes loops.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {['Book an intro call', 'Read my operating notes', 'Browse AI projects'].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/45">0{index + 1}</span>
                    <span className="text-sm font-medium text-white">{item}</span>
                  </div>
                  <span className="text-xs text-cyan-100/80">Open</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                Featured Project
              </p>
              <h4 className="mt-3 text-lg font-semibold text-white">AI GTM Operating System</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Frameworks, templates, and experiments for founder-led distribution.
              </p>
            </div>

            <div className="mt-5 rounded-[24px] border border-cyan-200/15 bg-cyan-300/8 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/85">
                Chat Preview
              </p>
              <p className="mt-3 text-sm text-white/70">Visitor asks</p>
              <p className="mt-1 text-sm font-medium text-white">
                Can I see your best product and AI work?
              </p>
              <p className="mt-4 text-sm text-white/70">LinkChat replies</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">
                Start with the highlighted project card, then open the social proof and contact sections if you want to keep talking.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[28px] border border-white/12 bg-[#081725]/88 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                    Analytics Beta
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-white">What the page is doing</h4>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-white/60">
                  Last 7 days
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{metric.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-300/8 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Signal</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  The portfolio card and contact CTA are earning the most intent right now.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-[#081725]/88 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/80">
                Lead Inbox
              </p>
              <h4 className="mt-2 text-lg font-semibold text-white">Follow up while interest is hot</h4>

              <div className="mt-4 space-y-3">
                {[
                  ['Aarav from Stripe', 'Loved the AI project section. Open to a product ops call next week?'],
                  ['Maya from Figma', 'Can you share a deeper walkthrough of the portfolio case study?'],
                ].map(([name, message]) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3"
                  >
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/12 bg-[#081725]/88 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                  Theme Stack
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {themeSwatches.map((color) => (
                    <span
                      key={color}
                      className="h-10 w-10 rounded-2xl border border-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Presets, custom accents, and a page that already feels branded before you publish it.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/12 bg-[#081725]/88 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                  Upload Flow
                </p>
                <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-5">
                  <p className="text-sm font-medium text-white">Avatar and project images</p>
                  <p className="mt-2 text-sm text-slate-300">Stored in R2 and ready for live previews.</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Keep the media local to the product instead of juggling third-party image links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.14),_transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
        backgroundSize: '96px 96px',
        maskImage: 'radial-gradient(circle at center, black, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 78%)',
      }} />
      <div className="absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-cyan-400/12 blur-[140px]" />
      <div className="absolute -right-20 top-[30%] h-[360px] w-[360px] rounded-full bg-amber-300/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-emerald-300/8 blur-[120px]" />

      <PublicTopBar current="home" accentColor="#7dd3fc" />

      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/85">
              Preview before login
            </p>

            <h1 className={`${fraunces.className} mt-6 text-5xl leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl`}>
              Turn your link in bio into a profile people can actually use.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              LinkChat combines links, projects, modular sections, lead capture, analytics, and an AI chat assistant in one page. Start in draft mode, then claim the username only when the page feels ready.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Start Your Profile
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
              >
                See What Ships Today
              </Link>
            </div>

            <p className="mt-4 text-sm text-white/45">
              Draft first. Sign in only when you want to save and claim the name.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {signalPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-medium text-slate-200"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['4 theme presets', 'with custom accents and image-backed pages'],
                ['5 section types', 'for proof, CTA, contact, testimonials, and socials'],
                ['1 unified dashboard', 'for editing, leads, analytics, and AI memory'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroStudio />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why it lands"
          title="Not another dead-end profile page."
          description="The best link pages do more than route traffic. They give visitors enough proof, context, and ways to act that the next step feels obvious."
          centered
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {narrativeCards.map((card, index) => (
            <div
              key={card.title}
              className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/75">
                  {card.eyebrow}
                </p>
                <span className="text-xs text-white/35">0{index + 1}</span>
              </div>
              <h3 className={`${fraunces.className} mt-5 text-2xl leading-tight text-white`}>
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Product Stack"
          title="Everything that ships with a serious profile page."
          description="The app now covers the core pieces people keep stitching together with separate tools. The point is momentum, not more setup."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[28px] border border-white/10 bg-[#091625]/84 p-6 backdrop-blur-xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                Included
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <SectionHeader
            eyebrow="Workflow"
            title="Draft, claim, publish, improve."
            description="The onboarding is deliberately lighter than a traditional page builder. You can shape the page first and commit only when it looks right."
          />

          <div className="grid gap-4">
            {launchSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
                    LinkChat flow
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-7">
            <SectionHeader
              eyebrow="Public Surface"
              title="What visitors see should already feel complete."
              description="The public page is designed to do real work on first visit instead of just redirecting people elsewhere."
            />
            <div className="mt-8 space-y-3">
              {[
                'A branded profile with links, projects, and modular sections',
                'A bottom-anchored AI chat that can answer from your memory blocks',
                'Contact capture without sending visitors through another app',
                'A layout that keeps working on mobile instead of collapsing into a cramped list',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#091625]/84 p-6 backdrop-blur-xl sm:p-7">
            <SectionHeader
              eyebrow="Operator Surface"
              title="The dashboard keeps the profile easy to maintain."
              description="A useful personal page only stays useful if updating it is fast. Editing, analytics, uploads, and inbox workflows already live together."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Guest draft preview before login',
                'Drag-and-drop ordering for links, projects, and sections',
                'R2-backed image uploads for avatars and project cards',
                'Leads inbox, analytics beta, and AI memory editing',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-4 text-sm leading-6 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-cyan-200/14 bg-gradient-to-br from-cyan-300/10 via-white/[0.04] to-amber-300/10 p-8 shadow-[0_50px_140px_-90px_rgba(34,211,238,0.9)] backdrop-blur-2xl sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100/80">
              Ready to build
            </p>
            <h2 className={`${fraunces.className} mt-4 text-4xl tracking-tight text-white sm:text-5xl`}>
              Build the page people keep asking you for.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-200/90 sm:text-lg">
              Start with a live draft, publish when the page feels sharp, and give visitors more than a static pile of links.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Start Drafting
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
