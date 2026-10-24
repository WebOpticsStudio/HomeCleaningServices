# Kolar Cleaning Services

Production-ready, responsive, conversion-focused website for **Kolar Cleaning Services** in Kolar, Karnataka, India.
Built with Next.js (App Router) · React 19 · TypeScript · Tailwind CSS · Firebase (Cloud Firestore) · Vercel.

Features:

- **Hero & Core Value Proposition** with prominent Kolar, Karnataka service area indicator
- **Interactive Drag-to-Reveal Before/After Comparison Slider**
- **Transparent Pricing Cards** (Standard, Deep Clean, Kitchen Deep Cleaning, Move-in/Move-out) with **"Book This Package"** buttons that auto-preselect packages in the booking form
- **Comprehensive Service Area Section** detailing Kolar town neighborhoods and surrounding taluks (Bangarapet, Malur, KGF, Mulbagal, Srinivaspur, Vemagal)
- **Persistent Floating Call & WhatsApp Action Buttons** optimized for mobile conversion
- **Quick 60-Second Booking Form** on home page + dedicated full booking page
- **Server Action Booking Flow with Firestore Storage**, rate limiting, honeypot anti-spam, idempotency, and deduplication
- **Accessible, Responsive Design System** with native accordion FAQs and clean micro-interactions

> **Sample content note:** Prices, service copy, testimonials, FAQs, contact numbers, and service areas include configurable placeholders requiring owner confirmation prior to live marketing campaigns. Real customer reviews should replace the labeled placeholders upon collection.

---

## Quick start

Requires **Node.js 22 or newer** (`.nvmrc` is included) and npm.

```bash
npm install
cp .env.example .env.local     # fill in Firebase credentials (see "Firebase setup")
npm run dev                    # http://localhost:3000
```

The public pages function with local mock data if Firebase credentials are not yet set. Submitting the live booking form to Firestore requires the server-side environment variables.

| Task                      | Command                                                   |
| ------------------------- | --------------------------------------------------------- |
| Development server        | `npm run dev`                                             |
| Production build / start  | `npm run build` / `npm run start`                         |
| Lint                      | `npm run lint` (auto-fix: `npm run lint:fix`)             |
| Type check                | `npm run typecheck`                                       |
| Format / check formatting | `npm run format` / `npm run format:check`                 |
| Unit + component tests    | `npm test` (watch: `npm run test:watch`)                  |
| End-to-end tests          | `npx playwright install chromium` then `npm run test:e2e` |
| Everything except e2e     | `npm run validate`                                        |

---

## Project Structure

```
pranav-home-service/
├── e2e/                         Playwright end-to-end specs
├── public/images/               Optimized service illustrations & before/after graphics
├── src/
│   ├── app/                     ROUTES ONLY: pages, layouts, loading/error/not-found, metadata
│   │   ├── about/ services/ services/[slug]/ gallery/ pricing/
│   │   ├── booking/ booking/success/
│   │   ├── api/health/          Liveness endpoint
│   │   ├── robots.ts sitemap.ts opengraph-image.tsx icon.svg
│   │   └── layout.tsx page.tsx loading.tsx error.tsx global-error.tsx not-found.tsx
│   ├── components/
│   │   ├── ui/                  Generic primitives (Button, Section, FormField, Accordion, FloatingContactButtons...)
│   │   ├── layout/              Header, footer, navigation, skip link
│   │   └── seo/                 JSON-LD helper
│   ├── features/                One folder per business domain (components + data + logic)
│   │   ├── booking/             schemas/ actions/ server/ components/ lib/ types.ts
│   │   ├── gallery/             components/ (BeforeAfterSlider, BeforeAfterCard), data, lib
│   │   ├── home/                hero, quick-booking, service-area-section, why-choose-us, previews
│   │   ├── pricing/             types, data (packages with 'Book This Package' CTAs), components
│   │   ├── services/            types, data (including Kitchen Deep Cleaning), components
│   │   ├── testimonials/        sample testimonials & component
│   │   ├── faq/                 accordion data & list
│   │   └── about/               company values & highlights

│   ├── lib/
│   │   ├── firebase/            client-env, server-env, client, admin, firestore, types
│   │   ├── rate-limit/          RateLimiter interface + in-memory implementation
│   │   ├── security/ request/   HMAC hashing, client-IP helper
│   │   └── errors.ts logger.ts seo.ts date.ts format.ts utils.ts
│   ├── config/                  site.ts (name, contact, timezone), navigation.ts
│   ├── constants/               routes, catalog ids, booking limits and option lists
│   ├── hooks/                   Reusable React hooks
│   ├── types/                   Shared TypeScript types
│   ├── styles/globals.css       Tailwind + design tokens
│   └── assets/fonts/            Self-hosted variable fonts (SIL OFL licences included)
├── tests/                       Vitest unit and component tests
├── firestore.rules              Security rules (deny-all for the public)
├── firestore.indexes.json       Indexes (only needed by an optional admin area)
└── firebase.json  .firebaserc   Firebase CLI + emulator config
```

