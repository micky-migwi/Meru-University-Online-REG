import { DecisionPanel } from '@/components/dashboard/decision-panel';
import { MetricCard } from '@/components/dashboard/metric-card';
import { DashboardNav } from '@/components/dashboard/nav';
import { requireRole } from '@/lib/auth';
import { getApplications } from '@/lib/data';

export default async function AdmissionsDashboardPage() {
  await requireRole(['admissions']);
  const applications = await getApplications();
  const autoApproved = applications.filter((application) => application.status === 'auto_approved').length;
  const autoRejected = applications.filter((application) => application.status === 'auto_rejected').length;
  const pending = applications.filter((application) => application.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role="admissions" />
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Pending review" value={pending} helper="Borderline cases that need a human decision." />
          <MetricCard label="Auto-approved" value={autoApproved} helper="Passed course requirements and subject thresholds." />
          <MetricCard label="Auto-rejected" value={autoRejected} helper="Below programme minimums or required subject profile." />
        </div>
        <DecisionPanel applications={applications} />
      </main>
    </div>
  );
}
