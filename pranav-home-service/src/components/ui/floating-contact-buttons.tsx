'use client';

import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

/** Official WhatsApp logo vector */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path
        d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Persistent floating contact actions for Call and WhatsApp.
 * Fixed in the viewport corner for frictionless conversion, especially on mobile.
 */
export function FloatingContactButtons() {
  return (
    <aside
      aria-label="Quick contact options"
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 md:hidden"
    >
      {/* WhatsApp Floating Button */}
      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lift transition-all hover:scale-105 hover:bg-[#20ba5a] hover:shadow-xl focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:outline-none active:scale-95"
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        <span className="text-sm font-bold tracking-wide">WhatsApp</span>
      </a>

      {/* Call Floating Button */}
      <a
        href={siteConfig.contact.phoneHref}
        aria-label={`Call ${siteConfig.name} directly at ${siteConfig.contact.phone}`}
        className="group hover:bg-primary-hover flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-lift transition-all hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none active:scale-95"
      >
        <Phone className="size-5 shrink-0" aria-hidden="true" />
        <span className="text-sm font-bold tracking-wide">Call Now</span>
      </a>
    </aside>
  );
}
