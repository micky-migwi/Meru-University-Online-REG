import { DashboardNav } from '@/components/dashboard/nav';
import { MetricCard } from '@/components/dashboard/metric-card';
import { TrafficChart } from '@/components/dashboard/traffic-chart';
import { Card } from '@/components/ui/card';
import { requireRole } from '@/lib/auth';
import { getMetrics } from '@/lib/data';

export default async function DeveloperDashboardPage() {
  await requireRole(['developer']);
  const metrics = await getMetrics();

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role="developer" />
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Total users" value={metrics.totalUsers} helper="Students, admissions officers, and developers." />
          <MetricCard label="Applications" value={metrics.totalApplications} helper="All records synced from the admissions pipeline." />
          <MetricCard label="Approved" value={metrics.approved} helper="Approved and auto-approved combined." />
          <MetricCard label="Rejected" value={metrics.rejected} helper="Rejected and auto-rejected combined." />
          <MetricCard label="System uptime" value={metrics.uptime} helper="Mock operational health metric for observability." />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Traffic insights</h2>
                <p className="text-slate-500">Daily portal visits and registration workflow engagement.</p>
              </div>
            </div>
            <div className="mt-6"><TrafficChart data={metrics.traffic} /></div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-slate-900">Recent activity logs</h2>
            <div className="mt-6 space-y-4">
              {metrics.recentActivity.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{item.action}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.actor}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-primary">{item.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
