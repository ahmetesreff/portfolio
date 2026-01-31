# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Package files'ı kopyala ve dependencies'i yükle
COPY package*.json ./
RUN npm ci --only=production

# Kaynak kodları kopyala ve build et
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Nginx config'i kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build edilmiş dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck ekle
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
