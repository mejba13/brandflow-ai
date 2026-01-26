# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrandFlow AI is an AI-powered social media automation platform that transforms single content inputs into platform-optimized posts for LinkedIn, Facebook, Twitter/X, Instagram, Pinterest, and TikTok. Built with Next.js 15 (App Router), tRPC, Drizzle ORM, and Clerk authentication.

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

### Route Groups
- `(auth)/` - Login/signup pages using Clerk components
- `(dashboard)/` - Protected dashboard routes with sidebar layout

### tRPC Structure
All API logic lives in `src/lib/trpc/`:
- `trpc.ts` - Base tRPC setup with three procedure types:
  - `publicProcedure` - No auth required
  - `protectedProcedure` - Requires authenticated user
  - `orgProcedure` - Requires user + organization context
- `root.ts` - Main router combining all sub-routers
- `routers/` - Domain routers (content, ai, analytics, socialAccount, subscription, user, organization)

### Database Schema
Schema files in `src/lib/db/schema/`:
- All tables use UUID primary keys
- Soft deletes via `deletedAt` timestamp
- JSONB for flexible metadata fields
- Export types: `TableName` (select) and `NewTableName` (insert)

Content flow: `sourceContent` → `contentVariations` (per platform) → `scheduledPosts`

### Auth Flow
Middleware (`src/middleware.ts`) conditionally applies Clerk protection:
- If `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set, enforces auth on non-public routes
- Without Clerk config, all routes are accessible (development mode)

### UI Components
Components use class-variance-authority (CVA) for variants. Located in `src/components/ui/`.

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

Copy `.env.example` to `.env.local`. Key variables:
- `DATABASE_URL` - PostgreSQL connection (Neon recommended)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` - Auth
- `OPENAI_API_KEY` - AI content generation
- `STRIPE_*` - Payments

## Seed Data

`src/lib/seed-data.ts` contains mock data for all dashboard pages. Used when database isn't connected or for demos.
