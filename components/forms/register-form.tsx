'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success(`Demo registration captured for ${email}. Connect Supabase Auth to activate real sign-ups.`);
    setEmail('');
    setPassword('');
  }

  return (
    <Card className="max-w-xl">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Student onboarding</p>
        <h1 className="text-3xl font-bold text-slate-900">Create your SmartReg account</h1>
        <p className="text-slate-600">Production setup uses Supabase email/password auth. This scaffold keeps the UX wired while remaining safe to run without cloud credentials.</p>
      </div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <Input placeholder="student@meru.ac.ke" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input placeholder="Strong password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button className="w-full" type="submit">Create account</Button>
      </form>
      <p className="mt-4 text-sm text-slate-500">Already have an account? <Link href="/auth/login" className="font-semibold text-primary">Sign in</Link></p>
    </Card>
  );
}
