'use client';

import { useState, type FormEvent } from 'react';
import { getOrCreateVisitorId } from '@/lib/visitor-id';

type ContactFormSectionProps = {
  slug: string;
  accentColor?: string;
  compact?: boolean;
  sectionId?: string;
};

export function ContactFormSection({
  slug,
  accentColor = '#2563eb',
  compact = false,
  sectionId,
}: ContactFormSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || loading) {
      return;
    }

    setLoading(true);
    setStatus('idle');
    setFeedback('');

    try {
      const res = await fetch(`/api/contact/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          visitorId: getOrCreateVisitorId(),
          sectionId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setName('');
      setEmail('');
      setMessage('');
      setStatus('success');
      setFeedback('Message sent. You should hear back soon.');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'space-y-3' : 'space-y-4'}
    >
      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/30"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/30"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to talk about?"
          rows={compact ? 4 : 5}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/30"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {status !== 'idle' && feedback && (
        <p
          className={`text-xs ${
            status === 'success' ? 'text-emerald-300' : 'text-red-300'
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
