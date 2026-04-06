# LaunchFlow

**Ship your SaaS 10x faster.** LaunchFlow is an AI-powered project management tool built for SaaS teams who actually ship.

## Preview

> [Add screenshot here]

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Backend | Supabase (waitlist) |
| Fonts | Outfit + Inter via `next/font/google` |
| Icons | Lucide React |
| Package Manager | pnpm |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/launchflow.git
cd launchflow

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key

# 4. Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://launchflow.app
```

---

## Features

- **AI Sprint Planning** — Describe goals in plain English; get full sprint plans with effort estimates and blocker prediction
- **Real-time Collaboration** — Live presence, instant updates, and async handoffs
- **Ship Analytics** — Velocity, cycle time, and deployment frequency in one dashboard
- **Waitlist API** — `/api/waitlist` route with email validation and Supabase insert
- **Scroll animations** — Framer Motion `useInView` stagger animations on every section
- **Accessible** — ARIA attributes on all interactive elements, WCAG AA contrast, keyboard navigable
- **Responsive** — Mobile-first layout, tested at 375px / 768px / 1280px

---

## Project Structure

```
/app
  layout.tsx          # Fonts, metadata, dark theme
  page.tsx            # Section composition
  /api/waitlist
    route.ts          # POST endpoint for waitlist signups
/components
  /sections           # Full-page sections (Hero, Features, Pricing, …)
  /ui                 # Reusable primitives
/lib
  utils.ts            # cn() helper
  supabase.ts         # Lazy Supabase client
/public
  robots.txt
  sitemap.xml
  og.png              # Open Graph image (replace with real asset)
```

---

## Deployment

The fastest way to deploy is **Vercel one-click deploy**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repo to GitHub
2. Import it in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and configures everything

For other platforms (Netlify, Railway, Fly.io), run `pnpm build` and serve the `.next` output.
