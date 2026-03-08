const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const MAX_CONTENT_LENGTH = 50_000;
export const MAX_BIO_LENGTH = 500;
export const MAX_TITLE_LENGTH = 100;
