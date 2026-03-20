'use client';

const VISITOR_ID_KEY = 'linkchat_visitor_id';

export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') {
    return null;
  }

  let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}
