import type { ReactNode } from 'react';
import { Container } from './container';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/** The <h1> block at the top of every inner page. */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-100 bg-[#F8FAFC]">
      <Container className="py-14 sm:py-16">
        <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-slate-500">{description}</p>}
        {children}
      </Container>
    </div>
  );
}
