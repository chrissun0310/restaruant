# Ubuntu 22.04 香港服务器部署说明

## 服务器目录结构

推荐放在：

```text
/opt/sun-master-fengshui
├── .env.production
├── Dockerfile
├── docker-compose.yml
├── ecosystem.config.js
├── nginx.conf
├── deploy.sh
├── deploy/
│   ├── certbot/
│   │   ├── conf/
│   │   └── www/
│   └── nginx/
│       └── conf.d/
├── public/
│   ├── fengshui_rules.json
│   ├── manifest.webmanifest
│   ├── pwa-icon.svg
│   └── service-worker.js
└── src/
```

## 免费域名方案

如果你没有域名，可以直接使用免费的 `sslip.io`。它会把包含 IP 的域名自动解析到该 IP，例如：

```text
1.2.3.4.sslip.io -> 1.2.3.4
```

本项目的 `deploy.sh` 已经支持自动获取服务器公网 IP 并生成免费域名。

## DNS 准备（如果你有自己的域名）

先把域名 A 记录解析到香港服务器公网 IP：

```text
sun.example.com  A  <server-ip>
```

## 首次部署（免费域名）

在服务器执行：

```bash
sudo mkdir -p /opt/sun-master-fengshui
sudo chown -R "$USER":"$USER" /opt/sun-master-fengshui
cd /opt/sun-master-fengshui
```

把项目文件上传到该目录后运行：

```bash
chmod +x deploy.sh
EMAIL=admin@example.com ./deploy.sh
```

脚本会自动生成类似这样的免费域名：

```text
https://1.2.3.4.sslip.io
```

## 首次部署（自有域名）

如果你有自己的域名，运行：

```bash
chmod +x deploy.sh
DOMAIN=sun.example.com EMAIL=admin@example.com ./deploy.sh
```

部署完成后访问：

```text
https://sun.example.com
```

## 常用维护命令

查看服务：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs -f app
docker compose logs -f nginx
```

重新构建并发布：

```bash
DOMAIN=sun.example.com EMAIL=admin@example.com ./deploy.sh
```

手动续期证书：

```bash
./deploy/renew-cert.sh
```

## 架构说明

- React + Tailwind + Framer Motion 通过 Vite 执行 production build。
- Docker 构建 `dist/` 静态资源。
- Node 容器用 PM2 运行 `serve -s dist -l 3000`。
- Nginx 容器反向代理到 Node 服务。
- Certbot 容器自动申请 Let's Encrypt HTTPS 证书。
- `deploy.sh` 会写入 HTTP 临时配置，申请证书，再切换到 HTTPS 配置。
- PWA 文件在 `public/manifest.webmanifest` 和 `public/service-worker.js`。
- iPhone Safari 支持 `apple-mobile-web-app-*` meta 与安全区域适配。
