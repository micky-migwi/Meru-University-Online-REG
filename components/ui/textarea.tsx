import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn('flex min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-primary/20 transition placeholder:text-slate-400 focus:border-primary focus:ring-4', className)}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
