# AI Usage Disclosure

Per the assignment requirements, this documents where AI assisted and — more importantly — where it did not.

## Philosophy

I treat AI as a **junior pair programmer** for grunt work: config files, boilerplate, and documentation scaffolding. All architecture decisions, business logic, component design, state management, trade-offs, and production-quality polish are mine.

## AI-Assisted Areas

### Claude (opencode.ai) — only these specific tasks

| Task                                            | AI's role                           | My role                                                              |
| ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| **Storybook config** (`main.ts`, `preview.tsx`) | Generated initial file structure    | Wired MUI theme providers, i18n, fonts, React Query; verified builds |
| **Component stories** (`.stories.tsx` files)    | `Meta`/`StoryObj` type boilerplate  | Authored all arg values, decorators, test scenarios                  |
| **Project docs** (`docs/` folder)               | Initial markdown from codebase scan | Edited, restructured, ensured accuracy                               |
| **PROMPTS.md**                                  | Skeleton structure                  | Content and this framing                                             |

## What I Own (No AI Involvement)

- **Architecture**: Folder structure, module separation, data flow design
- **Multi-step form**: React Hook Form wiring, Zod schema, step validation logic
- **State management**: Zustand store design, store-reader isolation, TanStack Query integration
- **Components**: All CourierCard, form steps, sidebar, error/loading/empty states
- **Mock API**: Delay simulation, failure rates, route filtering
- **Pricing engine**: `enrichCouriersWithMeta`, tax calculations, cheapest/fastest ranking
- **MUI theming**: Brand colours, dark/light mode, RTL direction, component overrides
- **i18n**: i18next setup, RTL Emotion cache swapping, all 170 translation keys
- **Testing**: All 6 unit tests (Vitest + React Testing Library)
- **Responsive layout**: MUI Grid breakpoints, mobile-first card stacking
- **Accessibility**: ARIA roles, keyboard navigation, semantic labels
- **Bundle optimisation**: Vendor chunking, lazy loading, tree-shaking

## Verification

Every AI suggestion was reviewed, modified where needed, and validated via `npm run build` (tsc + Vite), `npm run lint`, and `npm test` (6/6 passing).
