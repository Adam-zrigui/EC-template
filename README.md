# EC-template

[Production demo](https://e-c-template.vercel.app/)

A lightweight Next.js + TypeScript e-commerce starter template built with Tailwind CSS, Prisma, Stripe payments, and NextAuth. It includes a small product/catalog UI, cart, checkout integration (Stripe), and a Prisma schema for persisting data.

Key features
- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Prisma (schema in `prisma/schema.prisma`)
- **Payments:** Stripe (server API at `pages/api/stripe.ts` and `lib/getStripe.ts`)
- **Auth:** NextAuth (configured under `pages/api/auth/[...nextauth].ts`)
- **Client:** React components in `src/components` and app state in `src/hooks/State.tsx`

Quick start
1. Install deps:

```bash
pnpm install
```

2. Create a `.env` file with the required variables. Typical variables used by this project:

- `DATABASE_URL` — your database connection string for Prisma
- `NEXTAUTH_URL` — e.g. `http://localhost:3000`
- `NEXTAUTH_SECRET` — secure random string for NextAuth
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key

3. Initialize Prisma (if you plan to use the DB locally):

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

4. Start the dev server:

```bash
pnpm dev
```

Notes
- Use Stripe test keys for development. To receive Stripe webhooks locally, use the Stripe CLI forward feature.
- The example payment flow is implemented but may require real keys and webhook wiring to fully test checkout confirmation.

Project structure (high level)
- `src/pages` — app routes, API endpoints for Stripe and auth
- `src/components` — UI pieces (Cart, Product, Nav, Layout, Footer)
- `src/hooks` — React state and helpers
- `prisma` — Prisma schema and DB models

If you'd like, I can also:
- add more README sections (deployment, environment examples)
- generate a sample `.env.example`
- run the project locally and fix any missing env names

File updated: `README.md` — expanded with explanation and run steps.

