# BrandFlow AI - Implementation Checklist

> Module-by-module implementation with acceptance criteria

---

## Phase 1: Foundation (Sprint 1-2)

### M1.1 Project Setup
- [ ] Initialize Next.js 15 with App Router
- [ ] Configure TypeScript 5.x strict mode
- [ ] Set up Tailwind CSS 4 with design tokens
- [ ] Configure ESLint + Prettier
- [ ] Set up pnpm workspace
- [ ] Create .env.example with all required vars
- [ ] Configure Git hooks (husky + lint-staged)

**Acceptance Criteria:**
- `pnpm dev` starts development server
- `pnpm lint` passes with no errors
- `pnpm type-check` passes with no errors
- Design tokens (colors, spacing, typography) available globally

### M1.2 Design System Foundation
- [ ] Implement design tokens in Tailwind config
  - Primary: #0468D7
  - Accent: #1A68D3
  - Background: #FFFFFF
  - Text Primary: #4A4A4A
  - Border Radius: 24px
  - Base spacing: 8px
- [ ] Configure Google Sans + Roboto fonts
- [ ] Create base component library:
  - [ ] Button (primary, secondary, ghost, destructive)
  - [ ] Input (text, textarea, with validation states)
  - [ ] Select (single, multi)
  - [ ] Card (standard, interactive)
  - [ ] Badge (status variants)
  - [ ] Modal/Dialog
  - [ ] Toast notifications
  - [ ] Loading states (spinner, skeleton)
  - [ ] Empty states
  - [ ] Error states

**Acceptance Criteria:**
- All components follow brand design system
- Components are accessible (keyboard nav, ARIA)
- Components are responsive
- Storybook or component preview available

### M1.3 App Shell & Layout
- [ ] Create root layout with font loading
- [ ] Create auth layout (login, signup pages)
- [ ] Create dashboard layout:
  - [ ] Sidebar navigation (collapsible)
  - [ ] Top header with user menu
  - [ ] Main content area
  - [ ] Mobile-responsive hamburger menu
- [ ] Create page templates:
  - [ ] List page (with filters, search, pagination)
  - [ ] Detail page
  - [ ] Create/Edit form page

**Acceptance Criteria:**
- Layout is responsive (mobile, tablet, desktop)
- Navigation works correctly
- Active nav items highlighted
- User can toggle sidebar on desktop

### M1.4 Authentication (Clerk)
- [ ] Install and configure Clerk
- [ ] Create sign-up page with social options
- [ ] Create sign-in page
- [ ] Implement auth middleware for protected routes
- [ ] Create user sync webhook (Clerk → Database)
- [ ] Create organization creation on first login

**Acceptance Criteria:**
- User can sign up with email/password
- User can sign up with Google
- User can sign in
- Protected routes redirect to login if unauthenticated
- User record created in database after signup

### M1.5 Database Setup
- [ ] Configure Neon PostgreSQL connection
- [ ] Set up Drizzle ORM
- [ ] Create initial schema:
  - [ ] users table
  - [ ] organizations table
  - [ ] organization_members table
- [ ] Create migration scripts
- [ ] Set up seed script for development

**Acceptance Criteria:**
- `pnpm db:push` creates tables
- `pnpm db:studio` opens Drizzle Studio
- User data persists correctly
- Foreign key relationships work

### M1.6 API Foundation (tRPC)
- [ ] Set up tRPC with Next.js App Router
- [ ] Create base router structure
- [ ] Implement protected procedure middleware
- [ ] Create user router (get profile, update)
- [ ] Create organization router (get, update)
- [ ] Set up API response format

**Acceptance Criteria:**
- tRPC endpoints accessible at /api/trpc
- Protected endpoints require authentication
- Type-safe client available
- Error responses follow standard format

---

## Phase 2: Core Features (Sprint 3-6)

### M2.1 Social Accounts Module
- [ ] Create social_accounts schema
- [ ] Implement OAuth flow for LinkedIn
- [ ] Implement OAuth flow for Facebook
- [ ] Create socialAccount tRPC router:
  - [ ] list - get all connected accounts
  - [ ] connect - initiate OAuth
  - [ ] disconnect - remove account
  - [ ] refresh - refresh tokens
