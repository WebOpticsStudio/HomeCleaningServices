import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant: 'error' | 'success';
  title: string;
  children?: ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/** `role="alert"` makes screen readers announce the message as soon as it appears. */
export function Alert({ variant, title, children, className, ref }: AlertProps) {
  const Icon = variant === 'error' ? CircleAlert : CircleCheck;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex gap-3 rounded-card border p-4',
        variant === 'error'
          ? 'border-danger/40 bg-danger-soft text-danger'
          : 'border-success/40 bg-success-soft text-success',
        className,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1 text-sm text-ink">{children}</div>}
      </div>
    </div>
  );
}
