import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { demoProfiles } from '@/lib/mock-data';
import { Role } from '@/lib/types';

const DEMO_COOKIE = 'smartreg-demo-role';

export async function getCurrentRole(): Promise<Role | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get(DEMO_COOKIE)?.value as Role | undefined;
  return role ?? null;
}

export async function requireRole(roles: Role[]) {
  const role = await getCurrentRole();
  if (!role || !roles.includes(role)) {
    redirect('/auth/login');
  }
  return role;
}

export async function getCurrentProfile() {
  const role = await getCurrentRole();
  return demoProfiles.find((profile) => profile.role === role) ?? null;
}

export const demoRoleCookie = DEMO_COOKIE;
