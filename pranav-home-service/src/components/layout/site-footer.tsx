'use client';

import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';

export function SiteFooter() {
  const { contact } = siteConfig;

  return (
    <footer className="bg-[#072d23] text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
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
                  aria-hidden="true"
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
                <span className="text-xl leading-tight font-bold tracking-tight text-slate-300">
                  Kolar<span className="text-teal-400">Clean</span>
                </span>
                <span className="block text-[10px] font-normal tracking-wide text-slate-400 uppercase">
                  Clean Homes, Happier Lives
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
              Professional cleaning services for homes and businesses across Kolar. Clean spaces,
              brighter days, and transparent pricing confirmed before we start.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-lemon hover:text-ink"
              >
                <Phone className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-lemon hover:text-ink"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-lemon hover:text-ink"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-lemon hover:text-ink"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-white/75 sm:text-sm">
              <li>
                <Link href={ROUTES.home} className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services} className="transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href={ROUTES.homeGallery} className="transition-colors hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href={ROUTES.booking} className="transition-colors hover:text-white">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Our Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs text-white/75 sm:text-sm">
              <li>
                <Link
                  href={ROUTES.service('home-cleaning')}
                  className="transition-colors hover:text-white"
                >
                  Basic Home Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.service('deep-cleaning')}
                  className="transition-colors hover:text-white"
                >
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.service('kitchen-deep-cleaning')}
                  className="transition-colors hover:text-white"
                >
                  Kitchen Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.service('bathroom-cleaning')}
                  className="transition-colors hover:text-white"
                >
                  Bathroom Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.service('move-in-out-cleaning')}
                  className="transition-colors hover:text-white"
                >
                  Move In/Out Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Contact Info
            </h2>
            <ul className="mt-4 space-y-3 text-xs text-white/75 sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lemon" aria-hidden="true" />
                <span>{contact.serviceArea}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-lemon" aria-hidden="true" />
                <a href={contact.phoneHref} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-lemon" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 align-text-top text-lemon" aria-hidden="true" />
                <span>{contact.hours}</span>
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-normal text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/about" className="transition-colors hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
