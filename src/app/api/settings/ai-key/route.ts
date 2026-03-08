import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createIndex } from '@/lib/saasmaker';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db.select({ smApiKey: users.smApiKey }).from(users).where(eq(users.id, session.user.id));
  return NextResponse.json({ hasKey: !!user?.smApiKey });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { aiKey } = body;

  if (!aiKey?.trim()) {
    return NextResponse.json({ error: 'AI key is required' }, { status: 400 });
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  let indexId = user.smIndexId;

  // Auto-create saas-maker index if none exists
  if (!indexId) {
    try {
      const adminKey = process.env.SAASMAKER_ADMIN_KEY!;
      const index = await createIndex(adminKey, `linkchat-${session.user.id}`);
      indexId = index.id;
    } catch {
      return NextResponse.json({ error: 'Failed to initialize chat index' }, { status: 502 });
    }
  }

  await db
    .update(users)
    .set({ smApiKey: aiKey.trim(), smIndexId: indexId })
    .where(eq(users.id, session.user.id));

  return NextResponse.json({ success: true });
}
