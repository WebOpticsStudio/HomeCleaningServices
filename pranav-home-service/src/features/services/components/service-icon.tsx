import { Bath, House, Sparkles, Truck, type LucideProps } from 'lucide-react';
import type { ServiceIconName } from '../types';

const icons = { home: House, sparkles: Sparkles, truck: Truck, bath: Bath } as const;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