### Key decisions

- **Server Components by default.** Only the booking form, the mobile menu and the error boundaries are Client
  Components. The gallery filter, FAQ accordion and navigation links work without client JavaScript.
- **Content is data, not markup.** Services, packages, testimonials, FAQs and gallery items live in
  `features/*/data/*.ts`. Editing a price or review never touches a component.
- **One source of truth for IDs.** `constants/catalog.ts` defines service slugs and package IDs used by the data
  files, the form and the validation schema, so they cannot drift apart.
- **Booking flow uses a Server Action, not a public REST endpoint.** One entry point means one place to defend.
  Next.js also verifies the request `Origin`, which blocks cross-site form posts.
- **Layered booking back end** (each layer is independently testable):
  `submitBookingAction` (rate limit, error mapping) → `BookingService` (validation, normalisation, honeypot,
  dedupe keys) → `BookingRepository` interface → `FirestoreBookingRepository` (Admin SDK transaction).
- **Errors are values.** Actions return `ActionResult` and never throw across the network; `lib/errors.ts` is the
  single place that logs and maps errors to user-safe messages.

---

## Booking flow and abuse protection

1. The browser validates with React Hook Form + the shared Zod schema (fast feedback).
2. The Server Action runs: **rate limit** (5 requests / 10 min per hashed IP) → **server-side re-validation of
   everything** → **honeypot** check (bots get a fake success and nothing is stored) → **idempotency and duplicate
   check** → Firestore write.
3. The booking ID (`PHS-` + 10 random Crockford-base32 characters, ~50 bits) is generated on the server with
   `crypto.randomBytes` and is also the Firestore document ID, so it is unique by construction.
4. **Duplicate prevention**: each form instance has a UUID idempotency key (a double click or network retry returns
   the original booking), plus a fingerprint of phone + service + date + slot that blocks identical requests for
   10 minutes. Both are stored as keyed hashes in `bookingDedupe/`, in the same transaction as the booking.
5. The success page receives only the booking ID and shows a non-personal summary (service, date, time).

**Rate limiter caveat.** The default limiter keeps counters in process memory. On serverless platforms each
instance has its own counters, so treat it as protection against casual abuse. For strict global limits, implement
the 1-method `RateLimiter` interface with Upstash Redis or Vercel KV and swap it in `src/lib/rate-limit/index.ts`.
Consider also enabling Vercel's Firewall / Bot Protection and Firebase App Check.

---

## Firebase: public config vs private credentials

