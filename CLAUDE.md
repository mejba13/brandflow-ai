# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrandFlow AI is an AI-powered social media automation platform that transforms single content inputs into platform-optimized posts for LinkedIn, Facebook, Twitter/X, Instagram, Pinterest, and TikTok. Built with Next.js 15 (App Router), tRPC v11, Drizzle ORM, and Clerk authentication.

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (localhost:3000)
pnpm dev:turbo            # Start with Turbopack (faster)
pnpm build                # Production build
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix ESLint issues
pnpm type-check           # TypeScript checking
pnpm format               # Format code with Prettier
pnpm format:check         # Check formatting

# Database (Drizzle)
pnpm db:generate          # Generate migrations from schema
pnpm db:migrate           # Run migrations
pnpm db:push              # Push schema directly (dev only)
pnpm db:studio            # Open Drizzle Studio
```

## Architecture

### Route Groups (src/app/)
- `(auth)/` - Login/signup pages using Clerk components
- `(dashboard)/` - Protected dashboard routes with sidebar layout
  - `dashboard/` - Main dashboard pages (analytics, calendar, content, create, settings, accounts, brand-kit)
- `api/trpc/` - tRPC endpoint
- `api/webhooks/` - Clerk & Stripe webhooks
- `api/auth/` - Social platform OAuth callbacks

### tRPC Structure
All API logic lives in `src/lib/trpc/`:
- `trpc.ts` - Base tRPC setup with three procedure types:
  - `publicProcedure` - No auth required
  - `protectedProcedure` - Requires authenticated user
  - `orgProcedure` - Requires user + organization context
- `root.ts` - Main router combining all sub-routers
- `routers/` - Domain routers (content, ai, analytics, socialAccount, subscription, user, organization)
- `context.ts` - Creates tRPC context with `db`, `userId`, and `organizationId` from Clerk

### Database
- **ORM**: Drizzle with PostgreSQL (Neon recommended)
- **Config**: `drizzle.config.ts` points to `src/lib/db/schema/index.ts`
- **Migrations**: Output to `./drizzle` directory
- **Client**: `src/lib/db/index.ts` - Lazy-initialized singleton with proxy pattern

Schema files in `src/lib/db/schema/`:
- All tables use UUID primary keys
- Soft deletes via `deletedAt` timestamp
- JSONB for flexible metadata fields
- Export types: `TableName` (select) and `NewTableName` (insert)

Content flow: `sourceContent` → `contentVariations` (per platform) → `scheduledPosts`

### Auth Flow
Middleware (`src/middleware.ts`) supports two modes:
- **Clerk mode**: If `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set, uses Clerk middleware for protected routes
- **Dev mode**: Falls back to cookie-based auth (`brandflow_session` cookie) when Clerk is not configured

Public routes: `/`, `/login`, `/signup`, `/pricing`, `/features`, `/about`, `/api/webhooks`

### AI Integration
Located in `src/lib/ai/`:
- `openai.ts` - Lazy-initialized OpenAI client with proxy pattern
- `content-generator.ts` - Platform content transformation
- `image-generator.ts` - DALL-E image generation
- Models: GPT-4 Turbo for content, DALL-E 3/2 for images

### UI Components
Located in `src/components/ui/`. Components use:
- class-variance-authority (CVA) for variants
- CSS variables from `globals.css` for theming
- `cn()` utility from `src/lib/utils` for class merging (clsx + tailwind-merge)

### State Management
- **Server state**: TanStack Query (via @trpc/react-query)
- **Client state**: Zustand for local UI state

### Design System
CSS variables defined in `src/app/globals.css`:
- Primary: `#0468D7`, Accent: `#1A68D3`
- Platform colors: `--color-linkedin`, `--color-facebook`, etc.
- Layout: `--sidebar-width: 280px`, `--header-height: 64px`

## Platform Content Rules

| Platform  | Char Limit | Feed Image  | Story/Reel |
|-----------|------------|-------------|------------|
| LinkedIn  | 3,000      | 1200x627    | 1080x1920  |
| Twitter/X | 280        | 1600x900    | 1080x1920  |
| Instagram | 2,200      | 1080x1080   | 1080x1920  |
| Facebook  | 63,206     | 1200x630    | 1080x1920  |
| Pinterest | 500        | 1000x1500   | 1080x1920  |
| TikTok    | 2,200      | 1080x1080   | 1080x1920  |

## Environment Variables

Copy `.env.example` to `.env.local`. Key groups:
- **Database**: `DATABASE_URL` (PostgreSQL/Neon)
- **Auth**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **AI**: `OPENAI_API_KEY`
- **Payments**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Social OAuth**: `LINKEDIN_*`, `META_*`, `TWITTER_*`, `PINTEREST_*`, `TIKTOK_*`

## Seed Data

`src/lib/seed-data.ts` contains mock data for all dashboard pages. Used when database isn't connected or for demos.
