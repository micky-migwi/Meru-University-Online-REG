import Link from 'next/link';
import { Role } from '@/lib/types';
import { Button } from '@/components/ui/button';

const navByRole: Record<Role, { label: string; href: string }[]> = {
  student: [
    { label: 'Student Dashboard', href: '/dashboard/student' },
    { label: 'Apply', href: '/dashboard/student#apply' },
  ],
  admissions: [{ label: 'Admissions Dashboard', href: '/dashboard/admissions' }],
  developer: [{ label: 'Developer Dashboard', href: '/dashboard/developer' }],
};

export function DashboardNav({ role }: { role: Role }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <Link href="/" className="text-xl font-bold text-slate-900">SmartReg</Link>
          <p className="text-sm text-slate-500">Meru University School Registration System</p>
        </div>
        <nav className="flex flex-wrap items-center gap-3">
          {navByRole[role].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
          <form action="/api/auth/demo-login" method="post">
            <input type="hidden" name="logout" value="true" />
            <Button type="submit" variant="secondary">Logout</Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
