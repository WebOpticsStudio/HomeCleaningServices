import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  tone?: 'plain' | 'tint' | 'dark';
  align?: 'left' | 'center';
  children: ReactNode;
  className?: string;
}

const tones = {
  plain: 'bg-paper text-ink',
  tint: 'bg-rinse text-ink',
  dark: 'bg-ink text-white',
} as const;

/** Page section with an optional heading. `id` doubles as the aria-labelledby anchor. */
export function Section({
  id,
  title,
  description,
  tone = 'plain',
  align = 'left',
  children,
  className,
}: SectionProps) {
  const headingId = id && title ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('py-16 sm:py-20', tones[tone], className)}
    >
      <Container>
        {title && (
          <header className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
            <h2 id={headingId} className="text-3xl font-bold sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p
                className={cn('mt-3 text-lg', tone === 'dark' ? 'text-white/80' : 'text-ink-soft')}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
