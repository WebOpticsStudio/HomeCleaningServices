import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { getServices } from '@/features/services/lib/get-services';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services,
    ROUTES.gallery,
    ROUTES.pricing,
    ROUTES.booking,
  ];
  const serviceRoutes = getServices().map((service) => ROUTES.service(service.slug));
  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    changeFrequency: path === ROUTES.home ? 'weekly' : 'monthly',
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
