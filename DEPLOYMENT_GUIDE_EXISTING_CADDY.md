# 🚀 WBBT.net Deployment (Existing Caddy)

Since you already have Caddy running on your server, follow these steps.

## 1. Start the App
Run these commands on your server:

```bash
# 1. Clone/Pull
git clone https://github.com/wbbtmusic/wbbt-net.git
cd wbbt-net

# 2. Start ONLY the app (It runs on port 3005)
docker compose up -d --build
```

## 2. Configure Your Existing Caddy
Open your existing `Caddyfile` (usually `/etc/caddy/Caddyfile` or where your docker volume is) and add this block:

```nginx
wbbt.net {
    reverse_proxy localhost:3005
}
```

*Note: If your existing Caddy is in a Docker container, you might need to use the host IP or ensure they are in the same network. Trying `localhost:3005` works if Caddy is running with `network_mode: host` or physically on the server.*

## 3. Reload Caddy
Restart your Caddy to apply changes.
