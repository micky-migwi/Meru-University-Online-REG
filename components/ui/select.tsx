import * as React from 'react';
import { cn } from '@/lib/utils';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn('flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm outline-none ring-primary/20 transition focus:border-primary focus:ring-4', className)}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = 'Select';
