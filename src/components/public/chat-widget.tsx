'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ContactFormSection } from '@/components/public/contact-form-section';
import { getOrCreateVisitorId } from '@/lib/visitor-id';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatPosition = 'bottom-right' | 'bottom-left';

export function ChatWidget({
  slug,
  displayName,
  accentColor = '#2563eb',
  position = 'bottom-right',
}: {
  slug: string;
  displayName: string;
  accentColor?: string;
  position?: ChatPosition;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'contact'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitorIdRef = useRef<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && mode === 'chat') {
      inputRef.current?.focus();
    }
  }, [open, mode]);

  useEffect(() => {
    visitorIdRef.current = getOrCreateVisitorId();
  }, []);

  const saveMessage = useCallback(
    async (convId: string, role: 'user' | 'assistant', content: string) => {
      try {
        await fetch(`/api/chat/${slug}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId: convId, role, content }),
        });
      } catch {
        // best-effort persistence
      }
    },
    [slug],
  );

  async function ensureConversation(): Promise<string> {
    if (conversationId) return conversationId;

    const res = await fetch(`/api/chat/${slug}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId: visitorIdRef.current }),
    });

    if (!res.ok) throw new Error('Failed to create conversation');

    const data = await res.json();
    setConversationId(data.id);
    return data.id;
  }

  async function handleSend() {
    const query = input.trim();
    if (!query || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const convId = await ensureConversation();
      void saveMessage(convId, 'user', query);

      const res = await fetch(`/api/chat/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Something went wrong' }));
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: err.error || 'Something went wrong' },
        ]);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'No response stream' },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'chunk' && parsed.content) {
              fullResponse += parsed.content;
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === 'assistant') {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + parsed.content,
                  };
                }
                return updated;
              });
            }
          } catch {
            // skip malformed event lines
          }
        }
      }

      if (fullResponse) {
        void saveMessage(convId, 'assistant', fullResponse);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Failed to connect to chat service' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const positionClass = position === 'bottom-left' ? 'left-6' : 'right-6';

  return (
    <>
      <button
        onClick={() => setOpen((current) => !current)}
        className={`fixed bottom-6 ${positionClass} z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-2xl shadow-lg backdrop-blur-xl transition-transform hover:scale-110 active:scale-95`}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          backgroundColor: `${accentColor}f2`,
          boxShadow: `0 18px 44px -18px ${accentColor}`,
        }}
      >
        {open ? '\u2715' : '\uD83D\uDCAC'}
      </button>

      {open && (
        <div
          className={`fixed bottom-24 ${positionClass} z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-gray-900/80 shadow-2xl backdrop-blur-xl`}
        >
          <div className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">
                {mode === 'chat' ? `Chat with ${displayName}` : `Contact ${displayName}`}
              </h3>
              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setMode('chat')}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    mode === 'chat'
                      ? 'bg-white text-gray-900'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Chat
                </button>
                <button
                  type="button"
                  onClick={() => setMode('contact')}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    mode === 'contact'
                      ? 'bg-white text-gray-900'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {mode === 'chat' ? (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
                {messages.length === 0 && (
                  <p className="mt-8 text-center text-xs text-white/40">
                    Ask anything about {displayName}
                  </p>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'text-white'
                          : 'border border-white/10 bg-white/5 text-white/90'
                      }`}
                      style={
                        msg.role === 'user'
                          ? { backgroundColor: accentColor }
                          : undefined
                      }
                    >
                      {msg.content || (loading && index === messages.length - 1 ? '...' : '')}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSend();
                }}
                className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={loading}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: accentColor }}
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-4 text-sm text-white/70">
                Send a direct message to {displayName}.
              </p>
              <ContactFormSection slug={slug} accentColor={accentColor} compact />
            </div>
          )}
        </div>
      )}
    </>
  );
}
