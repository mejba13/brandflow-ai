<div align="center">

# BrandFlow AI

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/tRPC-11-2596BE?style=for-the-badge&logo=trpc&logoColor=white" alt="tRPC" />
<img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />

**AI-Powered Social Media Automation Platform**

<img width="1898" height="1433" alt="landing-page" src="https://github.com/user-attachments/assets/6949dc33-c634-446b-88e0-1e5be1279d8d" />
<img width="2073" height="1440" alt="dashboard-index" src="https://github.com/user-attachments/assets/ae5a6840-783b-4f4e-acdb-45468236f90b" />



Transform a single piece of content into platform-optimized posts for LinkedIn, Facebook, Twitter/X, Instagram, Pinterest, and TikTok — all with AI-generated images and smart scheduling.

[Live Demo](#) · [Documentation](#) · [Report Bug](https://github.com/mejba13/brandflow-ai/issues)

</div>

---

## Features

### Content Transformation
- **One Input, Six Outputs** — Write once, publish everywhere with AI-optimized variations
- **Platform-Aware Formatting** — Automatic character limits, hashtag optimization, and tone adjustment
- **AI Image Generation** — Create stunning visuals tailored for each platform's dimensions

### Smart Scheduling
- **Visual Calendar** — Drag-and-drop scheduling across all platforms
- **Optimal Timing** — AI-suggested posting times based on audience engagement
- **Queue Management** — Bulk schedule and manage content pipeline

### Analytics & Insights
- **Unified Dashboard** — Track performance across all platforms in one place
- **Engagement Metrics** — Likes, comments, shares, and reach analytics
- **Content Performance** — Identify top-performing posts and content patterns

### Team Collaboration
- **Multi-User Workspaces** — Invite team members with role-based permissions
- **Brand Kit** — Centralized brand colors, fonts, and voice guidelines
- **Approval Workflows** — Review and approve content before publishing

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4, CVA (class-variance-authority) |
| **API** | tRPC v11 (type-safe) |
| **Database** | PostgreSQL (Neon), Drizzle ORM |
| **Authentication** | Clerk |
| **Payments** | Stripe |
| **AI** | OpenAI GPT-4o, DALL-E 3 |
| **State** | Zustand, TanStack Query |
| **Forms** | React Hook Form + Zod |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9.x
- PostgreSQL database (or [Neon](https://neon.tech) account)
- [Clerk](https://clerk.com) account
- [OpenAI](https://platform.openai.com) API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mejba13/brandflow-ai.git
   cd brandflow-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials in `.env.local`:
   ```env
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   OPENAI_API_KEY=sk-...
   ```

4. **Set up the database**
   ```bash
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login/signup routes
│   ├── (dashboard)/         # Protected dashboard routes
│   │   └── dashboard/
│   │       ├── analytics/   # Performance metrics
│   │       ├── calendar/    # Scheduling calendar
│   │       ├── content/     # Content library
│   │       ├── create/      # Content creation wizard
│   │       └── settings/    # User preferences
│   └── api/
│       ├── trpc/            # tRPC endpoint
│       └── webhooks/        # Clerk & Stripe webhooks
├── components/
│   ├── content/             # Content-specific components
│   ├── landing/             # Marketing page sections
│   ├── layout/              # Dashboard layout components
│   └── ui/                  # Reusable UI primitives
└── lib/
    ├── ai/                  # OpenAI integration
    ├── db/                  # Drizzle schema & client
    ├── stripe/              # Billing utilities
    ├── supabase/            # Storage client
    └── trpc/                # API routers
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm dev:turbo` | Start with Turbopack (faster) |
| `pnpm build` | Create production build |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio GUI |

---

## Platform Support

| Platform | Character Limit | Feed Image | Stories/Reels |
|----------|-----------------|------------|---------------|
| LinkedIn | 3,000 | 1200×627 | 1080×1920 |
| Facebook | 63,206 | 1200×630 | 1080×1920 |
| Twitter/X | 280 | 1600×900 | 1080×1920 |
| Instagram | 2,200 | 1080×1080 | 1080×1920 |
| Pinterest | 500 | 1000×1500 | 1080×1920 |
| TikTok | 2,200 | 1080×1080 | 1080×1920 |

---

## Roadmap

- [x] Dashboard UI & navigation
- [x] Content creation wizard
- [x] Content library management
- [x] Scheduling calendar
- [x] Analytics dashboard
- [x] Brand kit management
- [ ] Social platform OAuth connections
- [ ] Live AI content generation
- [ ] Automated posting
- [ ] Mobile app (Flutter)

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Developed By

<div align="center">

<img width="380" height="420" alt="engr-mejba-ahmed" src="https://github.com/user-attachments/assets/83e72c39-5eaa-428a-884b-cb4714332487" />


### **Engr Mejba Ahmed**

**AI Developer | Software Engineer | Entrepreneur**

[![Portfolio](https://img.shields.io/badge/Portfolio-mejba.me-10B981?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.mejba.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mejba)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mejba13)

</div>

---

## Hire / Work With Me

I build AI-powered applications, mobile apps, and enterprise solutions. Let's bring your ideas to life!

| Platform | Description | Link |
|----------|-------------|------|
| **Fiverr** | Custom builds, integrations, performance optimization | [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD) |
| **Mejba Personal Portfolio** | Full portfolio & contact | [mejba.me](https://www.mejba.me) |
| **Ramlit Limited** | Software development company | [ramlit.com](https://www.ramlit.com) |
| **ColorPark Creative Agency** | UI/UX & creative solutions | [colorpark.io](https://www.colorpark.io) |
| **xCyberSecurity** | Global cybersecurity services | [xcybersecurity.io](https://www.xcybersecurity.io) |

---

<div align="center">

**Built with passion using Next.js, tRPC, and AI**

</div>
