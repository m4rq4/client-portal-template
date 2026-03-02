# Client Portal Template — Complete Setup Guide

A production-ready client portal built with Next.js 16, TypeScript, Tailwind CSS, Supabase, and shadcn/ui.

## ✅ What's Included

### Core Features
- 🔐 **Authentication** — Supabase Auth with email/password
- 📊 **Real-time Dashboard** — Live Meta Ads campaign metrics
- 📋 **Project Management** — Full CRUD for projects and tasks
- 🔔 **Submission System** — Clients can submit projects/tasks/reports
- 📱 **Mobile Responsive** — Sidebar + bottom navigation
- ⚡ **Real-time Updates** — Supabase realtime subscriptions
- 🎯 **Smart Analytics** — Click-to-analyze metric modals with AI insights

### Tech Stack
| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui + Radix UI |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **State Management** | TanStack Query (React Query) |
| **Icons** | Lucide React |
| **Deployment** | Vercel (static export) |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/m4rq4/client-portal-template.git
cd client-portal-template/my-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings → API
3. Run the database migrations (see below)

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Meta Ads API (optional — for live campaign data)
META_ACCESS_TOKEN=your-meta-access-token
META_AD_ACCOUNT_ID=your-ad-account-id
META_CAMPAIGN_ID=your-campaign-id

# Notifications (optional)
KIRBY_PHONE=7133980947

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Database Migrations

In Supabase SQL Editor, run:

```sql
-- Run the full migration from:
-- /supabase/migrations/001_initial_schema.sql
```

This creates:
- `clients` table — client profiles
- `projects` table — projects
- `tasks` table — project tasks
- `submissions` table — client submissions
- `campaign_metrics` table — Meta Ads metrics

### 6. Create First User

In Supabase Dashboard:
1. Go to Authentication → Users
2. Click "Add User"
3. Create a user with email/password
4. Note the UUID

Then run this SQL to create the client profile:

```sql
INSERT INTO clients (id, email, name, company_name, meta_campaign_id)
VALUES (
  'USER_UUID_HERE',
  'user@example.com',
  'Client Name',
  'Company Name',
  'meta-campaign-id'
);
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
my-app/
├── app/
│   ├── page.tsx              # Main dashboard (protected)
│   ├── login/page.tsx        # Login page
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Tailwind + global styles
│   └── api/
│       ├── meta-ads/route.ts      # Meta Ads API
│       └── submissions/route.ts   # Submission handler
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Sidebar, Header, MobileNav
│   ├── dashboard/            # StatCard, ProjectCard, TaskList, etc.
│   ├── forms/                # SubmissionModal
│   └── providers.tsx         # React Query provider
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser Supabase client
│   │   ├── server.ts         # Server Supabase client
│   │   └── database.types.ts # TypeScript types
│   ├── hooks/
│   │   └── useSupabase.ts    # React Query hooks
│   ├── types.ts              # App types
│   └── utils.ts              # Utilities
├── middleware.ts             # Auth middleware
└── package.json
```

---

## 🔐 Authentication Flow

1. User visits `/` → middleware checks session → redirects to `/login` if not authenticated
2. User logs in at `/login` → Supabase Auth creates session
3. Session cookie stored → user redirected to `/`
4. All subsequent requests include session → middleware validates
5. Logout clears session → redirects to `/login`

---

## 📊 Data Flow

### Projects & Tasks
```
Supabase Database
    ↓
React Query (caching + refetching)
    ↓
Components (real-time via subscriptions)
```

### Meta Ads Data
```
Meta Marketing API
    ↓
Next.js API Route (/api/meta-ads)
    ↓
React Query (30s refresh)
    ↓
Dashboard Components
```

### Submissions
```
Client submits form
    ↓
POST to /api/submissions
    ↓
Save to Supabase + iMessage notification
    ↓
Real-time update in UI
```

---

## 🎨 Customization

