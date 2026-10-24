import type { Service } from '../types';
import { ServiceCard } from './service-card';

export function ServiceGrid({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug} className="flex">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
