# Requirements

## Functional

1. Multi‑step form: Origin → Destination → Package
2. Zod validation: weight > 0, different origin/destination, valid ISO codes
3. Zustand store: centralized quote state
4. React Query: loading skeleton, error with retry, empty state
5. Courier cards with logo, dynamic pricing, delivery timeline
6. Cheapest / Fastest badges (Chip)
7. Real‑time sidebar summary
8. Responsive: mobile‑first, sticky sidebar on desktop

## Non‑Functional

1. i18n (EN/AR with RTL support)
2. Accessibility (WCAG AA, keyboard nav, aria)
3. Performance (code splitting, MUI tree‑shaking, lazy images, query caching)
4. Error handling (retry 2x, manual retry, user‑friendly messages)
5. Testing (CourierCard unit test)
6. ESLint + Prettier + Husky pre‑commit hooks

## Deliverables

- GitHub repo with clean commit history
- Vercel live demo
- README.md with setup, error strategy, optimizations
- PROMPTS.md with AI disclosure
