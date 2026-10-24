import type { NavItem } from '@/types';
import { ROUTES } from '@/constants/routes';

export const mainNavigation: readonly NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About Us', href: ROUTES.about },
  { label: 'Services', href: ROUTES.services },
  { label: 'Gallery', href: ROUTES.homeGallery },
  { label: 'Contact', href: ROUTES.contact },
];

export const footerNavigation: readonly { title: string; items: readonly NavItem[] }[] = [
  {
    title: 'Company',
    items: [
      { label: 'About us', href: ROUTES.about },
      { label: 'Before and after', href: ROUTES.gallery },
      { label: 'Pricing', href: ROUTES.pricing },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Home cleaning', href: ROUTES.service('home-cleaning') },
      { label: 'Deep cleaning', href: ROUTES.service('deep-cleaning') },
      { label: 'Move-in and move-out', href: ROUTES.service('move-in-out-cleaning') },
      { label: 'Bathroom cleaning', href: ROUTES.service('bathroom-cleaning') },
    ],
  },
];
