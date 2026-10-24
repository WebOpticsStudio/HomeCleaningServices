/** Single source of truth for internal URLs. Never hardcode paths in components. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  service: (slug: string) => `/services/${slug}` as const,
  gallery: '/gallery',
  homeGallery: '/#gallery',
  pricing: '/pricing',
  contact: '/booking',
  booking: '/booking',
  bookingSuccess: '/booking/success',
} as const;

/** Builds a booking URL that preselects a service, package and/or bhk. */
export function bookingUrl(params?: { service?: string; package?: string; bhk?: string }): string {
  const search = new URLSearchParams();
  if (params?.service) search.set('service', params.service);
  if (params?.package) search.set('package', params.package);
  if (params?.bhk) search.set('bhk', params.bhk);
  const query = search.toString();
  return query ? `${ROUTES.booking}?${query}` : ROUTES.booking;
}
