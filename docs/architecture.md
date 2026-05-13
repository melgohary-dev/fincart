# Architecture

## Data Flow

```
User fills form → Zustand store (origin, destination, weight, volume)
                → React Hook Form validates via Zod
                → onSubmit triggers React Query refetch()
                → useCourierSearch fetches from mock API
                → data flows to CourierGrid → CourierCard
                → pricingHelpers computes cheapest/fastest
```

## State Management

- **Zustand**: `quoteStore` holds form values. Subscribed by SummarySidebar and form steps.
- **React Query**: manages async courier data (isLoading, error, data, isFetching).
- **No prop drilling**: any component can `useQuoteStore()` directly.

## Component Tree

```
App
├── SummarySidebar (subscribes to Zustand)
└── Main Content
    ├── FormStepper
    │   ├── OriginStep
    │   ├── DestinationStep
    │   └── PackageStep
    ├── FormNavigation (Next / Back / Search)
    └── CourierGrid (lazy loaded)
        ├── LoadingSkeleton (isLoading)
        ├── ErrorState + Retry (error)
        ├── EmptyState (data.length === 0)
        └── CourierCard[] (data)
            └── CourierBadges (cheapest/fastest)
```

## Performance

- MUI path imports for tree‑shaking
- React.lazy for CourierGrid, SummarySidebar
- `<img loading="lazy">` for courier logos
- React Query cacheTime: 5 min, stale‑while‑revalidate
- Only Zod + RHF `Controller` for minimal re‑renders
