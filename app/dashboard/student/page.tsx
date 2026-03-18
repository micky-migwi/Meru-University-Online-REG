import { ApplicationForm } from '@/components/forms/application-form';
import { DashboardNav } from '@/components/dashboard/nav';
import { ApplicationTable } from '@/components/dashboard/application-table';
import { Card } from '@/components/ui/card';
import { requireRole } from '@/lib/auth';
import { getApplicationsByUser } from '@/lib/data';

export default async function StudentDashboardPage() {
  await requireRole(['student']);
  const applications = await getApplicationsByUser('student-1');

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role="student" />
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="bg-slate-950 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Student portal</p>
            <h1 className="mt-3 text-4xl font-bold">Track your admission journey in real time</h1>
            <p className="mt-3 max-w-2xl text-slate-300">From submission to approval, SmartReg keeps learners informed with AI course guidance, document checklists, and live status updates.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Applications</p>
                <p className="mt-2 text-3xl font-bold">{applications.length}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Latest status</p>
                <p className="mt-2 text-3xl font-bold capitalize">{applications[0]?.status.replace('_', ' ') ?? 'none'}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">AI suggestion</p>
                <p className="mt-2 text-xl font-bold">{applications[0]?.ai_recommended_course ?? 'Awaiting submission'}</p>
              </div>
            </div>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Progress tracker</p>
            <ol className="mt-4 space-y-4 text-sm text-slate-600">
              {['Account created', 'Application submitted', 'Documents reviewed', 'Decision issued', 'Registration activated'].map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${index < 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>{index + 1}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{step}</p>
                    <p>{index < 3 ? 'Current workflow support is active.' : 'Unlocks after final approval and payment validation.'}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <section id="apply">
          <ApplicationForm />
        </section>
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Submitted applications</h2>
            <p className="text-slate-500">The dashboard is ready for Supabase Realtime subscriptions so students can see decisions immediately.</p>
          </div>
          <ApplicationTable applications={applications} />
        </section>
      </main>
    </div>
  );
}
