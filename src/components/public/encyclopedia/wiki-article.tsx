import type { EncyclopediaContent } from '@/lib/generated-page-types';
import { WikiInfobox } from './wiki-infobox';
import { WikiToc } from './wiki-toc';

interface WikiArticleProps {
  content: EncyclopediaContent;
  displayName: string;
  avatarUrl: string | null;
  accentColor: string;
}

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function WikiArticle({ content, displayName, avatarUrl, accentColor }: WikiArticleProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <article className="border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl p-6 sm:p-10">
        {/* Article title */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-white font-normal tracking-tight">
            {displayName}
          </h1>
          <div
            className="mt-2 h-[2px] w-24"
            style={{ backgroundColor: accentColor }}
          />
        </header>

        {/* Lead paragraph - above the infobox */}
        <p className="text-lg font-serif text-white/80 leading-relaxed mb-8">
          {content.leadParagraph}
        </p>

        {/* Infobox floated right (on desktop) */}
        <WikiInfobox
          infobox={content.infobox}
          displayName={displayName}
          avatarUrl={avatarUrl}
          accentColor={accentColor}
        />

        {/* Table of Contents */}
        <WikiToc sections={content.sections} accentColor={accentColor} />

        {/* Article sections */}
        <div className="clear-none">
          {content.sections.map((section, i) => (
            <section key={i} id={sectionId(section.heading)} className="mb-8">
              <div className="flex items-baseline gap-3 border-b border-white/10 pb-2 mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <span
                  className="text-xs font-sans cursor-default select-none"
                  style={{ color: accentColor }}
                >
                  [edit]
                </span>
              </div>
              <div className="font-serif text-white/70 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Categories */}
        {content.categories.length > 0 && (
          <footer className="mt-10 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/40 font-semibold uppercase tracking-wider mr-1">
                Categories:
              </span>
              {content.categories.map((cat, i) => (
                <span
                  key={i}
                  className="border border-white/10 bg-white/5 px-2 py-1 rounded text-xs text-white/50"
                >
                  {cat}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
