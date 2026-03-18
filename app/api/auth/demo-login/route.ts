import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { demoRoleCookie } from '@/lib/auth';
import { Role } from '@/lib/types';

const validRoles: Role[] = ['student', 'admissions', 'developer'];

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    if (formData.get('logout')) {
      cookieStore.delete(demoRoleCookie);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  const body = (await request.json().catch(() => null)) as { role?: Role } | null;
  if (!body?.role || !validRoles.includes(body.role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  cookieStore.set(demoRoleCookie, body.role, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return NextResponse.json({ ok: true, role: body.role });
}
