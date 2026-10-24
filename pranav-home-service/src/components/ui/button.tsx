import Link from 'next/link';
import type { ComponentProps } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'md' | 'lg';

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: 'bg-lemon text-[#0a2e26] font-bold hover:bg-lemon-strong',
  secondary: 'bg-primary text-white hover:bg-primary-strong',
  outline: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-rinse',
};

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-7 py-3 text-base',
};

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: StyleOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );
}

type ButtonProps = ComponentProps<'button'> & StyleOptions & { loading?: boolean };

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleOptions;

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, fullWidth, className })} {...props} />;
}