| Variable                                                                                 | Public?              | Notes                                                                                                                 |
| ---------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_*`                                                                 | **Public by design** | Web app identifiers. Shipped to every browser. They are not secrets; Firestore rules (not secrecy) protect your data. |
| `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY` | **Private**          | Service-account credentials. Bypass all security rules. Server only; never prefix with `NEXT_PUBLIC_`.                |
| `HASH_SECRET`                                                                            | **Private**          | HMAC key for IP and dedupe hashes.                                                                                    |

Safeguards in the code: the Admin SDK modules start with `import 'server-only'` (the build fails if a Client
Component imports them), configuration is validated lazily with Zod, and validation errors report variable
**names only**, never values.

### Protecting customer personal information

- `firestore.rules` denies all client access to `bookings`. The browser never reads or writes Firestore; only the
  server (Admin SDK) does. There is no public query that can list or fetch bookings.
- Data minimisation: no raw IP address, no user agent. The IP is stored only as an HMAC. The public success page
  never shows name, phone, email or address.
- Logs never include customer fields (see `lib/logger.ts`).
- **Automatic deletion**: every booking has a `retainUntil` timestamp (730 days, `BOOKING_RETENTION_DAYS`) and every
  dedupe marker has `expireAt` (24 h). Enable Firestore TTL policies for both fields (setup step 7).
- The form asks for explicit consent to be contacted. Publish a privacy policy that matches what you collect, and
  check the legal requirements that apply to you (for example India's DPDP Act).

---

## Firebase setup (step by step)

1. Open the [Firebase console](https://console.firebase.google.com) → **Add project**.
2. **Build → Firestore Database → Create database**. Choose a region near your customers
   (for example `asia-south1` Mumbai) and **Production mode**.
3. **Project settings → General → Your apps → Web (`</>`)**: register an app and copy the config values into the
   six `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`.
4. **Project settings → Service accounts → Generate new private key.** From the downloaded JSON copy
   `project_id`, `client_email` and `private_key` into `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`
   and `FIREBASE_ADMIN_PRIVATE_KEY`. Keep the `\n` escapes inside the quotes. **Delete the JSON file afterwards**
   and never commit it (`.gitignore` already excludes common names).
5. Generate `HASH_SECRET`: `openssl rand -base64 32`.
6. Set your project ID in `.firebaserc`, then deploy the rules and indexes:
   ```bash
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules,firestore:indexes
   ```
7. **Enable TTL policies** (Firestore → Indexes → _Time-to-live_, or `gcloud firestore fields ttls update`):
   collection group `bookings`, field `retainUntil`; collection group `bookingDedupe`, field `expireAt`.
8. _(Recommended)_ Restrict the web API key to your domains in Google Cloud Console → APIs & Services → Credentials,
   and enable Firebase App Check if you later add browser-side Firebase features.

### Local development with the emulator (no real key needed)

```bash
npx firebase-tools emulators:start --only firestore
# in .env.local set:  FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
# plus FIREBASE_ADMIN_PROJECT_ID (any id) and HASH_SECRET. The service-account key is not required.
```

---

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket and **Import** it in Vercel (framework is auto-detected).
2. **Settings → Environment Variables**: add every variable from `.env.example` for _Production_ (and _Preview_
   if you want previews to accept bookings, ideally pointing at a separate Firebase project).
   Paste `FIREBASE_ADMIN_PRIVATE_KEY` including the `\n` escapes.
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL (used for canonical URLs, sitemap and Open Graph).
4. Deploy. Verify `https://your-domain/api/health` returns `{"status":"ok"}` and submit a test booking.
5. Add your domain, then check `/sitemap.xml` and `/robots.txt`.

---

## Optional extension: admin booking management

Not included, to keep the public site simple. The foundations are ready:
`firestore.rules` allows users with the custom claim `admin: true` to read bookings and change only `status` /
`updatedAt`, and `firestore.indexes.json` has the indexes an admin list needs. Build it as a separate route group
(for example `src/app/(admin)/admin/`) with Firebase Authentication, setting the claim from a trusted script:
`getAuth().setCustomUserClaims(uid, { admin: true })`. Use `src/lib/firebase/client.ts` for client Auth.

## Remaining manual steps before launch

- [ ] Replace sample prices, copy, FAQs, contact details (`src/config/site.ts`) and **all placeholder images**.
- [ ] Replace sample testimonials with real, permitted reviews.
- [ ] Create the Firebase project and fill in the environment variables; deploy rules and indexes.
- [ ] Enable the two Firestore TTL policies.
- [ ] Add a privacy policy and terms page, and link them in the footer and near the consent checkbox.
- [ ] Decide how you will be notified of new bookings (email/WhatsApp). Not included; add it inside
      `BookingService.submit` or a Firestore-triggered Cloud Function.
- [ ] Production rate limiting (Upstash/Vercel KV) and Vercel Firewall rules.
- [ ] Add a strict Content-Security-Policy (needs a nonce setup with Next.js) once the site is final.
- [ ] Run `npx playwright install chromium && npm run test:e2e` against a build.
