# Fincart – Courier Rate Comparison

**Live**: [fincart-z7io.vercel.app](https://fincart-z7io.vercel.app/)  
**AI Disclosure**: [`PROMPTS.md`](./PROMPTS.md)

Compare international courier shipping rates side-by-side. Built for emerging markets with slow 3G in mind.

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **MUI v9** (Material-UI) – themed with Fincart brand colours
- **React Hook Form** + **Zod v4** (form validation)
- **Zustand** (centralised state)
- **TanStack Query v5** (async data fetching)
- **i18next** + **react-i18next** (i18n – EN/AR with RTL)
- **Storybook 10** – component showcase with a11y + docs addons
- **Vitest** + **React Testing Library** (unit tests)
- **Husky** + **lint-staged** (pre-commit quality gates)

## Getting Started

```bash
git clone https://github.com/melgohary-dev/fincart.git
cd fincart
npm install
npm run dev
```

Open http://localhost:5173

### Scripts

| Command                   | Description                      |
| ------------------------- | -------------------------------- |
| `npm run dev`             | Start dev server                 |
| `npm run build`           | Type-check + production build    |
| `npm run preview`         | Preview production build         |
| `npm test`                | Run Vitest unit tests            |
| `npm run lint`            | ESLint check                     |
| `npm run format`          | Prettier format                  |
| `npm run storybook`       | Storybook dev server (port 6006) |
| `npm run build-storybook` | Build static Storybook           |

## Project Structure

```
src/
├── components/
│   ├── common/      LoadingSkeleton, EmptyState, ErrorState
│   ├── form/        OriginStep, DestinationStep, PackageStep, FormNavigation
│   ├── courier/     CourierCard, CourierGrid, CourierBadges
│   └── sidebar/     SummarySidebar
├── hooks/           useQuoteForm, useCourierSearch
├── store/           quoteStore (Zustand)
├── services/        courierApi (mock)
├── types/           shared type definitions and constants
├── utils/           countryCodes, pricingHelpers
├── theme/           fincartTheme (MUI)
├── i18n/            i18next initialisation
├── locales/         en/, ar/ translation files
├── tests/           unit tests
├── App.tsx
└── main.tsx
```

## Features

- Multi-step form (Origin → Destination → Package) with i18n-aware Zod validation
- Real-time sidebar summary via Zustand subscriptions
- Courier cards with logos, pricing, tax, total, and delivery timeline
- **Cheapest** / **Fastest** badges computed post-fetch
- MUI skeleton loader during fetch, error state with retry, empty state for no-courier routes
- Responsive mobile-first layout with sticky sidebar on desktop
- Full i18n support (English / Arabic) with RTL layout via Emotion cache swapping
- 6 passing unit tests

## Data Flow

```
User Input → react-hook-form → Zod validation → Zustand store
                                                    ↓
                                           TanStack Query (disabled)
                                                    ↓
                                           Mock API → enrichCouriersWithMeta → CourierGrid
```

## Production Error Handling Strategy

### Current Mock Behaviour

The mock courier API simulates **800ms latency** with a **20% random failure rate**. React Query retries 2× with 1s backoff before surfacing the error. Successful responses cached for 5 min (stale-while-revalidate), GC'd after 10.

### Graceful Per-Carrier Degradation (Production Plan)

In production, each courier API is an independent service. If DHL is down, FedEx and UPS should still render:

1. **`Promise.allSettled` per carrier** — Failed carriers show a card-level "temporarily unavailable — Retry" chip instead of blocking all results.
2. **Per-carrier React Query** — Independent retry + backoff per query key.
3. **Circuit breaker** — Stop calling a carrier after N consecutive failures; cooldown period prevents wasted bandwidth on 3G.
4. **Stale-while-revalidate** — Show cached rates immediately while silently refreshing.

### Bundle Optimisation for 3G in Emerging Markets

Every kilobyte matters when users pay per MB. Current + planned optimisations:

| Technique               | Implementation                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| **Code splitting**      | `React.lazy` for CourierGrid + SummarySidebar — avoids loading results UI until the user reaches step 3 |
| **MUI tree-shaking**    | Path-level imports (`import Card from '@mui/material/Card'` not `@mui/material`)                        |
| **Image lazy loading**  | `<img loading="lazy">` on courier logos + WebP/AVIF conversion via CDN                                  |
| **React Query caching** | `staleTime: 5min`, `gcTime: 10min` — zero network requests for repeat searches                          |
| **Vendor chunking**     | Separate chunks for `react`, `mui`, `vendor` (zustand + tanstack + rhf + zod), `i18n` — cache-friendly  |
| **Minification**        | esbuild minifier (built into Vite)                                                                      |
| **Font subsetting**     | Self-hosted Inter + Cairo with `unicode-range` — only loads needed glyphs                               |
| **Preconnect**          | `<link rel="preconnect">` to CDN origins for font and image delivery                                    |
| **Bundle analysis**     | Run `vite-bundle-visualizer` in CI to catch regressions                                                 |
| **Service worker**      | Cache courier logos and translation files on first load via a Workbox service worker (next priority)    |
