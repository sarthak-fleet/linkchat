'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GenerateEncyclopediaProps {
  pageId: string;
  slug: string;
  accentColor: string;
}

export function GenerateEncyclopedia({ pageId, slug, accentColor }: GenerateEncyclopediaProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pages/${pageId}/generate/encyclopedia`, {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Something went wrong' }));
        throw new Error(data.error || 'Failed to generate encyclopedia');
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl p-8 sm:p-12 max-w-md w-full text-center">
        <div className="text-6xl mb-6">📜</div>

        <h1 className="text-2xl font-bold text-white mb-2">
          {slug}&apos;s Encyclopedia
        </h1>

        <p className="text-white/60 mb-8">
          Generate your personal Wikipedia-style article
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={{
            backgroundColor: loading ? 'rgba(255,255,255,0.1)' : accentColor,
            color: loading ? 'rgba(255,255,255,0.5)' : '#000',
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Writing Article...
            </span>
          ) : (
            'Write Article'
          )}
        </button>
      </div>
    </div>
  );
}
