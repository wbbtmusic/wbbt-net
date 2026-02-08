#!/bin/bash

echo "🚀 Starting Update Process..."

# 1. Pull latest code
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# 2. Rebuild and restart the app
echo "🔄 Rebuilding and restarting container..."
docker compose up -d --build

echo "✅ Update Complete! Site is live."
