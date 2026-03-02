#!/bin/bash

# Client Portal Automated Setup Script
# This script automates the entire setup process

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="client-portal-template"
PORT="3460"

echo "=========================================="
echo "Client Portal Automated Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

# Check if infrastructure network exists
if ! docker network ls | grep -q "infrastructure_default"; then
    echo -e "${YELLOW}Creating infrastructure network...${NC}"
    docker network create infrastructure_default
fi

# Check environment variables
if [ ! -f "$SCRIPT_DIR/my-app/.env.local" ]; then
    echo -e "${YELLOW}Warning: .env.local not found${NC}"
    echo "Creating from template..."
    cp "$SCRIPT_DIR/my-app/.env.example" "$SCRIPT_DIR/my-app/.env.local"
    echo -e "${RED}Please edit .env.local with your Supabase credentials before continuing${NC}"
    exit 1
fi

# Source environment variables
export $(grep -v '^#' "$SCRIPT_DIR/my-app/.env.local" | xargs)

# Validate required env vars
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ "$NEXT_PUBLIC_SUPABASE_URL" = "https://your-project.supabase.co" ]; then
    echo -e "${RED}Error: NEXT_PUBLIC_SUPABASE_URL not configured${NC}"
    echo "Please edit my-app/.env.local with your Supabase credentials"
    exit 1
fi

echo -e "${GREEN}✓ Environment configured${NC}"

# Build and start
echo ""
echo "Building and starting client portal..."
cd "$SCRIPT_DIR"
docker-compose down 2>/dev/null || true
docker-compose up --build -d

# Wait for health check
echo ""
echo "Waiting for service to start..."
sleep 5

# Check if running
if curl -s http://localhost:$PORT > /dev/null; then
    echo -e "${GREEN}✓ Client Portal is running!${NC}"
    echo ""
    echo "=========================================="
    echo "Access URLs:"
    echo "  Local:    http://localhost:$PORT"
    echo "  Network:  http://$(hostname -I | awk '{print $1}'):$PORT"
    echo "=========================================="
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop:      docker-compose down"
else
    echo -e "${RED}Warning: Service may not have started correctly${NC}"
    echo "Check logs with: docker-compose logs"
fi

# Register in system registry
echo ""
echo "Registering in M4RQ system registry..."
mkdir -p ~/.openclaw/systems
cat > ~/.openclaw/systems/client-portal-template.json << EOF
{
  "name": "Client Portal Template",
  "type": "client-portal",
  "status": "active",
  "port": $PORT,
  "location": "$SCRIPT_DIR",
  "repository": "https://github.com/m4rq4/client-portal-template",
  "services": {
    "web": "http://localhost:$PORT",
    "docker": "$PROJECT_NAME"
  },
  "environment": {
    "supabase_url": "$NEXT_PUBLIC_SUPABASE_URL"
  },
  "deployed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo -e "${GREEN}✓ Registered in system registry${NC}"
echo ""
echo "Setup complete!"
