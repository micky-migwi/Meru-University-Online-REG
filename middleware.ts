import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const roleMap = {
  '/dashboard/student': 'student',
  '/dashboard/admissions': 'admissions',
  '/dashboard/developer': 'developer',
} as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const matchedEntry = Object.entries(roleMap).find(([prefix]) => pathname.startsWith(prefix));

  if (!matchedEntry) {
    return NextResponse.next();
  }

  const [, role] = matchedEntry;
  const currentRole = request.cookies.get('smartreg-demo-role')?.value;

  if (currentRole !== role) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
