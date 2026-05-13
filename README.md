# Fincart – Courier Rate Comparison Tool

Compare international courier shipping rates side-by-side. Built for emerging markets with slow 3G in mind.

## Live Demo

[View on Vercel](https://fincart.vercel.app)

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **MUI v9** (Material-UI) – themed with Fincart brand colours
- **React Hook Form** + **Zod v4** (form validation)
- **Zustand** (centralized state)
- **TanStack Query v5** (async data fetching)
- **i18next** + **react-i18next** (i18n – EN/AR with RTL)
- **Vitest** + **React Testing Library** (unit tests)
- **Husky** + **lint-staged** (pre-commit quality gates)

## Getting Started

```bash
git clone <repo-url>
cd fincart
npm install
npm run dev
```

Open http://localhost:5173

### Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start dev server              |
| `npm run build`   | Type-check + production build |
| `npm run preview` | Preview production build      |
| `npm test`        | Run Vitest unit tests         |
| `npm run lint`    | ESLint check                  |
| `npm run format`  | Prettier format               |

## API Error Handling Strategy

The mock courier API (`src/services/courierApi.ts`) simulates:

- **800ms network delay**
- **20% random failure rate** (throws `CourierServiceError`)

### Production Strategy (documented)

1. **Automatic retries** – React Query retries 2× with 1s exponential backoff
2. **Manual retry** – Error UI shows a "Retry" button calling `refetch()`
3. **Stale‑while‑revalidate** – Cache lives 5 min. Users see stale data while revalidating
4. **Fallback cache** – On total failure, serve last successful response (React Query `gcTime: 10min`)
5. **User notification** – Error state with clear message; no silent failures
6. **External logging** – In production, errors would go to Sentry/Datadog with courier ID context

For a real DHL service outage: The app would show cached rates (if any) with a banner "Rates may be outdated", log the outage, and auto-retry on next search.

## Bundle Optimization (Slow 3G)

| Technique               | Implementation                                                       |
| ----------------------- | -------------------------------------------------------------------- |
| **Code splitting**      | `React.lazy` for `CourierGrid` – 5.3 KB separate chunk               |
| **MUI tree‑shaking**    | Path-level imports (`import Card from '@mui/material/Card'`)         |
| **Image lazy loading**  | `<img loading="lazy">` on courier logos                              |
| **React Query caching** | `staleTime: 5min`, `gcTime: 10min` – reduces network calls           |
| **Vendor chunking**     | Separate chunks: `react`, `mui`, `vendor` (Zustand/TanStack), `i18n` |
| **Minification**        | esbuild minifier – fast + small output                               |
| **CSS code splitting**  | `cssCodeSplit: true` – per-component CSS                             |

### Testing Slow 3G

1. Open Chrome DevTools → Network tab
2. Throttling: **Slow 3G** preset
3. Observe: skeleton loaders appear immediately, courier cards render after data fetch

## Project Structure

```
src/
├── components/
│   ├── common/      (LoadingSkeleton, EmptyState, ErrorState)
│   ├── form/        (OriginStep, DestinationStep, PackageStep, FormNavigation)
│   ├── courier/     (CourierCard, CourierGrid, CourierBadges)
│   └── sidebar/     (SummarySidebar)
├── hooks/           (useQuoteForm, useCourierSearch)
├── store/           (quoteStore.ts – Zustand)
├── services/        (courierApi.ts – mock)
├── types/           (index.ts)
├── utils/           (countryCodes, pricingHelpers)
├── theme/           (fincartTheme.ts)
├── i18n/            (i18next setup)
├── locales/         (en/, ar/ – translation.json)
├── tests/           (CourierCard.test.tsx)
├── docs/            (planning files)
├── App.tsx
└── main.tsx
```

## Features

- Multi‑step form (Origin → Destination → Package) with Zod validation
- Real‑time sidebar summary (Zustand subscriptions)
- Courier cards with logos, pricing, tax, total, and delivery timeline
- **Cheapest** / **Fastest** badges computed post‑fetch
- MUI Skeleton loader during fetch
- Error state with manual retry button
- Empty state for no-courier routes
- Responsive layout (mobile‑first, sticky sidebar on desktop)
- i18n (English / Arabic with RTL support)
- 6 passing unit tests (Vitest + RTL)

## Accessibility

- `aria-live="polite"` on loading skeletons
- `role="alert"` on error messages
- Keyboard-navigable form (Tab, Enter)
- Semantic labels via MUI `TextField` `label`
- WCAG AA colour contrast (MUI default)
- Icons on chips (colour is not the only differentiator)

## AI Disclosure

See [PROMPTS.md](./PROMPTS.md) for full disclosure of AI usage in this project.
