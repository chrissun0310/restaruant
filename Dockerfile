FROM node:20-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pm2@5 serve@14

COPY --from=build /app/dist ./dist
COPY ecosystem.config.js ./ecosystem.config.js

EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