### Branding

Update in `app/page.tsx`:
- Company name
- Client name
- Colors

Or fetch from `clients` table using `useClientProfile()` hook.

### Meta Ads Integration

1. Get access token from [Meta Business](https://business.facebook.com/)
2. Add to `.env.local`:
   - `META_ACCESS_TOKEN`
   - `META_AD_ACCOUNT_ID`
   - `META_CAMPAIGN_ID`

Live data will appear automatically.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Build locally
npm run build
# Output: dist/ folder
```

### Self-Hosted (Docker)

```bash
# Build static export
npm run build

# Serve with nginx
docker run -p 3000:80 -v $(pwd)/dist:/usr/share/nginx/html nginx:alpine
```

---

## 🔧 API Routes

### GET /api/meta-ads
Fetches live Meta campaign data.

**Response:**
```json
{
  "leads": 0,
  "spend": "5.13",
  "impressions": 67,
  "clicks": 5,
  "ctr": "7.46",
  "cpm": "0",
  "campaignName": "Katy Leads",
  "lastUpdated": "2026-03-02T05:00:00Z"
}
```

### POST /api/submissions
Creates new submission + sends notification.

**Request:**
```json
{
  "type": "task",
  "title": "Set up new landing page",
  "description": "Need a page for Cypress area",
  "clientName": "Joshua Guidry"
}
```

---

## 📱 Features

### Overview Tab
- Stat cards (Active/Pending Projects, Activity)
- Current project summary
- Live Meta Ads metrics
- Task completion status

### Projects Tab
- List of all projects
- Status badges
- Mini metrics (leads, spend, CTR)
- Click to view details

### Project Detail
- Complete campaign metrics
- Click-to-analyze modals with insights
- Campaign health score
- Task lists (completed/current)
- Submit new tasks

### Reports Tab
- Placeholder for generated reports
- Request new reports

---

## 🔔 Notifications

When a client submits a project/task/report:
1. Saved to Supabase
2. iMessage sent to `KIRBY_PHONE`

Requires `imsg` CLI to be installed on server.

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### "Invalid API key" error
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Ensure key is from Settings → API, not the service role key

### "Row Level Security" error
- RLS policies are set up in migrations
- Ensure user is authenticated
- Check user exists in `clients` table with matching UUID

### Meta Ads data not loading
- Check `META_ACCESS_TOKEN` is valid
- Verify `META_CAMPAIGN_ID` is correct
- Check browser console for errors

### Real-time updates not working
- Ensure Supabase realtime is enabled
- Check browser WebSocket connection
- Verify RLS policies allow SELECT

---

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ⚠️ | Service role key (server only) |
| `META_ACCESS_TOKEN` | ❌ | Meta Marketing API token |
| `META_AD_ACCOUNT_ID` | ❌ | Meta ad account ID |
| `META_CAMPAIGN_ID` | ❌ | Meta campaign ID |
| `KIRBY_PHONE` | ❌ | Phone for notifications |
| `NEXT_PUBLIC_APP_URL` | ✅ | App URL for redirects |

---

## 🎯 Next Steps

### V1 (Current)
- ✅ Auth + protected routes
- ✅ Project/task management
- ✅ Meta Ads integration
- ✅ Submissions + notifications
- ✅ Mobile responsive

### V2 Ideas
- [ ] PDF report generation
- [ ] Activity log/history
- [ ] In-app messaging
- [ ] Multi-client support (admin view)
- [ ] Stripe billing integration
- [ ] Custom domains per client

---

## 📄 License

Private — NextTouch Acquisition

---

## 🆘 Support

For issues or questions:
1. Check Troubleshooting section
2. Review Supabase logs
3. Check browser console
4. Open issue on GitHub

---

**Built with:** Next.js 16 + TypeScript + Tailwind + Supabase + shadcn/ui

**Repo:** https://github.com/m4rq4/client-portal-template
