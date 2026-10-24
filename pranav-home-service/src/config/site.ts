/**
 * Central site configuration. Update values marked TODO(owner) before launch.
 * Nothing in this file is secret; it ships to the browser.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const siteConfig = {
  name: 'Kolar Cleaning Services',
  tagline: 'Professional Home & Move-Out Cleaning in Kolar',
  description:
    'Kolar Cleaning Services provides trained, reliable cleaning across Kolar, Karnataka: standard upkeep, deep cleaning, move-in/move-out, and kitchen deep cleaning with transparent pricing.',
  url: rawUrl.replace(/\/$/, ''),
  locale: 'en_IN',
  /** Used to decide what "today" means when validating booking dates. */
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  /** Prefix added to 10-digit phone numbers that have no country code. */
  defaultCountryCode: '+91',
  contact: {
    // Note: Configurable placeholders for business details requiring owner confirmation.
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    whatsapp: '+91 98765 43210',
    whatsappHref:
      'https://wa.me/919876543210?text=Hello%20Kolar%20Cleaning%20Services%2C%20I%20would%20like%20to%20inquire%20about%20a%20cleaning%20booking.',
    email: 'info@kolarcleaningservices.com',
    serviceArea: 'Kolar, Karnataka, India',
    hours: 'Monday to Sunday, 8:00 AM – 7:00 PM IST',
  },
} as const;
