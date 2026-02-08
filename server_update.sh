#!/bin/bash

# Configuration
LOG_FILE="/root/wbbt-net/update.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

cd /root/wbbt-net || { log "❌ Directory not found!"; exit 1; }

# Check for updates
git fetch origin main
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ $LOCAL = $REMOTE ]; then
    # No changes
    exit 0
else
    log "🚀 New update found. Pulling changes..."
    git pull origin main >> "$LOG_FILE" 2>&1
    
    log "🔄 Rebuilding container..."
    docker compose up -d --build >> "$LOG_FILE" 2>&1
    
    log "✅ Update applied successfully."
fi
