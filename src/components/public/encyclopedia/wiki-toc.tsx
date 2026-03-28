'use client';

import { useEffect, useState } from 'react';

interface WikiTocProps {
  sections: { heading: string }[];
  accentColor: string;
}

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function WikiToc({ sections, accentColor }: WikiTocProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = sections.map((s) => sectionId(s.heading));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <nav className="border border-white/10 bg-white/5 rounded-xl p-4 mb-6 md:w-fit">
      <p className="font-bold text-white text-sm mb-2">Contents</p>
      <ol className="list-none space-y-1">
        {sections.map((section, i) => {
          const id = sectionId(section.heading);
          const isActive = activeId === id;

          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="text-left text-sm transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
                style={{
                  color: isActive ? accentColor : 'rgba(255,255,255,0.6)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span className="mr-2 tabular-nums text-white/40">{i + 1}.</span>
                {section.heading}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
