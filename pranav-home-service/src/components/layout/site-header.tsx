import Link from 'next/link';
import { mainNavigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { DesktopNav, MobileNav } from './main-nav';

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-xs isolate"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Announcement Bar (Clean & Faint) */}
      <div className="border-b border-slate-100 bg-slate-50 py-2 text-center text-xs tracking-wide text-slate-600">
        ✨ Professional home, kitchen & deep cleaning across Kolar • Upfront pricing & zero advance
        payment
      </div>

      {/* Premium Symmetrical Header Navigation with Solid Background */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
        {/* Logo Block */}
        <Link
          href={ROUTES.home}
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} - Home`}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 shadow-md transition-transform group-hover:scale-105">
            <svg
              className="size-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl leading-tight font-bold tracking-tight text-slate-900">
              Kolar<span className="text-teal-700">Clean</span>
            </span>
            <span className="block text-[10px] font-normal tracking-wide text-slate-400 uppercase">
              Clean Homes, Happier Lives
            </span>
          </div>
        </Link>

        {/* Properly Aligned Navigation Links */}
        <DesktopNav items={mainNavigation} />

        {/* Header Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.booking}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-slate-200 transition-all duration-200 hover:bg-teal-800"
          >
            Book Online
          </Link>
          <MobileNav items={mainNavigation} />
        </div>
      </div>
    </header>
  );
}
