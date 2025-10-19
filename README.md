# Mock Shop App (Next.js Partial Pre-rendering)

This project recreates the original mock shop experience using **Next.js 15** with **Partial Pre-rendering (PPR)**. Pages are statically generated while interactive client components (cart, authentication, etc.) stream in after the initial HTML shell, delivering fast first paint with dynamic interactivity.

## Tech Stack

- Next.js 15.5 (App Router, Partial Pre-rendering)
- React 19
- TypeScript
- Tailwind CSS & shadcn/ui component primitives
- TanStack Query (for future-ready data needs)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` – start the Next.js development server with PPR enabled.
- `npm run build` – create an optimized production build.
- `npm start` – run the production build locally.
- `npm run lint` – lint the project with the Next.js ESLint presets.

## Project Highlights

- **Partial Pre-rendering**: Every route exports `experimental_ppr = true`, so the static page shell is served instantly while client-only regions stream in.
- **Client State Management**: Authentication, cart, and toast logic run in client providers that hydrate after the static shell loads, mirroring the original behavior that relied on `localStorage`.
- **API Integration**: Product data comes from [Fake Store API](https://fakestoreapi.com) using Next.js data fetching with revalidation for static freshness.

## Notes

- Orders, cart contents, and user data are stored in `localStorage`, matching the original implementation.
- Because the project relies on experimental Next.js features, use the pinned package versions in `package.json` to avoid compatibility issues.
- React 19 compatibility for every third-party dependency is documented in [`docs/react-19-compatibility.md`](./docs/react-19-compatibility.md).
