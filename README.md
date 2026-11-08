# Kişisel Portfolyo Websitesi

Vue.js ve Vite ile oluşturulmuş, terminal/CRT temalı bir portfolyo websitesi.

## Özellikler

- 🖥️ Terminal temalı, tema-duyarlı (açık "editor" / koyu "fosfor") arayüz
- 🧩 Paylaşılan terminal tasarım sistemi (`terminal.css` `--tw-*` + `TerminalWindow.vue`)
- ⌨️ İnteraktif terminal simülatörü (komutlar, geçmiş, Tab tamamlama, neofetch)
- 🌐 i18n (TR/EN, vue-i18n) ve route-bazlı SEO
- 📱 Tamamen responsive (mobil, tablet, desktop)
- ⚡ Vite ile hızlı geliştirme ve build
- 🎨 Vue 3 Composition API
- 🚀 Cloudflare Workers'ta sunucusuz statik yayın
- 🔄 `main`'e her push'ta otomatik yayın (Workers Builds)
- 🎯 SEO optimizasyonu
- ♿ Accessibility standartlarına uygun

## Teknolojiler

- **Frontend:** Vue 3, Vue Router
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables)
- **Yayın:** Cloudflare Workers (statik dosyalar)
- **CI/CD:** Cloudflare Workers Builds

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

## Yayın (Cloudflare Workers)

Site, Cloudflare Workers üzerinde statik dosya olarak yayınlanır; sunucu gerekmez.

- `main` dalına her push'ta **Workers Builds** derler ve yayınlar (build: `npm run build`, deploy: `npx wrangler deploy`). Derleme başarısız olursa önceki sürüm yayında kalır.
- Ayarlar `wrangler.jsonc`'ta: `dist/` klasörü, `ahmetesrefkarabulut.com.tr` ve `www` alan adları (custom domain).
- `worker/index.js` yalnızca `http` → `https` ve `www` → ana adres yönlendirmesini yapar; gerisi statik dosyadır.
- `scripts/postbuild.mjs` her sayfa için kendi başlık/açıklama/canonical etiketli HTML'i ve gerçek 404 sayfasını üretir.
- Güvenlik başlıkları ve önbellek kuralları: `public/_headers`.

Elle yayınlamak gerekirse (Cloudflare API anahtarıyla):

```bash
npm run build
npx wrangler deploy
```

## İçerik Güncelleme

### Profil Bilgilerini Güncelleme

1. **src/components/about/ProfileCard.vue** - İsim, unvan, profil fotoğrafı
2. **src/components/about/AboutText.vue** - Hakkımda metni
3. **src/components/contact/ContactInfo.vue** - İletişim bilgileri

### CV Ekleme

PDF formatındaki CV dosyanızı `public/assets/cv.pdf` olarak kaydedin.

### Profil Fotoğrafı Ekleme

Profil fotoğrafını `src/assets/images/profile.jpg` olarak kaydetmeniz yeterli.
`ProfileCard.vue` ve `Terminal.vue` (neofetch) bu dosyayı doğrudan import eder
(yol değiştirmeye gerek yok):

```javascript
import profilePhoto from '../../assets/images/profile.jpg'
```

## Proje Yapısı

```
portfolio/
├── scripts/postbuild.mjs    # Sayfa başına HTML + 404.html
├── worker/index.js          # http/www yönlendirmesi
├── wrangler.jsonc           # Cloudflare Workers ayarı
├── public/                  # Statik dosyalar
│   └── assets/             # CV ve diğer dosyalar
├── src/
│   ├── assets/
│   │   ├── images/         # Görseller
│   │   └── styles/         # CSS (variables, reset, main, terminal.css)
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── about/          # Hakkımda bileşenleri (ProfileCard, ...)
│   │   ├── contact/        # İletişim bileşenleri
│   │   ├── tools/          # Araç bileşenleri (IP, DNS, JWT, JSON, cron, QR, ...)
│   │   ├── TerminalWindow.vue  # Paylaşılan terminal pencere kabuğu
│   │   └── Terminal.vue        # İnteraktif terminal simülatörü
│   ├── views/              # Sayfa görünümleri
│   ├── router/             # Vue Router yapılandırması
│   ├── locales/            # i18n (tr.js, en.js)
│   ├── directives/         # scrollReveal, parallax
│   ├── App.vue             # Ana uygulama bileşeni
│   └── main.js             # Uygulama giriş noktası
├── vite.config.js          # Vite yapılandırması
└── package.json            # Bağımlılıklar
```

## Lisans

MIT

## İletişim

Sorularınız için [ahmetesrefkarabulut@gmail.com](mailto:ahmetesrefkarabulut@gmail.com) adresinden ulaşabilirsiniz.
