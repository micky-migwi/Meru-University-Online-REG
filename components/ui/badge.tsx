import { ApplicationStatus } from '@/lib/types';
import { cn, getStatusTone } from '@/lib/utils';

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={cn('rounded-full px-3 py-1 text-xs font-semibold capitalize', getStatusTone(status))}>{status.replace('_', ' ')}</span>;
}
