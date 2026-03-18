import Link from 'next/link';
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { courses } from '@/lib/constants';

const highlights = [
  {
    icon: BrainCircuit,
    title: 'AI-guided placement',
    description: 'Recommend courses from KCSE scores, explain fit, and auto-route exceptional applicants.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based security',
    description: 'Separate student, admissions, and developer experiences with route protection and audit visibility.',
  },
  {
    icon: Sparkles,
    title: 'Realtime-ready workflows',
    description: 'Status tracking, notifications, and deployment-ready patterns for Supabase subscriptions.',
  },
];

export default function HomePage() {
  return (
    <main className="bg-grid min-h-screen">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center lg:py-24">
        <div className="max-w-3xl flex-1 space-y-8">
          <span className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-primary">Admissions automation for Meru University</span>
          <div className="space-y-5">
            <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">SmartReg – modern university admissions, approvals, and registration.</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">A Next.js + Supabase starter that supports student applications, admissions decisioning, developer analytics, document workflows, and AI-assisted course recommendations.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Launch dashboards <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/auth/register" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}>
              Student registration
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title}>
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
        <Card className="w-full max-w-xl flex-1 bg-slate-950 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Available programmes</p>
          <h2 className="mt-3 text-3xl font-bold">Built-in admissions logic and fee metadata</h2>
          <div className="mt-6 space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{course.name}</p>
                    <p className="text-sm text-slate-300">Required subjects: {course.required_subjects.join(', ')}</p>
                  </div>
                  <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-200">Min grade points {course.min_grade}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
