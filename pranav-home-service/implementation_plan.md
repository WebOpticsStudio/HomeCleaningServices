# Performance Optimization Implementation Plan (45 -> 90+)

## 1. Executive Summary & Baseline Bottlenecks
The website's baseline performance score (45-60) is primarily held back by four key performance drivers identified in Lighthouse audits:
1. **Uncompressed Legacy Image Formats & Bloated Payloads**: Large JPEG assets (hero, gallery, service catalogs) totaling over 15MB without native WebP compression or modern srcset sizing.
2. **Missing Explicit Dimensions & Cumulative Layout Shift (CLS)**: Dynamic `fill` layouts without hardcoded `width` and `height` attributes causing the browser layout engine to reserve zero initial space before image download.
3. **Main-Thread JavaScript Congestion & Client Hydration**: Heavy client-side interactive widgets (gallery before/after comparison slider, testimonials carousel, FAQ accordion) eagerly loaded synchronously in the initial bundle.
4. **Font Flash & Uncached Static Delivery**: Font swapping layout variations and lack of gzip/brotli compression and long-term immutable caching headers.

---

## 2. Structural Code Improvements & Phased Plan

### Phase 1: Image Assets & WebP Compression
- **Automated WebP Conversion**: Transcode all images in `public/images/gallery`, `public/images/services`, `public/images/avatars`, and `public/images/` to WebP format using `sharp` (quality 80-85, mozjpeg/webp compression).
- **Responsive Srcset & Image Sizing**:
  - Update `src/features/gallery/data/gallery.ts` to reference `.webp` files.
  - Update `src/features/services/data/services.ts` to reference `.webp` files.
  - Update `hero.tsx` to use `/images/hero-cleaner.webp` with high fetch priority (`fetchPriority="high"`).
  - Configure `sizes` attributes tailored to standard breakpoints (`(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw`).

### Phase 2: Explicit Width & Height Dimensions (Zero CLS)
- Audit all Next.js `<Image>` components across the repository:
  - `hero.tsx`: Explicit dimensions `width={1200} height={896}` with CSS `h-full w-full object-cover`.
  - `why-choose-us.tsx`: Explicit dimensions `width={800} height={1000}` with `aspect-[4/5]`.
  - `services-overview.tsx`: Explicit dimensions `width={1200} height={800}` with aspect ratio container.
  - `service-card.tsx`: Explicit dimensions `width={service.image.width} height={service.image.height}`.
  - `before-after-slider.tsx`: Preserve explicit `width={800} height={600}` with lazy loading.
  - `testimonial-card.tsx`: Preserve explicit `width={36} height={36}` on 128x128 retina avatars.
  - `hero.tsx` avatars: Explicit `width={28} height={28}` with `loading="eager"`.

### Phase 3: Defer Non-Critical JavaScript & CSS
- **Dynamic Imports for Below-the-Fold Widgets**:
  - In `src/app/page.tsx`, dynamically import below-the-fold client components (`TestimonialsSection`, `GalleryPreview`, `FaqSection`) using `next/dynamic`.
  - This removes heavy drag slider logic and accordion interactive handlers from the initial main-thread execution bundle, minimizing Total Blocking Time (TBT).
- **Font Optimization**:
  - Verify `display: 'swap'` on all local variable fonts (`Bricolage Grotesque` and `Figtree`).
  - Preload primary Latin subset WOFF2 fonts.
  - Ensure `data-scroll-behavior="smooth"` on `<html>`.

### Phase 4: Production Build, Minification & Caching
- **Next.js Configuration (`next.config.ts`)**:
  - `compress: true` for gzip/brotli transfer compression.
  - `images: { formats: ['image/avif', 'image/webp'], minimumCacheTTL: 31536000 }`.
  - Immutable caching headers for static chunks and images (`public, max-age=31536000, immutable`).
- **Validation**:
  - Execute `npm run build` with Turbopack production compilation.
  - Start production server (`npm run start`).
  - Audit with Lighthouse to confirm performance >= 90.
