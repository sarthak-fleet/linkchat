'use client';

import { useState } from 'react';

interface Link {
  id: string;
  pageId: string;
  title: string;
  url: string;
  icon: string | null;
  sortOrder: number | null;
  enabled: boolean | null;
}

export function LinkEditor({
  pageId,
  initialLinks,
}: {
  pageId: string;
  initialLinks: Link[];
}) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${pageId}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });

      if (!res.ok) throw new Error('Failed to add link');

      const newLink = await res.json();
      setLinks((prev) => [...prev, newLink]);
      setTitle('');
      setUrl('');
    } catch {
      alert('Failed to add link');
    } finally {
      setLoading(false);
    }
  }

  async function removeLink(linkId: string) {
    try {
      const res = await fetch(`/api/pages/${pageId}/links/${linkId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete link');

      setLinks((prev) => prev.filter((l) => l.id !== linkId));
    } catch {
      alert('Failed to remove link');
    }
  }

  return (
    <div className="space-y-6">
      {/* Add link form */}
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Add a Link</h2>
        <form onSubmit={addLink} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-blue-400"
            required
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>

      {/* Links list */}
      {links.length === 0 ? (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-gray-400">
            No links yet. Add your first link above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{link.title}</p>
                <p className="truncate text-sm text-gray-400">{link.url}</p>
              </div>
              <button
                onClick={() => removeLink(link.id)}
                className="ml-4 shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
