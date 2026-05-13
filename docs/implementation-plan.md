# Fincart Courier Rate Comparison Tool – Implementation Plan

## Overview

Build a high‑performance, accessible, and architecturally clean React + TypeScript application for comparing courier shipping rates across international routes. Optimized for emerging markets (slow 3G).

## Tech Stack

- **Build tool**: Vite (fast HMR, small bundles)
- **UI**: MUI v5 (Material‑UI) – sx props, custom theme
- **Forms**: React Hook Form + Zod
- **State**: Zustand (centralized store)
- **Data**: TanStack Query (React Query) – caching, retries, async states
- **Testing**: Vitest + React Testing Library

## Architecture

- Multi‑step form (Origin → Destination → Package) synced to Zustand store
- Real‑time sidebar summary subscribing directly to store
- React Query fetches courier rates with loading/error/data states
- Cheapest / Fastest badges computed post‑fetch
- Responsive layout: mobile‑first, sticky sidebar on desktop

## Folder Structure

```
src/
├── components/
│   ├── common/   (LoadingSkeleton, EmptyState, ErrorState)
│   ├── form/     (OriginStep, DestinationStep, PackageStep, FormNavigation)
│   ├── courier/  (CourierCard, CourierGrid, CourierBadges)
│   └── sidebar/  (SummarySidebar)
├── hooks/        (useQuoteForm, useCourierSearch)
├── store/        (quoteStore.ts)
├── services/     (courierApi.ts – mock)
├── types/        (index.ts)
├── utils/        (countryCodes.ts, pricingHelpers.ts)
├── theme/        (fincartTheme.ts)
├── i18n/         (index.ts)
├── locales/      (en/, ar/ – translation.json)
├── tests/        (CourierCard.test.tsx)
├── App.tsx
└── main.tsx
```

## Key Decisions

- **Zustand** over Context to avoid re‑render cascades
- **React Query** `enabled: false` + manual `refetch()` on form submit
- **MUI path imports** for tree‑shaking (`import Card from '@mui/material/Card'`)
- **React.lazy** for CourierGrid and SummarySidebar
- **i18next** with lazy‑loaded JSON locale files
- **Husky + lint-staged** for pre‑commit quality gates

## Accessibility

- `aria-live="polite"` on loading skeletons
- `role="alert"` on error messages
- Keyboard navigable form (Tab, Enter)
- WCAG AA colour contrast (MUI default)
