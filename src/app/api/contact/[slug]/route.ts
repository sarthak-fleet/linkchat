import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db, ensureProjectsTable } from '@/db';
import { pages, contactSubmissions, pageEvents } from '@/db/schema';
import { rateLimit } from '@/lib/rate-limit';
import {
  isValidEmail,
  MAX_CONTACT_MESSAGE_LENGTH,
  MAX_CONTACT_NAME_LENGTH,
} from '@/lib/validation';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { ok } = rateLimit(`contact:${ip}:${slug}`);
  if (!ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await req.json();
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim() : null;
  const sectionId = typeof body.sectionId === 'string' ? body.sectionId.trim() : null;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'name, email, and message are required' },
      { status: 400 },
    );
  }

  if (name.length > MAX_CONTACT_NAME_LENGTH) {
    return NextResponse.json(
      { error: 'Name too long (max 100 chars)' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (message.length > MAX_CONTACT_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: 'Message too long (max 2000 chars)' },
      { status: 400 },
    );
  }

  await ensureProjectsTable();

  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.slug, slug), eq(pages.published, true)));

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  const [submission] = await db
    .insert(contactSubmissions)
    .values({
      pageId: page.id,
      sectionId,
      visitorId,
      name,
      email,
      message,
    })
    .returning();

  await db.insert(pageEvents).values({
    pageId: page.id,
    visitorId,
    eventType: 'contact_submit',
    resourceType: 'contact',
    resourceId: sectionId,
    resourceLabel: name,
    metadata: {
      email,
      sectionId,
    },
  });

  return NextResponse.json(submission, { status: 201 });
}
