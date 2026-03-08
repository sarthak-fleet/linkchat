import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { pages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isValidSlug, MAX_TITLE_LENGTH } from '@/lib/validation';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userPages = await db
    .select()
    .from(pages)
    .where(eq(pages.userId, session.user.id));

  return NextResponse.json(userPages);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { slug, displayName, bio } = body;

  if (!slug || !displayName) {
    return NextResponse.json(
      { error: 'slug and displayName are required' },
      { status: 400 },
    );
  }

  if (!isValidSlug(slug)) {
    return NextResponse.json(
      { error: 'Slug must be 3-50 chars, lowercase alphanumeric and hyphens only' },
      { status: 400 },
    );
  }

  if (displayName.length > MAX_TITLE_LENGTH) {
    return NextResponse.json(
      { error: 'Display name too long (max 100 chars)' },
      { status: 400 },
    );
  }

  // Check slug uniqueness
  const existing = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, slug));

  if (existing.length > 0) {
    return NextResponse.json(
      { error: 'Slug is already taken' },
      { status: 409 },
    );
  }

  const [page] = await db
    .insert(pages)
    .values({
      userId: session.user.id,
      slug,
      displayName,
      bio: bio ?? null,
    })
    .returning();

  return NextResponse.json(page, { status: 201 });
}
