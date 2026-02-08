# 🚀 WBBT.net Ubuntu Deployment Guide

Follow these steps to deploy your site on a fresh Ubuntu server.

## Prerequisites
- An Ubuntu Server (VPS)
- Docker & Docker Compose installed

## 1. Setup (First Time Only)
Run these commands on your server:

```bash
# 1. Clone the repository
git clone https://github.com/wbbtmusic/wbbt-net.git
cd wbbt-net

# 2. Start the server
docker compose up -d
```

Your site should now be live on your server's IP address!

## 2. How to Update
When you push changes from your local computer:
1. SSH into your server.
2. Go to the folder: `cd wbbt-net`
3. Run the update script:
   ```bash
   chmod +x server_update.sh  # (Only needed once)
   ./server_update.sh
   ```

## 3. Connecting a Domain (SSL)
1. Point your Domain's **A Record** to your server's IP.
2. Edit the `Caddyfile` on the server:
   ```bash
   nano Caddyfile
   ```
3. Change `:80` to your domain name:
   ```nginx
   wbbt.net {
       reverse_proxy app:80
   }
   ```
4. Restart Caddy:
   ```bash
   docker compose restart caddy
   ```
   Caddy will automatically generate an SSL certificate for you.
