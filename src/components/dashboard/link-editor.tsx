'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

interface Link {
  id: string;
  pageId: string;
  title: string;
  url: string;
  icon: string | null;
  sortOrder: number | null;
  enabled: boolean | null;
}

function DragHandle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="shrink-0"
    >
      <circle cx="5" cy="3" r="1.5" />
      <circle cx="11" cy="3" r="1.5" />
      <circle cx="5" cy="8" r="1.5" />
      <circle cx="11" cy="8" r="1.5" />
      <circle cx="5" cy="13" r="1.5" />
      <circle cx="11" cy="13" r="1.5" />
    </svg>
  );
}

function LinkCard({
  link,
  index,
  onRemove,
  isOverlay,
}: {
  link: Link;
  index: number;
  onRemove: (id: string) => void;
  isOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isOverlay) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-white/30 bg-gray-900/90 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="text-white/60 cursor-grabbing">
            <DragHandle />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-gray-300">
                #{index + 1}
              </span>
              <p className="truncate font-medium text-white">{link.title}</p>
            </div>
            <p className="truncate text-sm text-gray-400">{link.url}</p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <button
            type="button"
            className="flex-1 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-red-400 transition sm:flex-none"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col gap-4 rounded-2xl border bg-white/5 p-4 backdrop-blur-xl transition sm:flex-row sm:items-center sm:justify-between ${
        isDragging ? 'border-white/40 opacity-50' : 'border-white/20'
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="text-white/30 hover:text-white/60 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <DragHandle />
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-gray-300">
              #{index + 1}
            </span>
            <p className="truncate font-medium text-white">{link.title}</p>
          </div>
          <p className="truncate text-sm text-gray-400">{link.url}</p>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
        <button
          type="button"
          onClick={() => onRemove(link.id)}
          className="flex-1 rounded-lg border border-white/20 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function LinkEditor({
  pageId,
  initialLinks,
}: {
  pageId: string;
  initialLinks: Link[];
}) {
  const [links, setLinks] = useState<Link[]>(
    [...initialLinks].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    ),
  );
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeLink = activeId
    ? links.find((l) => l.id === activeId) ?? null
    : null;
  const activeIndex = activeId
    ? links.findIndex((l) => l.id === activeId)
    : -1;

  function normalizeLinks(items: Link[]) {
    return [...items].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    );
  }

  async function persistOrder(nextLinks: Link[]) {
    const response = await fetch(`/api/pages/${pageId}/links`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderedLinkIds: nextLinks.map((link) => link.id),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to reorder links');
    }

    const updatedLinks = await response.json();
    setLinks(updatedLinks);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const previousLinks = [...links];
    const nextLinks = arrayMove(links, oldIndex, newIndex);
    setLinks(nextLinks);

    try {
      await persistOrder(nextLinks);
    } catch {
      setLinks(previousLinks);
      alert('Failed to reorder links');
    }
  }

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
      setLinks((prev) => normalizeLinks([...prev, newLink]));
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
        <p className="mb-4 text-sm text-gray-400">
          Drag the handle to reorder your links.
        </p>
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
            className="w-full rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {links.map((link, index) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  index={index}
                  onRemove={removeLink}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeLink ? (
              <LinkCard
                link={activeLink}
                index={activeIndex}
                onRemove={() => {}}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
