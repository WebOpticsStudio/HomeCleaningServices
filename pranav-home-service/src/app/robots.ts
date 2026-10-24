import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', ROUTES.bookingSuccess] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
