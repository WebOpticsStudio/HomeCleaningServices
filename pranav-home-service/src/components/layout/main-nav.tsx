'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

function isNavItemActive(pathname: string, href: string, activeHash: string) {
  // Gallery link matches /#gallery hash or the /gallery route
  if (
    href === ROUTES.homeGallery ||
    href === ROUTES.gallery ||
    href === '/#gallery' ||
    href === '#gallery'
  ) {
    if (pathname === ROUTES.gallery) return true;
    if (pathname === '/' && activeHash === '#gallery') return true;
    return false;
  }

  // When #gallery is active on home page, Home should not be active
  if ((href === '/' || href === ROUTES.home) && pathname === '/' && activeHash === '#gallery') {
    return false;
  }

  // Contact or Booking
  if (href === ROUTES.booking || href === ROUTES.contact) {
    return pathname === ROUTES.booking;
  }

  if (href === '/' || href === ROUTES.home) return pathname === '/';
  if (href.startsWith('/#') || href.startsWith('#')) return false;

  return pathname === href || pathname.startsWith(`${href}/`);
}

function useActiveNavHash(pathname: string) {
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkHashAndScroll = () => {
      const hash = window.location.hash;
      if (hash === '#gallery') {
        setActiveHash('#gallery');
        if (pathname === '/') {
          const el = document.getElementById('gallery');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            setTimeout(() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
          }
        }
      } else if (hash) {
        setActiveHash(hash);
      } else if (pathname === '/') {
        if (window.scrollY < 300) {
          setActiveHash('');
        }
      }
    };

    checkHashAndScroll();

    const onHashChange = () => {
      checkHashAndScroll();
    };

    window.addEventListener('hashchange', onHashChange);

    // On home page, detect when gallery section is active/scrolled into view
    if (pathname === '/') {
      const handleScroll = () => {
        const galleryElem = document.getElementById('gallery');
        if (!galleryElem) return;

        const rect = galleryElem.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // If gallery section is in current viewport
        if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.2) {
          setActiveHash('#gallery');
        } else if (window.scrollY < 300) {
          setActiveHash('');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('hashchange', onHashChange);
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setActiveHash('');
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [pathname]);

  return [activeHash, setActiveHash] as const;
}

export function DesktopNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useActiveNavHash(pathname);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemHref: string,
  ) => {
    if (itemHref === ROUTES.homeGallery || itemHref === '/#gallery' || itemHref === '#gallery') {
      setActiveHash('#gallery');
      if (pathname === '/') {
        e.preventDefault();
        const galleryEl = document.getElementById('gallery');
        if (galleryEl) {
          galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '#gallery');
        }
      }
      return;
    }

    if (itemHref === '/' || itemHref === ROUTES.home) {
      setActiveHash('');
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      return;
    }

    setActiveHash('');
  };

  return (
    <nav
      aria-label="Main"
      className="hidden items-center justify-center gap-8 text-sm font-medium md:flex"
    >
      {items.map((item) => {
        const active = isNavItemActive(pathname, item.href, activeHash);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative inline-flex items-center py-2 transition-colors',
              active ? 'font-semibold text-teal-700' : 'text-slate-600 hover:text-slate-900',
            )}
          >
            <span>{item.label}</span>
            {active && (
              <span
                className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-teal-700"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useActiveNavHash(pathname);
  const { isOpen, close, toggle } = useDisclosure();
  const panelId = useId();

  const handleMobileClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemHref: string,
  ) => {
    close();
    if (itemHref === ROUTES.homeGallery || itemHref === '/#gallery' || itemHref === '#gallery') {
      setActiveHash('#gallery');
      if (pathname === '/') {
        e.preventDefault();
        const galleryEl = document.getElementById('gallery');
        if (galleryEl) {
          galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '#gallery');
        }
      }
      return;
    }

    if (itemHref === '/' || itemHref === ROUTES.home) {
      setActiveHash('');
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      return;
    }

    setActiveHash('');
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="inline-flex size-11 items-center justify-center rounded-full hover:bg-rinse"
      >
        {isOpen ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-grout bg-paper px-5 pt-2 pb-6 shadow-lift"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = isNavItemActive(pathname, item.href, activeHash);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleMobileClick(e, item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center justify-between border-b border-grout/60 text-lg font-semibold transition-colors',
                      active ? 'text-teal-700' : 'text-slate-800 hover:text-slate-950',
                    )}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="size-2 rounded-full bg-teal-700" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ButtonLink href={ROUTES.booking} onClick={close} size="lg" fullWidth className="mt-5">
          Book a cleaning
        </ButtonLink>
      </div>
    </div>
  );
}
