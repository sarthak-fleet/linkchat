const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;
export const ALLOWED_IMAGE_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
] as const;
export const MAX_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024;
export const MAX_IMAGE_UPLOAD_SIZE_MB = Math.floor(
  MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024),
);

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

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isSupportedImageContentType(contentType: string): boolean {
  return ALLOWED_IMAGE_CONTENT_TYPES.includes(
    contentType as (typeof ALLOWED_IMAGE_CONTENT_TYPES)[number],
  );
}

export const MAX_CONTENT_LENGTH = 50_000;
export const MAX_BIO_LENGTH = 500;
export const MAX_TITLE_LENGTH = 100;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 500;
export const MAX_PROJECT_URL_LENGTH = 2_048;
export const MAX_SECTION_CONTENT_LENGTH = 2_000;
export const MAX_CONTACT_MESSAGE_LENGTH = 2_000;
export const MAX_CONTACT_NAME_LENGTH = 100;
