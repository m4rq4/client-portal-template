# System Saved — Client Portal Template

## ✅ System Registered in Dashboard

**Dashboard URL:** https://dashboard.nexttouchacquisition.io  
**System ID:** `client-portal-template`  
**Status:** Production Ready

---

## Saved System Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **System Registry** | `infrastructure/systems/client-portal-template.json` | Core system metadata |
| **Detailed Spec** | `infrastructure/systems/client-portal-detailed.json` | Complete technical specification |
| **System Docs** | `infrastructure/systems/CLIENT_PORTAL_SYSTEM.md` | Full documentation |

---

## Complete Tech Stack Documented

### Core Technologies
```
Framework:     Next.js 16.2.0
Language:      TypeScript 5.x
React:         19.0.0
Runtime:       Node.js 20
```

### UI & Styling
```
CSS:           Tailwind CSS v4
Components:    shadcn/ui + Radix UI
Icons:         Lucide React
Font:          Inter (Google Fonts)
```

### Data & State
```
State:         TanStack Query 5.66.11
Database:      Supabase (PostgreSQL)
Auth:          Supabase Auth (@supabase/ssr)
Realtime:      Supabase Realtime
```

### External APIs
```
Meta Marketing API v18.0 — Campaign metrics
Supabase Platform — Database, Auth, Realtime
iMessage CLI — Notifications
```

---

## Tools Used (Documented)

### Development
- **IDE:** Cursor (for future enhancements)
- **AI Assistant:** Claude Code (via Cursor)
- **Version Control:** Git + GitHub
- **Package Manager:** npm

### Build & Deploy
- **Bundler:** Next.js Webpack
- **Transpiler:** TypeScript
- **CSS:** Tailwind PostCSS
- **Container:** Docker Desktop
- **Orchestration:** Docker Compose

### Automation
- **Setup Script:** `setup.sh` — One-command deploy
- **Deploy Script:** `deploy-client-portal.sh` — Clone for new clients

---

## Quick Access

| Resource | URL/Path |
|----------|----------|
| **Production Dashboard** | https://dashboard.nexttouchacquisition.io |
| **Local Development** | http://localhost:3460 |
| **GitHub Repository** | https://github.com/m4rq4/client-portal-template |
| **Local Template** | `/Users/m4rq/.openclaw/workspace/client-portal-template` |
| **System Registry** | `/Users/m4rq/.openclaw/workspace/infrastructure/systems/` |

---

## Deployment Commands (Saved)

```bash
# Deploy template
/Users/m4rq/.openclaw/workspace/client-portal-template/setup.sh

# Create new client portal
/Users/m4rq/.openclaw/workspace/infrastructure/scripts/deploy-client-portal.sh \
  [client-name] [domain]

# View all systems
ls -la ~/.openclaw/systems/
```

---

## Integration with Your Infrastructure

✅ **Docker Network:** `infrastructure_default`  
✅ **Port:** `3460`  
✅ **n8n Webhook:** Ready  
✅ **iMessage Notifications:** Configured  
✅ **System Registry:** Tracked

---

**Saved to Dashboard:** 2026-03-02  
**System Status:** Production Ready  
**Managed By:** M4RQ
