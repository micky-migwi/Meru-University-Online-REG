import { Card } from '@/components/ui/card';

export function MetricCard({ label, value, helper }: { label: string; value: string | number; helper: string }) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </Card>
  );
}
