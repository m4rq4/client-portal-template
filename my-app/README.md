# Client Portal Template

NextTouch Acquisition client portal template built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 📊 Real-time Meta Ads campaign metrics
- 📋 Project management with task tracking
- 📱 Mobile-responsive design
- 🔔 Submission system with notifications
- 🎨 Customizable branding per client

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Meta Ads API credentials to `.env.local`

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Build for production:
```bash
npm run build
```

The `dist` folder will contain the static export ready for deployment.

## Project Structure

```
app/
├── page.tsx           # Main dashboard
├── layout.tsx         # Root layout
├── globals.css        # Global styles
└── api/
    ├── meta-ads/      # Meta Ads API endpoint
    └── submissions/   # Submission handler

components/
├── ui/                # shadcn/ui components
├── layout/            # Layout components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── MobileNav.tsx
├── dashboard/         # Dashboard components
│   ├── StatCard.tsx
│   ├── ProjectCard.tsx
│   ├── TaskList.tsx
│   ├── MetricAnalysis.tsx
│   └── CampaignHealth.tsx
└── forms/             # Form components
    └── SubmissionModal.tsx

lib/
├── types.ts           # TypeScript types
├── utils.ts           # Utilities
└── hooks/             # Custom hooks
```

## Customization

### Branding

Update the branding in `app/page.tsx`:

- Company name
- Client name
- Logo/colors

### Meta Ads Integration

Add your Meta Marketing API credentials to fetch live campaign data:

1. Get access token from Meta Business
2. Add to `.env.local`:
   - `META_ACCESS_TOKEN`
   - `META_AD_ACCOUNT_ID`
   - `META_CAMPAIGN_ID`

## License

Private - NextTouch Acquisition

