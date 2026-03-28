'use client';

import { useRef } from 'react';
import { Playfair_Display } from 'next/font/google';
import type { NewspaperContent } from '@/lib/generated-page-types';
import { ShareControls } from './share-controls';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

interface NewspaperFrontPageProps {
  content: NewspaperContent;
  displayName: string;
  avatarUrl: string | null;
  slug: string;
  accentColor: string;
}

function DropCap({ text }: { text: string }) {
  if (!text || text.length === 0) return <p className="text-justify text-sm leading-relaxed text-gray-800">{text}</p>;
  const first = text[0];
  const rest = text.slice(1);
  return (
    <p className="text-justify text-sm leading-relaxed text-gray-800">
      <span className="float-left mr-1.5 mt-0.5 text-5xl font-black leading-none text-gray-900" style={playfair.style}>
        {first}
      </span>
      {rest}
    </p>
  );
}

function SectionRule() {
  return <hr className="my-5 border-t border-gray-300" />;
}

function ThinRule() {
  return <hr className="border-t border-gray-200" />;
}

export function NewspaperFrontPage({
  content,
  displayName,
  avatarUrl,
  slug,
  accentColor,
}: NewspaperFrontPageProps) {
  const newspaperRef = useRef<HTMLDivElement>(null);

  const leadParagraphs = content.leadStory.body
    .split('\n')
    .filter((p) => p.trim().length > 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Newspaper container */}
      <div ref={newspaperRef}>
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{ backgroundColor: '#fdf6e3' }}
        >
          {/* ═══════════════════════════════════════════ */}
          {/* MASTHEAD                                    */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-6 pt-6 pb-0 sm:px-10 sm:pt-8">
            {/* Top decorative double rule */}
            <div className="mb-3 border-t-2 border-double border-gray-800" />
            <div className="-mt-2 mb-4 border-t border-gray-800" />

            {/* Masthead row */}
            <div className="flex items-end justify-between">
              <p
                className="text-[10px] tracking-wide text-gray-500 uppercase sm:text-xs"
                style={playfair.style}
              >
                Vol. I, No. 1
              </p>
              <h1
                className="text-center text-3xl font-black tracking-wider text-gray-900 sm:text-5xl md:text-6xl"
                style={playfair.style}
              >
                {content.mastheadName}
              </h1>
              <p
                className="text-[10px] tracking-wide text-gray-500 uppercase sm:text-xs"
                style={playfair.style}
              >
                Price: Priceless
              </p>
            </div>

            {/* Dateline bar */}
            <div className="mt-3 border-t border-gray-800" />
            <div className="mt-0.5 border-t-2 border-gray-800" />
            <p
              className="mt-2 mb-1 text-center text-[10px] tracking-widest text-gray-600 italic sm:text-xs"
              style={playfair.style}
            >
              {content.dateline} &mdash; &ldquo;All the News That&apos;s Fit to Print&rdquo;
            </p>
            <div className="border-t border-gray-300" />
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* LEAD STORY                                  */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-6 pt-5 sm:px-10">
            <h2
              className="text-center text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl"
              style={playfair.style}
            >
              {content.leadStory.headline}
            </h2>

            <p
              className="mt-2 text-center text-sm leading-snug text-gray-600 italic sm:text-base"
              style={playfair.style}
            >
              {content.leadStory.subheadline}
            </p>

            <div className="mt-1 mb-4 border-t border-gray-300" />

            {/* Body in columns */}
            <div
              className="gap-6 sm:columns-2"
              style={{
                columnRule: '1px solid #d1d5db',
                columnGap: '2rem',
              }}
            >
              {leadParagraphs.map((para, i) => (
                <div key={i} className={i > 0 ? 'mt-3' : ''}>
                  {i === 0 ? (
                    <DropCap text={para} />
                  ) : (
                    <p className="text-justify text-sm leading-relaxed text-gray-800">
                      {para}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            {content.leadStory.pullQuote && (
              <div className="my-6 border-y-2 border-gray-800 py-4">
                <blockquote
                  className="text-center text-lg font-bold leading-snug text-gray-900 italic sm:text-xl"
                  style={playfair.style}
                >
                  &ldquo;{content.leadStory.pullQuote}&rdquo;
                </blockquote>
              </div>
            )}
          </div>

          <div className="px-6 sm:px-10">
            <SectionRule />
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* SECONDARY STORIES + SIDEBAR                 */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-6 pb-2 sm:px-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Secondary stories -- left 2 columns */}
              <div className="space-y-5 md:col-span-2">
                {content.secondaryStories.map((story, i) => (
                  <div key={i}>
                    {i > 0 && <ThinRule />}
                    <article className={i > 0 ? 'pt-4' : ''}>
                      <h3
                        className="mb-2 text-lg font-bold leading-tight text-gray-900 sm:text-xl"
                        style={playfair.style}
                      >
                        {story.headline}
                      </h3>
                      {story.body
                        .split('\n')
                        .filter((p) => p.trim())
                        .map((para, j) => (
                          <p
                            key={j}
                            className="mt-1.5 text-justify text-sm leading-relaxed text-gray-700"
                          >
                            {para}
                          </p>
                        ))}
                    </article>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="border-t border-gray-300 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                {/* By the Numbers */}
                <div className="mb-5">
                  <h4
                    className="mb-3 border-b-2 border-gray-800 pb-1 text-sm font-black tracking-widest text-gray-900 uppercase"
                    style={playfair.style}
                  >
                    By the Numbers
                  </h4>
                  <ul className="space-y-2">
                    {content.sidebar.facts.map((fact, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs leading-relaxed text-gray-700"
                      >
                        <span
                          className="mt-0.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"
                          aria-hidden
                        />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mood Weather Forecast */}
                <div>
                  <h4
                    className="mb-3 border-b-2 border-gray-800 pb-1 text-sm font-black tracking-widest text-gray-900 uppercase"
                    style={playfair.style}
                  >
                    Today&apos;s Forecast
                  </h4>
                  <div className="rounded-lg border border-gray-300 bg-[#f5edd6] p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className="text-xs font-bold text-gray-800 uppercase"
                        style={playfair.style}
                      >
                        Mood
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-700 italic">
                      {content.sidebar.mood}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10">
            <SectionRule />
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* FAKE ADS                                    */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-6 pb-6 sm:px-10 sm:pb-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {content.fakeAds.map((ad, i) => (
                <div
                  key={i}
                  className="rounded border border-gray-400 bg-[#f5edd6] px-4 py-3 text-center"
                >
                  <p
                    className="text-xs font-bold leading-snug text-gray-800 italic"
                    style={playfair.style}
                  >
                    {ad}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer rule */}
            <div className="mt-5 border-t-2 border-double border-gray-800" />
            <p className="mt-1 text-center text-[9px] tracking-widest text-gray-400 uppercase">
              Published by LinkChat &mdash; A Personal Newspaper Experience
            </p>
          </div>
        </div>
      </div>

      {/* Share controls (outside the newspaper, in dark theme) */}
      <ShareControls
        slug={slug}
        accentColor={accentColor}
        newspaperRef={newspaperRef}
      />
    </div>
  );
}
