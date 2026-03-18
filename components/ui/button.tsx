import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-teal-700',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100',
        ghost: 'text-slate-700 hover:bg-slate-100',
      },
      size: {
        md: 'h-11 px-4 py-2',
        lg: 'h-12 px-6 py-3',
        sm: 'h-9 px-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
