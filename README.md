# Kişisel Portfolyo Websitesi

Vue.js ve Vite ile oluşturulmuş minimalist, modern bir portfolyo websitesi.

## Özellikler

- ✨ Modern ve minimalist tasarım
- 📱 Tamamen responsive (mobil, tablet, desktop)
- ⚡ Vite ile hızlı geliştirme ve build
- 🎨 Vue 3 Composition API
- 🚀 Docker ile kolay deployment
- 🔄 GitHub Actions ile otomatik CI/CD
- 🎯 SEO optimizasyonu
- ♿ Accessibility standartlarına uygun

## Teknolojiler

- **Frontend:** Vue 3, Vue Router
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables)
- **Deployment:** Docker, Nginx
- **CI/CD:** GitHub Actions / GitLab CI

## Geliştirme

### Gereksinimler

- Node.js 20+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production build'i önizle
npm run preview
```

## Docker ile Çalıştırma

### Lokal olarak test etmek için:

```bash
# Docker image oluştur
docker build -t portfolio:latest .

# Container'ı çalıştır
docker run -p 3000:80 portfolio:latest
```

### Docker Compose ile:

```bash
# Container'ı başlat
docker compose up -d

# Logları görüntüle
docker compose logs -f

# Container'ı durdur
docker compose down
```

## Deployment

### Hetzner Sunucuya Deployment

#### 1. Sunucu Hazırlığı

```bash
# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose plugin kurulumu
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Kullanıcıyı docker grubuna ekle
sudo usermod -aG docker $USER
newgrp docker

# Proje klasörünü oluştur
mkdir -p ~/portfolio
cd ~/portfolio
```

#### 2. Nginx Reverse Proxy Kurulumu

Ana sunucuda `/etc/nginx/sites-available/portfolio` dosyası oluşturun:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Site'ı aktif edin ve SSL ekleyin:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Certbot ile SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 3. GitHub Secrets Yapılandırması

GitHub repository'nizde **Settings > Secrets and variables > Actions** bölümünden aşağıdaki secrets'ları ekleyin:

- `SERVER_HOST`: Hetzner sunucu IP adresi
- `SERVER_USER`: SSH kullanıcı adı
- `SSH_PRIVATE_KEY`: SSH private key

SSH key oluşturma:

```bash
# Lokal makinede
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/portfolio_deploy

# Public key'i sunucuya ekle
ssh-copy-id -i ~/.ssh/portfolio_deploy.pub user@server-ip

# Private key'i kopyala (GitHub secret olarak eklenecek)
cat ~/.ssh/portfolio_deploy
```

#### 4. Otomatik Deployment

Kod değişikliklerinizi `main` branch'ine push ettiğinizde, GitHub Actions otomatik olarak:
1. Docker image build eder
2. Sunucuya transfer eder
3. Container'ı yeniden başlatır
4. Health check yapar

```bash
git add .
git commit -m "Update website"
git push origin main
```

### Manuel Deployment

```bash
# Lokal makinede build et
docker build -t portfolio:latest .

# Test et
docker run -p 3000:80 portfolio:latest

# Sunucuya image'ı gönder
docker save portfolio:latest | gzip | ssh user@server-ip 'cat > ~/portfolio/portfolio.tar.gz'

# Sunucuda deploy et
ssh user@server-ip
cd ~/portfolio
docker load < portfolio.tar.gz
docker compose up -d
```

## İçerik Güncelleme

### Profil Bilgilerini Güncelleme

1. **src/components/about/ProfileCard.vue** - İsim, unvan, profil fotoğrafı
2. **src/components/about/AboutText.vue** - Hakkımda metni
3. **src/components/contact/ContactInfo.vue** - İletişim bilgileri

### CV Ekleme

PDF formatındaki CV dosyanızı `public/assets/cv.pdf` olarak kaydedin.

### Profil Fotoğrafı Ekleme

Profil fotoğrafınızı `src/assets/images/profile.jpg` olarak kaydedin ve `ProfileCard.vue` dosyasında yolu güncelleyin:

```javascript
const profileImage = '/src/assets/images/profile.jpg'
```

## Monitoring

```bash
# Container durumunu kontrol et
docker ps

# Logları görüntüle
docker compose logs -f

# Container'a bağlan
docker exec -it portfolio-web sh

# Resource kullanımı
docker stats portfolio-web
```

## Proje Yapısı

```
portfolio/
├── .github/workflows/       # GitHub Actions workflows
├── public/                  # Statik dosyalar
│   └── assets/             # CV ve diğer dosyalar
├── src/
│   ├── assets/
│   │   ├── images/         # Görseller
│   │   └── styles/         # CSS dosyaları
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── about/          # Hakkımda bileşenleri
│   │   └── contact/        # İletişim bileşenleri
│   ├── views/              # Sayfa görünümleri
│   ├── router/             # Vue Router yapılandırması
│   ├── App.vue             # Ana uygulama bileşeni
│   └── main.js             # Uygulama giriş noktası
├── Dockerfile              # Docker yapılandırması
├── docker-compose.yml      # Docker Compose yapılandırması
├── nginx.conf              # Nginx yapılandırması
├── vite.config.js          # Vite yapılandırması
└── package.json            # Bağımlılıklar
```

## Lisans

MIT

## İletişim

Sorularınız için [ahmetesrefkarabulut@gmail.com](mailto:ahmetesrefkarabulut@gmail.com) adresinden ulaşabilirsiniz.
