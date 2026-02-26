# NexusAI — Setup Guide

## Prerequisites
- Node.js 18+
- A Supabase account (free tier works)
- A Resend account (free tier — 3,000 emails/month)
- A Vercel account (free tier works)

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in all values (see sections below).

---

## 3. Supabase Setup

### 3a. Create a project
1. Go to [supabase.com](https://supabase.com) → New project
2. Note your **Project URL** and **API keys** from Settings → API

### 3b. Create the leads table
Run this SQL in the Supabase **SQL Editor**:

```sql
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (used by API routes)
CREATE POLICY "Service role full access" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 3c. Create an admin user
In Supabase → **Authentication** → Users → **Add user**:
- Email: `admin@yourdomain.com`
- Password: (choose a strong password)

### 3d. Fill in env vars
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...   ← from Settings → API → service_role key
```

---

## 4. Resend Setup (email notifications)

1. Go to [resend.com](https://resend.com) → sign up
2. **API Keys** → Create API Key → copy it
3. **Domains** → Add your domain (or use the sandbox `onboarding@resend.dev` for testing)

```
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
NOTIFICATION_EMAIL=you@yourdomain.com
```

> **Testing without a domain:** Leave `RESEND_FROM_EMAIL` as `onboarding@resend.dev`
> and point `NOTIFICATION_EMAIL` to your personal email. Resend's sandbox mode
> works immediately — no domain verification required.

---

## 5. Calendly (optional)

If you have a Calendly account:
1. Go to your Calendly event type → Share → Copy link
2. Set: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle/30min`

If left empty, the booking section is automatically hidden.

---

## 6. Run locally

```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

---

## 7. Deploy to Vercel

### 7a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-agency.git
git push -u origin main
```

### 7b. Import to Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. **Framework:** Next.js (auto-detected)
4. **Environment Variables:** Add all vars from `.env.local`
5. Click **Deploy**

### 7c. Connect a custom domain
1. In Vercel → your project → **Settings → Domains**
2. Add `yourdomain.com`
3. Copy the DNS records Vercel provides
4. In your DNS provider (Cloudflare, Namecheap, etc.), add:
   - **A record:** `@` → Vercel IP
   - **CNAME:** `www` → `cname.vercel-dns.com`
5. Wait 5–30 minutes for propagation

---

## 8. Build check

```bash
npm run build
```

Must complete with **zero errors** before deploying.

---

## Folder Structure

```
ai-agency/
├── app/
│   ├── admin/
│   │   ├── AdminDashboard.tsx    ← client dashboard component
│   │   ├── page.tsx              ← server: auth check + data fetch
│   │   └── login/
│   │       └── page.tsx
│   ├── api/
│   │   ├── contact/route.ts      ← POST: save lead + send email
│   │   └── leads/route.ts        ← GET: fetch leads (auth required)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   ├── Contact.tsx
│   │   ├── Booking.tsx
│   │   └── Footer.tsx
│   └── ui/                       ← Shadcn-style components
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       └── card.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             ← browser client
│   │   └── server.ts             ← server + service role clients
│   └── utils.ts
├── middleware.ts                  ← protects /admin routes
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Customization

### Rename the agency
Search and replace `NexusAI` across all files with your agency name.

### Update content
- **Hero:** `components/sections/Hero.tsx` — headline, stats
- **Services:** `components/sections/Services.tsx` — service cards
- **Portfolio:** `components/sections/Portfolio.tsx` — case studies
- **Pricing:** `components/sections/Pricing.tsx` — tiers + prices
- **Footer:** `components/sections/Footer.tsx` — links, social

### Change brand colors
In `tailwind.config.ts`, update the `from-indigo-500 to-violet-500` gradient to your preferred accent colors.
