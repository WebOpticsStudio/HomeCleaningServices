import type { ServiceSlug } from '@/constants/catalog';
import { services } from '../data/services';
import type { Service } from '../types';

export function getServices(): readonly Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: ServiceSlug, count = 2): readonly Service[] {
  return services.filter((service) => service.slug !== slug).slice(0, count);
}
