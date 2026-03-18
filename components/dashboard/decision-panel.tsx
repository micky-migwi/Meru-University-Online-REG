'use client';

import { type ChangeEvent, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Application } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/ui/badge';

export function DecisionPanel({ applications }: { applications: Application[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | Application['status']>('all');
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return filter === 'all' ? applications : applications.filter((application) => application.status === filter);
  }, [applications, filter]);

  async function updateDecision(id: string, decision: 'approved' | 'rejected') {
    startTransition(async () => {
      const response = await fetch(`/api/applications/${id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, remarks: remarks[id] ?? '' }),
      });

      if (!response.ok) {
        toast.error('Unable to update application');
        return;
      }

      toast.success(`Application ${decision}.`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admissions decision workspace</h2>
          <p className="text-slate-500">Monitor auto-decisions, override outcomes, and trigger final admission emails.</p>
        </div>
        <Select className="w-full md:w-64" value={filter} onChange={(event: ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value as typeof filter)}>
          <option value="all">All applications</option>
          <option value="pending">Pending</option>
          <option value="auto_approved">Auto-approved</option>
          <option value="auto_rejected">Auto-rejected</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </Select>
      </div>
      <div className="grid gap-5">
        {filtered.map((application) => (
          <Card key={application.id}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{application.full_name}</h3>
                  <StatusBadge status={application.status} />
                </div>
                <p className="text-sm text-slate-500">{application.selected_course} · KCSE index {application.kcse_index}</p>
                <p className="text-sm text-slate-700"><span className="font-semibold">AI recommendation:</span> {application.ai_recommended_course}</p>
                <p className="max-w-3xl text-sm text-slate-500">{application.ai_reasoning}</p>
                {application.registration_number && <p className="text-sm font-semibold text-primary">Registration Number: {application.registration_number}</p>}
              </div>
              <div className="grid w-full gap-3 xl:max-w-md">
                <Textarea placeholder="Add review remarks" value={remarks[application.id] ?? application.remarks} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setRemarks((current: Record<string, string>) => ({ ...current, [application.id]: event.target.value }))} />
                <div className="flex flex-wrap gap-3">
                  <Button type="button" disabled={pending} onClick={() => updateDecision(application.id, 'approved')}>Approve</Button>
                  <Button type="button" variant="secondary" disabled={pending} onClick={() => updateDecision(application.id, 'rejected')}>Reject</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
