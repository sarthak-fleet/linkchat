import { GlassCard } from '@/components/public/glass-card';
import { ContactFormSection } from '@/components/public/contact-form-section';

type Section = {
  id: string;
  type: string;
  title: string;
  content: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
};

export function PageSectionRenderer({
  slug,
  section,
  accentColor,
}: {
  slug: string;
  section: Section;
  accentColor: string;
}) {
  if (section.type === 'social') {
    const items = (section.content ?? '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url] = line.split('|').map((part) => part.trim());
        return { label, url };
      })
      .filter((item) => item.label && item.url);

    return (
      <GlassCard className="rounded-3xl p-6 sm:p-8">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: accentColor }}
        >
          Social
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          {section.title}
        </h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {items.map((item) => (
            <a
              key={`${item.label}-${item.url}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-type="social"
              data-track-id={item.url}
              data-track-label={item.label}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              style={{ borderColor: `${accentColor}33` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </GlassCard>
    );
  }

  if (section.type === 'contact') {
    return (
      <GlassCard className="rounded-3xl p-6 sm:p-8">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: accentColor }}
        >
          Contact
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          {section.title}
        </h3>
        {section.content && (
          <p className="mt-3 text-sm leading-7 text-white/70">
            {section.content}
          </p>
        )}
        <div className="mt-6">
          <ContactFormSection
            slug={slug}
            accentColor={accentColor}
            sectionId={section.id}
          />
        </div>
      </GlassCard>
    );
  }

  if (section.type === 'testimonial') {
    return (
      <GlassCard className="rounded-3xl p-6 sm:p-8">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: accentColor }}
        >
          Testimonial
        </p>
        <p className="mt-4 text-lg leading-8 text-white">
          &ldquo;{section.content}&rdquo;
        </p>
        <p className="mt-5 text-sm font-medium text-white/80">
          {section.title}
        </p>
      </GlassCard>
    );
  }

  if (section.type === 'cta') {
    return (
      <GlassCard className="rounded-3xl p-6 sm:p-8">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: accentColor }}
        >
          Spotlight
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          {section.title}
        </h3>
        {section.content && (
          <p className="mt-3 text-sm leading-7 text-white/70">
            {section.content}
          </p>
        )}
        {section.buttonLabel && section.buttonUrl && (
          <a
            href={section.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track-type="section_cta"
            data-track-id={section.id}
            data-track-label={section.title}
            className="mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-gray-950 transition hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            {section.buttonLabel}
          </a>
        )}
      </GlassCard>
    );
  }

  return (
    <GlassCard className="rounded-3xl p-6 sm:p-8">
      <p
        className="text-[11px] font-medium uppercase tracking-[0.28em]"
        style={{ color: accentColor }}
      >
        Section
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">
        {section.title}
      </h3>
      {section.content && (
        <p className="mt-3 text-sm leading-7 text-white/70">
          {section.content}
        </p>
      )}
    </GlassCard>
  );
}
