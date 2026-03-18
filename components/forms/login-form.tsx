'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const roles = [
  { value: 'student', label: 'Student demo access', path: '/dashboard/student' },
  { value: 'admissions', label: 'Admissions demo access', path: '/dashboard/admissions' },
  { value: 'developer', label: 'Developer demo access', path: '/dashboard/developer' },
] as const;

export function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function login(role: (typeof roles)[number]) {
    startTransition(async () => {
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.value }),
      });

      if (!response.ok) {
        toast.error('Unable to start demo session');
        return;
      }

      toast.success(`Signed in as ${role.value}`);
      router.push(role.path);
      router.refresh();
    });
  }

  return (
    <Card className="max-w-xl">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Demo sign in</p>
        <h1 className="text-3xl font-bold text-slate-900">Access role-specific SmartReg dashboards</h1>
        <p className="text-slate-600">This starter uses a demo cookie-based session for local development and is ready to swap to Supabase Auth in production.</p>
      </div>
      <div className="mt-8 grid gap-4">
        {roles.map((role) => (
          <button key={role.value} onClick={() => login(role)} disabled={pending} className="rounded-2xl border border-slate-200 p-5 text-left transition hover:border-primary hover:bg-teal-50">
            <div className="font-semibold text-slate-900">{role.label}</div>
            <div className="mt-1 text-sm text-slate-500">Open the {role.value} portal with demo data.</div>
          </button>
        ))}
      </div>
      <Button className="mt-6 w-full" type="button" onClick={() => login(roles[0])} disabled={pending}>
        {pending ? 'Signing in…' : 'Quick student sign in'}
      </Button>
    </Card>
  );
}
