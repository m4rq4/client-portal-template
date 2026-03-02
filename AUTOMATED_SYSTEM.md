# Client Portal — Automated System

## 🚀 Quick Deploy (Automated)

```bash
# Deploy the template
/Users/m4rq/.openclaw/workspace/client-portal-template/setup.sh

# Or deploy for a specific client
/Users/m4rq/.openclaw/workspace/infrastructure/scripts/deploy-client-portal.sh joshua-guidry joshua.nexttouchacquisition.io
```

---

## System Overview

| Component | Status | Location |
|-----------|--------|----------|
| **Template Source** | ✅ Ready | `/client-portal-template/` |
| **Docker** | ✅ Configured | `docker-compose.yml` |
| **Setup Script** | ✅ Automated | `setup.sh` |
| **Dashboard Registry** | ✅ Registered | `infrastructure/systems/` |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  NextTouch Infrastructure                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────┐      ┌─────────────────────┐   │
│  │  Client Portal      │◄────►│  Supabase           │   │
│  │  (Docker: 3460)     │      │  (PostgreSQL)       │   │
│  └─────────────────────┘      └─────────────────────┘   │
│           │                                              │
│           ▼                                              │
│  ┌─────────────────────┐      ┌─────────────────────┐   │
│  │  Meta Ads API       │      │  iMessage           │   │
│  │  (Live metrics)     │      │  (Notifications)    │   │
│  └─────────────────────┘      └─────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Options

### Option 1: One-Command Deploy (Recommended)

```bash
cd /Users/m4rq/.openclaw/workspace/client-portal-template
./setup.sh
```

This will:
1. Check Docker is running
2. Validate environment variables
3. Build and start the container
4. Register in system registry
5. Show access URLs

### Option 2: Docker Compose

```bash
cd /Users/m4rq/.openclaw/workspace/client-portal-template
docker-compose up -d
```

### Option 3: Deploy New Client from Template

```bash
# Creates a new client portal from the template
/Users/m4rq/.openclaw/workspace/infrastructure/scripts/deploy-client-portal.sh \
  [client-name] \
  [domain]

# Example:
/Users/m4rq/.openclaw/workspace/infrastructure/scripts/deploy-client-portal.sh \
  joshua-guidry \
  joshua.nexttouchacquisition.io
```

---

## System Registry

The client portal is registered in:

```
~/.openclaw/systems/client-portal-template.json
infrastructure/systems/client-portal-template.json
```

View all registered systems:
```bash
ls -la ~/.openclaw/systems/
cat ~/.openclaw/systems/*.json | jq '.name, .status, .port'
```

---

## Environment Setup

### Required Variables

Create `my-app/.env.local`:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# For Meta Ads (optional)
META_ACCESS_TOKEN=your-meta-token
META_AD_ACCOUNT_ID=act_123456789
META_CAMPAIGN_ID=1234567890

# For notifications (optional)
KIRBY_PHONE=7133980947
```

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run SQL migration: `supabase/migrations/001_initial_schema.sql`
3. Add your credentials to `.env.local`

---

## Management Commands

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Update (rebuild)
docker-compose down
docker-compose up --build -d

# Stop
docker-compose down

# View status
docker ps | grep client-portal
```

---

## Integration with Infrastructure

The client portal connects to your existing infrastructure:

| Service | Integration | Status |
|---------|-------------|--------|
| **Docker Network** | `infrastructure_default` | ✅ Connected |
| **n8n** | Webhook at `/api/submissions` | ✅ Ready |
| **iMessage** | Notifications on submissions | ✅ Ready |
| **Meta Campaign Tracker** | Shared data source | ✅ Ready |
| **Supabase** | Primary database | ✅ Ready |

---

## Client Portal Features

### For Clients
- 🔐 Secure login with Supabase Auth
- 📊 Real-time Meta Ads dashboard
- 📋 Project and task tracking
- 🔔 Submit new projects/tasks/reports
- 📱 Mobile-responsive design

### For You (Admin)
- 🚀 One-command deployment per client
- 🐳 Docker containerized
- 📊 Centralized system registry
- 🔔 iMessage alerts on submissions
- 🔧 Easy customization per client

---

## Creating a New Client Portal

```bash
# 1. Deploy from template
/Users/m4rq/.openclaw/workspace/infrastructure/scripts/deploy-client-portal.sh \
  [client-name] \
  [domain]

# 2. Edit environment
cd /Users/m4rq/.openclaw/clients/[client-name]-portal
vim my-app/.env.local

# 3. Run setup
./setup.sh

# 4. Done! Access at http://localhost:3460
```

---

## Troubleshooting

### Portal won't start
```bash
# Check logs
docker-compose logs

# Check if port is available
lsof -i :3460

# Rebuild
docker-compose down
docker-compose up --build -d
```

### Supabase connection fails
- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Ensure RLS policies are set up

### Build errors
```bash
cd my-app
rm -rf node_modules dist
npm install
npm run build
```

---

## Automation Roadmap

### Phase 1: ✅ Current
- [x] Docker containerization
- [x] Automated setup script
- [x] System registry integration
- [x] One-command deployment

### Phase 2: Next
- [ ] n8n workflow for auto-deployment
- [ ] Auto-create Supabase project via API
- [ ] Vercel auto-deployment
- [ ] SSL certificate automation

### Phase 3: Scale
- [ ] Multi-tenant (single app, multiple clients)
- [ ] Custom domain automation
- [ ] Billing integration (Stripe)
- [ ] White-label customization

---

## System Information

| Property | Value |
|----------|-------|
| **Name** | Client Portal Template |
| **Type** | client-portal |
| **Port** | 3460 |
| **Status** | ready-to-deploy |
| **Repository** | https://github.com/m4rq4/client-portal-template |
| **Location** | `/Users/m4rq/.openclaw/workspace/client-portal-template` |
| **Managed By** | M4RQ |

---

**Last Updated:** 2026-03-02  
**Status:** ✅ Automated & Ready
