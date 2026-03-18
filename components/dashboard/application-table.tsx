import { StatusBadge } from '@/components/ui/badge';
import { Application } from '@/lib/types';

export function ApplicationTable({ applications }: { applications: Application[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Applicant</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">AI Recommendation</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-slate-100">
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-900">{application.full_name}</div>
                  <div className="text-slate-500">{application.email}</div>
                </td>
                <td className="px-4 py-4">{application.selected_course}</td>
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-800">{application.ai_recommended_course}</div>
                  <div className="max-w-md text-xs text-slate-500">{application.ai_reasoning}</div>
                </td>
                <td className="px-4 py-4"><StatusBadge status={application.status} /></td>
                <td className="px-4 py-4 text-slate-500">{new Date(application.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
