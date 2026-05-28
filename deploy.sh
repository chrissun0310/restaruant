#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"
PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"
COMPOSE="${COMPOSE:-docker compose}"
DRY_RUN="${DRY_RUN:-0}"

if [ -z "$EMAIL" ]; then
  echo "用法: EMAIL=you@example.com ./deploy.sh"
  echo "可选: DOMAIN=your-domain.com EMAIL=you@example.com ./deploy.sh"
  exit 1
fi

if [ "$DRY_RUN" = "1" ]; then
  echo "DRY_RUN=1：只验证免费域名生成和部署参数，不安装 Docker、不申请证书。"
fi

if [ "$DRY_RUN" != "1" ] && ! command -v docker >/dev/null 2>&1; then
  echo "正在安装 Docker..."
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

if [ "$DRY_RUN" != "1" ] && ! docker ps >/dev/null 2>&1; then
  COMPOSE="sudo docker compose"
fi

if [ "$DRY_RUN" != "1" ] && ! command -v envsubst >/dev/null 2>&1; then
  echo "正在安装 envsubst..."
  sudo apt-get update
  sudo apt-get install -y gettext-base
fi

if [ -z "$DOMAIN" ]; then
  echo "未提供 DOMAIN，正在自动使用免费 sslip.io 域名..."
  PUBLIC_IP="${PUBLIC_IP:-$(curl -fsSL https://api.ipify.org || curl -fsSL https://ifconfig.me || true)}"
  if [ -z "${PUBLIC_IP:-}" ]; then
    echo "无法自动获取公网 IP。请手动运行: DOMAIN=你的IP.sslip.io EMAIL=$EMAIL ./deploy.sh"
    exit 1
  fi
  DOMAIN="${PUBLIC_IP}.sslip.io"
  echo "免费域名: ${DOMAIN}"
fi

mkdir -p deploy/nginx/conf.d deploy/certbot/www deploy/certbot/conf

if [ "$DRY_RUN" = "1" ]; then
  echo "项目目录: ${PROJECT_DIR}"
  echo "部署域名: ${DOMAIN}"
  echo "HTTPS 邮箱: ${EMAIL}"
  echo "DRY_RUN 通过。真实部署命令: EMAIL=${EMAIL} ./deploy.sh"
  exit 0
fi

cat > deploy/nginx/conf.d/default.conf <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX

echo "构建并启动 HTTP 服务..."
$COMPOSE up -d --build app nginx

echo "申请 Let's Encrypt HTTPS 证书..."
$COMPOSE run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --keep-until-expiring \
  --no-eff-email \
  -d "$DOMAIN"

echo "写入 HTTPS Nginx 配置..."
DOMAIN="$DOMAIN" envsubst '$DOMAIN' < nginx.conf > deploy/nginx/conf.d/default.conf

echo "重载 Nginx..."
$COMPOSE up -d --build
$COMPOSE exec nginx nginx -s reload || $COMPOSE restart nginx

cat > deploy/renew-cert.sh <<'RENEW'
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../"
docker compose run --rm certbot renew --webroot --webroot-path /var/www/certbot
docker compose exec nginx nginx -s reload || docker compose restart nginx
RENEW
chmod +x deploy/renew-cert.sh

(crontab -l 2>/dev/null | grep -v "renew-cert.sh"; echo "23 3 * * * cd ${PROJECT_DIR} && ./deploy/renew-cert.sh >> /var/log/sun-master-certbot.log 2>&1") | crontab -

echo "部署完成: https://${DOMAIN}"