- [ ] Create Social Accounts UI:
  - [ ] Accounts list page
  - [ ] Connect account modal
  - [ ] Account card component
  - [ ] Connection status indicator

**Acceptance Criteria:**
- User can connect LinkedIn account
- User can connect Facebook page
- Connected accounts display with status
- User can disconnect accounts
- Tokens stored securely (encrypted)

### M2.2 Brand Kit Module
- [ ] Create brand_kits schema
- [ ] Create brandKit tRPC router:
  - [ ] create
  - [ ] getById
  - [ ] update
  - [ ] delete
  - [ ] setDefault
- [ ] Create Brand Kit UI:
  - [ ] Brand kit form (logo, colors, fonts)
  - [ ] Voice/tone settings
  - [ ] Hashtag sets manager
  - [ ] Content pillars editor

**Acceptance Criteria:**
- User can create brand kit with logo
- User can set brand colors (color picker)
- User can define voice guidelines (text)
- User can create hashtag sets
- Default brand kit applies to content

### M2.3 Content Creation Module
- [ ] Create contents schema
- [ ] Create content_variations schema
- [ ] Create content tRPC router:
  - [ ] create - create with AI generation
  - [ ] getById - with variations
  - [ ] list - paginated
  - [ ] updateVariation
  - [ ] regenerateVariation
  - [ ] delete
- [ ] Create Content Creation UI:
  - [ ] Content input (text, URL, upload)
  - [ ] Platform selector
  - [ ] AI generation loading state
  - [ ] Variation preview cards
  - [ ] Variation editor
  - [ ] Regenerate with instructions

**Acceptance Criteria:**
- User can input source content (text)
- User can select target platforms
- AI generates variations for each platform
- User can edit any variation
- User can regenerate with custom instructions
- Character counts shown per platform

### M2.4 AI Integration
- [ ] Set up OpenAI client
- [ ] Set up Anthropic client (fallback)
- [ ] Create AI Gateway with fallback logic
- [ ] Implement content transformation pipeline:
  - [ ] Content analysis
  - [ ] Platform-specific generation
  - [ ] Hashtag extraction
- [ ] Create ai tRPC router:
  - [ ] transformContent
  - [ ] getSuggestions
  - [ ] analyzeContent
- [ ] Implement AI generation logging

**Acceptance Criteria:**
- AI generates platform-appropriate content
- Fallback works if primary provider fails
- Generation logged for usage tracking
- Rate limiting prevents abuse

### M2.5 Media/Image Module
- [ ] Create media_assets schema
- [ ] Set up Cloudflare R2 storage
- [ ] Implement image upload service
- [ ] Integrate DALL-E 3 for generation
- [ ] Create media tRPC router:
  - [ ] upload
  - [ ] generateImage
  - [ ] getByContent
  - [ ] delete
- [ ] Implement image resizing per platform
- [ ] Create Media UI:
  - [ ] Image upload component
  - [ ] AI image generator
  - [ ] Image preview grid
  - [ ] Platform size variants

**Acceptance Criteria:**
- User can upload images
- AI can generate images from content
- Images resized for each platform
- Images stored in R2 and retrievable

---

## Phase 3: Scheduling & Publishing (Sprint 7-8)

### M3.1 Scheduling Module
- [ ] Create scheduled_posts schema
- [ ] Create publishing_queue schema
- [ ] Create schedule tRPC router:
  - [ ] create
  - [ ] bulkCreate
  - [ ] getCalendar
  - [ ] reschedule
  - [ ] cancel
  - [ ] publishNow
- [ ] Implement optimal time suggestions
- [ ] Create Scheduling UI:
  - [ ] Schedule modal
  - [ ] Date/time picker with timezone
  - [ ] Optimal times display
  - [ ] Bulk schedule interface

**Acceptance Criteria:**
- User can schedule post for future date/time
- User can select timezone
- System suggests optimal times
- User can bulk schedule to multiple platforms
- User can cancel scheduled post

### M3.2 Publishing Engine
- [ ] Create LinkedIn publishing service
- [ ] Create Facebook publishing service
- [ ] Implement BullMQ job queue
- [ ] Create publishing worker
- [ ] Implement retry logic with exponential backoff
- [ ] Create webhook handlers for status updates
- [ ] Error handling and notification

