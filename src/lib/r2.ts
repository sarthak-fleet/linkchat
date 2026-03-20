import 'server-only';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

type ImageUploadKind = 'avatar' | 'project';

let r2Client: S3Client | null = null;

function getEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getRequiredEnv(name: string): string {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getR2Client(): S3Client {
  if (!r2Client) {
    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${getRequiredEnv('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: getRequiredEnv('R2_ACCESS_KEY_ID'),
        secretAccessKey: getRequiredEnv('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  return r2Client;
}

function getFileExtension(fileName: string, contentType: string): string {
  const extensionFromName = fileName.split('.').pop()?.toLowerCase();

  if (extensionFromName && /^[a-z0-9]+$/.test(extensionFromName)) {
    return extensionFromName;
  }

  switch (contentType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/avif':
      return 'avif';
    default:
      return 'bin';
  }
}

function encodeObjectKeyForUrl(objectKey: string): string {
  return objectKey
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

export function isR2Configured(): boolean {
  return [
    'CLOUDFLARE_ACCOUNT_ID',
    'R2_BUCKET_NAME',
    'R2_PUBLIC_BASE_URL',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
  ].every((name) => Boolean(getEnv(name)));
}

export function createR2ImageObjectKey(args: {
  pageId: string;
  kind: ImageUploadKind;
  fileName: string;
  contentType: string;
}): string {
  const extension = getFileExtension(args.fileName, args.contentType);

  return `pages/${args.pageId}/${args.kind}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
}

export function buildR2PublicUrl(objectKey: string): string {
  const baseUrl = getRequiredEnv('R2_PUBLIC_BASE_URL').replace(/\/+$/, '');
  return `${baseUrl}/${encodeObjectKeyForUrl(objectKey)}`;
}

export async function uploadImageToR2(args: {
  objectKey: string;
  body: Buffer;
  contentType: string;
}) {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getRequiredEnv('R2_BUCKET_NAME'),
      Key: args.objectKey,
      Body: args.body,
      ContentType: args.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
      ContentDisposition: 'inline',
    }),
  );

  return {
    objectKey: args.objectKey,
    url: buildR2PublicUrl(args.objectKey),
  };
}
