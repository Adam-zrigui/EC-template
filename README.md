# EC-template

[Production demo](https://e-c-template.vercel.app/)

Professional starter for a small e-commerce app built with Next.js + TypeScript. Opinionated minimal stack to get a production-ready flow quickly: SSR/SSG pages, API routes for payments and auth, a Prisma-backed data model, Tailwind for styling, and Stripe for payments.

Why this template
- Minimal, production-minded defaults so you can iterate on product features instead of infra.
- Integrated payment + auth examples so checkout flows are demonstrable end-to-end.
- Type-safe backend and client surface via Prisma and TypeScript.

Tech stack (short)
- Next.js (file-based routing, API routes)
- TypeScript
- React (components under `src/components`)
- Tailwind CSS + PostCSS
- Prisma ORM (`prisma/schema.prisma`)
- Stripe (checkout + server webhook endpoint)
- NextAuth (session/auth management)
- pnpm for package management

Sanity checklist (run these after cloning)
1. Node & package manager

```bash
node -v    # node >= 18 recommended
pnpm -v    # verify pnpm is installed
```

2. Install dependencies

```bash
pnpm install
```

3. Environment variables (create `.env`) — minimal example below

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb?schema=public"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some-long-random-string

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

4. Prisma sanity

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm prisma db seed   # if a seed script exists
```

5. Quick local run

```bash
pnpm dev
# open http://localhost:3000
```

Important checks (if things fail)
- If pages fail to render: check `NEXTAUTH_URL` and `NEXTAUTH_SECRET`.
- If Prisma errors: ensure `DATABASE_URL` is reachable and migrations applied.
- If Stripe checkout fails: confirm `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are correct and use Stripe test cards.
- Webhook testing: use `stripe listen --forward-to localhost:3000/api/stripe` to forward events.

Project layout (concise)
- `src/pages` — pages + API endpoints (`/api/stripe`, `/api/auth`)
- `src/components` — UI building blocks (`Cart`, `Product`, `Nav`, `Layout`)
- `src/hooks/State.tsx` — shopping cart / app state
- `lib/getStripe.ts` — client-side Stripe loader
- `prisma/schema.prisma` — canonical data model
- `Dockerfile`, `docker-compose.yml` — containerized deployment

Development & CI
- Linting: add/verify ESLint config and `pnpm lint` script.
- Type checks: `pnpm tsc --noEmit` as a CI gate.
- Tests: integrate a minimal test runner (Jest or Vitest) if you need regressions.

Deployment notes
- Vercel: recommended for zero-config Next.js deployments. Ensure environment variables are set in the Vercel project.
- Docker: `docker-compose` is included for local reproducible stacks; update the compose file with your DB credentials for CI or staging.

Security & secrets
- Never commit `.env` or secret keys. Use `gitignore`.
- Rotate Stripe keys immediately if exposed.
- Use `NEXTAUTH_SECRET` of sufficient entropy (32+ chars); store in secret manager for production.

Optional next steps I can do for you
- add a `.env.example` file with the above vars
- add a simple `pnpm test` and CI config
- wire a seed script for demo products

Contributing
- Fork, branch, open a PR with focused changes. Keep commits small and include a short description.

License
- MIT (change as needed)

File updated: `README.md` — replaced with a professional README including sanity checks and examples.

