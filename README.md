# Fincart – Courier Rate Comparison

Compare international courier shipping rates side-by-side. Built for emerging markets with slow 3G in mind.

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **MUI v9** (Material-UI) – themed with Fincart brand colours
- **React Hook Form** + **Zod v4** (form validation)
- **Zustand** (centralised state)
- **TanStack Query v5** (async data fetching)
- **i18next** + **react-i18next** (i18n – EN/AR with RTL)
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

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start dev server              |
| `npm run build`   | Type-check + production build |
| `npm run preview` | Preview production build      |
| `npm test`        | Run Vitest unit tests         |
| `npm run lint`    | ESLint check                  |
| `npm run format`  | Prettier format               |

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

## API Error Handling

The mock courier API simulates:

- **800ms network delay**
- **20% random failure rate**

On failure, React Query retries 2× with 1s backoff before showing an error card with a manual retry button. Successful responses are cached for 5 minutes (stale-while-revalidate) and garbage-collected after 10.

## Bundle Optimisation

| Technique           | Implementation                                               |
| ------------------- | ------------------------------------------------------------ |
| Code splitting      | `React.lazy` for CourierGrid – separate chunk                |
| MUI tree-shaking    | Path-level imports (`import Card from '@mui/material/Card'`) |
| Image lazy loading  | `<img loading="lazy">` on courier logos                      |
| React Query caching | `staleTime: 5min`, `gcTime: 10min` – reduces network calls   |
| Vendor chunking     | Separate chunks for react, mui, vendor, i18n                 |
| Minification        | esbuild minifier                                             |
