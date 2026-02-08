#!/bin/bash

SCRIPT_PATH="/root/wbbt-net/server_update.sh"
CRON_JOB="*/30 * * * * $SCRIPT_PATH"

# Check if cron job already exists
(crontab -l 2>/dev/null | grep -F "$SCRIPT_PATH") && echo "✅ Auto-update already configured!" && exit 0

# Add cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Auto-update configured! Checking every 30 minutes."
echo "📝 Logs will be in /root/wbbt-net/update.log"
chmod +x server_update.sh
