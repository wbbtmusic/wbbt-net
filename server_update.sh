#!/bin/bash

echo "🚀 Starting Update Process..."

# 1. Pull latest code
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# 2. Rebuild and restart containers
echo "🔄 Rebuilding and restarting containers..."
docker compose up -d --build --remove-orphans

echo "✅ Update Complete! Site is live."
