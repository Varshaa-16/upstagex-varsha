# upstageX — Creator Discovery

A Creator Discovery page for the upstageX frontend intern task.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router) — server/client component split
- **TypeScript** (strict mode)
- **shadcn/ui** — Button, Input, Select, Slider, Card, Badge, Skeleton, Avatar, Sheet, Separator, Label
- **Tailwind CSS** — layout and utility styling
- **TanStack Query v5** — async data fetching with loading/error/stale states
- **react-hook-form + zod** — type-safe filter form
- **lucide-react** — icons

## Architecture Decisions

### Server vs Client components
- `app/page.tsx` is a **Server Component** — renders the static shell (header, h1, description)
- `DiscoveryPage`, `FilterForm`, `CreatorGrid`, `CreatorSheet` are **Client Components** since they use state, hooks, and interactivity

### Data layer
- `src/data/creators.ts` — 40 mock creators (local JSON-equivalent)
- `src/lib/api.ts` — `fetchCreators()` and `fetchCreatorById()` with a fake 900ms delay so loading skeletons actually show
- `src/hooks/use-creators.ts` — TanStack Query wrapper; filter object is the query key so changing filters triggers a fresh fetch

### Filter form
- `react-hook-form` + `zod` schema validates all fields
- `watch()` drives live filtering without a submit button — changes propagate immediately via `useEffect`
- "Clear filters" button appears only when the form is dirty

### States covered
- **Loading** — 12 `<CreatorCardSkeleton />` placeholders (shadcn `Skeleton`)
- **Empty** — friendly message with icon telling the user how to broaden their search
- **Error** — error message with a "Try again" button that calls `refetch()`

### Creator detail
- Clicking a card opens a `Sheet` (right-side drawer) with bio, stats grid, audience breakdown (bar charts, gender split), and recent content with view counts

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout (Server Component)
    page.tsx          # Home page (Server Component)
    globals.css       # CSS variables + Tailwind
  components/
    ui/               # shadcn/ui components
    creators/
      creator-card.tsx
      creator-card-skeleton.tsx
      creator-sheet.tsx
      creator-grid.tsx
      filter-form.tsx
      discovery-page.tsx
  data/
    creators.ts       # 40 mock creators
  hooks/
    use-creators.ts
  lib/
    api.ts            # Mock async API
    utils.ts          # cn(), formatFollowers(), formatCurrency()
  providers/
    query-provider.tsx
  types/
    index.ts
```