**Acceptance Criteria:**
- Scheduled posts publish at correct time
- Failed posts retry automatically (max 3)
- User notified of publish success/failure
- Published posts linked to platform

### M3.3 Content Calendar
- [ ] Create calendar tRPC queries
- [ ] Create Calendar UI:
  - [ ] Month view
  - [ ] Week view
  - [ ] Day view
  - [ ] Platform filter
  - [ ] Drag-and-drop reschedule
  - [ ] Post quick-view on hover
  - [ ] Gap indicator

**Acceptance Criteria:**
- Calendar displays all scheduled posts
- Posts color-coded by platform
- User can filter by platform
- User can drag to reschedule
- User can click to view/edit post

### M3.4 Analytics Module
- [ ] Create post_analytics schema
- [ ] Implement analytics fetch from platforms
- [ ] Create analytics tRPC router:
  - [ ] getDashboard
  - [ ] getPostAnalytics
  - [ ] getTopPosts
- [ ] Create Analytics UI:
  - [ ] Overview dashboard with KPIs
  - [ ] Engagement charts
  - [ ] Top posts list
  - [ ] Platform comparison

**Acceptance Criteria:**
- Dashboard shows key metrics
- User can filter by date range
- User can filter by platform
- Charts render correctly
- Top performing posts identified

---

## Phase 4: Polish & Revenue Readiness (Sprint 9+)

### M4.1 Onboarding Flow
- [ ] Create step-by-step onboarding wizard:
  1. Welcome + value prop
  2. Connect first platform
  3. Create brand kit (optional)
  4. Create first post
  5. Preview and schedule
  6. Celebration/next steps
- [ ] Track onboarding completion
- [ ] Skip option with later prompts

**Acceptance Criteria:**
- New user sees onboarding on first login
- User can complete first post in <5 minutes
- Onboarding completion tracked
- User can skip and return later

### M4.2 Billing Integration (Stripe)
- [ ] Create usage_tracking schema
- [ ] Implement Stripe products/prices
- [ ] Create billing tRPC router:
  - [ ] getSubscription
  - [ ] createCheckout
  - [ ] createPortal
  - [ ] getUsage
- [ ] Create Stripe webhook handler
- [ ] Implement usage limits per tier
- [ ] Create Billing UI:
  - [ ] Current plan display
  - [ ] Usage meters
  - [ ] Upgrade prompts
  - [ ] Billing portal link

**Acceptance Criteria:**
- User can view current subscription
- User can upgrade plan
- Usage tracked against limits
- Overage handled gracefully
- Billing portal accessible

### M4.3 Lead Tracking
- [ ] Create lead_tracking schema
- [ ] Implement smart link creation
- [ ] Implement UTM parameter handling
- [ ] Create lead tRPC router:
  - [ ] createLink
  - [ ] getLeads
  - [ ] getConversions
- [ ] Create Leads UI:
  - [ ] Link creator
  - [ ] Leads dashboard
  - [ ] Conversion tracking

**Acceptance Criteria:**
- User can create trackable links
- Clicks tracked with source data
- Leads attributed to posts
- Conversion tracking works

### M4.4 Settings & Account Management
- [ ] Organization settings page
- [ ] User profile settings
- [ ] Team member management (Pro+)
- [ ] Notification preferences
- [ ] Data export functionality
- [ ] Account deletion flow

**Acceptance Criteria:**
- User can update organization settings
- User can update profile
- Pro users can invite team members
- User can manage notifications
- User can export data
- User can delete account

---

## Quality Gates (Every Module)

### Before Merge:
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Unit tests pass (>80% coverage for new code)
- [ ] E2E tests pass for critical paths
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] Accessibility check (keyboard nav, screen reader)
- [ ] Error states implemented
- [ ] Loading states implemented
- [ ] No console errors in production build

### UI Consistency:
- [ ] Colors match design system
- [ ] Typography matches design system
- [ ] Spacing uses 8px base unit
- [ ] Border radius is 24px for cards
- [ ] Inputs have transparent background
- [ ] Buttons follow hierarchy
- [ ] Animations are performance-safe

### Performance:
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Code-split where appropriate
- [ ] API calls batched when possible
- [ ] No blocking operations on main thread
