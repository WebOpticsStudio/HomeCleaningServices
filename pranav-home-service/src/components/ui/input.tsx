import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const controlStyles =
  'min-h-12 w-full rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 ' +
  'placeholder:text-slate-400 transition-all outline-none ' +
  'focus:bg-white focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10 ' +
  'aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-soft/40 ' +
  'disabled:opacity-60';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(controlStyles, className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(controlStyles, className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(controlStyles, 'min-h-28', className)} {...props} />;
}
