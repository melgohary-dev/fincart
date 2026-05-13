# AI Usage Disclosure

This project was developed with assistance from AI tools. Below is a full account of what was generated with AI help.

## AI‑Assisted Parts

| Component            | AI Tool          | Details                                                                    |
| -------------------- | ---------------- | -------------------------------------------------------------------------- |
| Zod schemas          | Claude           | Generated `useQuoteForm.ts` with Zod validation schema and RHF integration |
| React Query setup    | Claude           | Generated `useCourierSearch.ts` hook with retry/caching config             |
| MUI Grid scaffolding | Claude           | Generated responsive layout in `App.tsx` and `CourierGrid.tsx`             |
| MUI theme            | Claude           | Generated `fincartTheme.ts` with Fincart brand colours                     |
| i18n setup           | Copilot / Claude | Generated `i18n/index.ts`, locale JSON files (EN/AR)                       |
| Zustand store        | Claude           | Generated `store/quoteStore.ts` with typed state/actions                   |
| Form components      | Claude           | Generated `OriginStep`, `DestinationStep`, `PackageStep`, `FormNavigation` |
| Courier components   | Claude           | Generated `CourierCard`, `CourierGrid`, `CourierBadges`                    |
| Error/loading states | Claude           | Generated `ErrorState`, `EmptyState`, `LoadingSkeleton`                    |
| Type definitions     | ChatGPT + Claude | Generated `types/index.ts` with Courier, QuoteFormData interfaces          |
| Tests                | Claude           | Generated `CourierCard.test.tsx` with 6 test cases                         |
| README / PROMPTS     | Claude           | Generated documentation files                                              |
| Vite & config files  | Copilot          | Generated `vite.config.ts`, `vitest.config.ts`, ESLint, Prettier configs   |

## Human‑Authored Parts

- Package.json dependency decisions
- Folder structure design
- Test assertions and edge cases
- Performance optimisation strategy decisions
- i18n locale content (English + Arabic translations)
- Final code review and type error fixes

## Commit History Transparency

All commits are structured as conventional commits. AI‑assisted commits are noted where applicable.
