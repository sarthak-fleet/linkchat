'use client';

import { useState } from 'react';

interface PageTogglesProps {
  pageId: string;
  slug: string;
  initialEncyclopedia: boolean;
  initialRoast: boolean;
  initialNewspaper: boolean;
}

const PAGE_FEATURES = [
  {
    key: 'encyclopediaEnabled' as const,
    label: 'Encyclopedia',
    description: 'Wikipedia-style article about you, AI-generated from your profile data',
    path: 'encyclopedia',
  },
  {
    key: 'roastEnabled' as const,
    label: 'Roast Me',
    description: 'AI-generated personality roast with shareable cards',
    path: 'roast',
  },
  {
    key: 'newspaperEnabled' as const,
    label: 'Newspaper',
    description: 'A newspaper front page featuring you as the headline story',
    path: 'newspaper',
  },
] as const;

export function PageToggles({
  pageId,
  slug,
  initialEncyclopedia,
  initialRoast,
  initialNewspaper,
}: PageTogglesProps) {
  const [toggles, setToggles] = useState({
    encyclopediaEnabled: initialEncyclopedia,
    roastEnabled: initialRoast,
    newspaperEnabled: initialNewspaper,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [generating, setGenerating] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/pages/${pageId}/page-toggles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toggles),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Failed to save');
        return;
      }
      setMessage('Saved successfully');
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate(type: string) {
    setGenerating(type);
    try {
      const res = await fetch(`/api/pages/${pageId}/generate/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || `Failed to generate ${type}`);
        return;
      }
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} generated!`);
    } catch {
      setMessage(`Failed to generate ${type}`);
    } finally {
      setGenerating(null);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-white">Pages</h1>
      <p className="mb-6 text-sm text-gray-400">
        Enable extra pages on your public profile. Each page is accessible at{' '}
        <code className="text-white/60">/{slug}/&lt;page&gt;</code>
      </p>

      <div className="space-y-4">
        {PAGE_FEATURES.map((feature) => {
          const enabled = toggles[feature.key];

          return (
            <div
              key={feature.key}
              className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white">{feature.label}</h3>
                  <p className="mt-1 text-xs text-gray-400">{feature.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() =>
                    setToggles((prev) => ({
                      ...prev,
                      [feature.key]: !prev[feature.key],
                    }))
                  }
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-950 ${
                    enabled ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transition-transform duration-200 ${
                      enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {enabled && (
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                  <button
                    onClick={() => handleGenerate(feature.path)}
                    disabled={generating === feature.path}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {generating === feature.path
                      ? 'Generating...'
                      : 'Generate Content'}
                  </button>
                  <a
                    href={`/${slug}/${feature.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
                  >
                    Preview
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {message && (
          <p
            className={`text-sm ${
              message.includes('success') || message.includes('generated')
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
