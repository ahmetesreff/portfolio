// `vite build` sonrası çalışır (package.json "build"). Üç iş yapar:
//  0. Kişi ve site (WebSite) yapılandırılmış verisini src/seo.js'ten statik HTML'e koyar
//     (data-seo öznitelikleriyle; SeoHead.vue aynı etiketleri günceller, kopya oluşmaz).
//     Google arama sonucundaki site adı ana sayfadaki WebSite verisinden gelir; JS beklemesin.
//  1. Her sayfa için kendi <head>'i olan bir HTML kopyası yazar (dist/hakkimda.html ...).
//     Cloudflare Workers /hakkimda isteğine hakkimda.html'i 200 ile verir; JS çalıştırmayan
//     botlar ve paylaşım önizlemeleri de doğru başlık, açıklama ve canonical görür.
//  2. dist/404.html yazar: bilinmeyen adres gerçek 404 durum koduyla döner (yumuşak 404 yok),
//     içeriği yine SPA olduğu için NotFoundView çizilir.
// Yeni sayfa eklerken PAGES'e ve public/sitemap.xml'e ekle; ikisi uyuşmazsa build durur.
import { readFileSync, writeFileSync } from 'node:fs'
import tr from '../src/locales/tr.js'
import { siteConfig, personSchema, websiteSchema } from '../src/seo.js'

const PAGES = [
  { path: '/hakkimda', seo: 'about' },
  { path: '/iletisim', seo: 'contact' },
  { path: '/araclar', seo: 'tools' }
]

const dist = new URL('../dist/', import.meta.url)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// 0. Yapılandırılmış veri: <script> içinde "</" kapanışa dönüşmesin diye < kaçırılır
const jsonLd = (id, obj) =>
  `    <script type="application/ld+json" data-seo="${id}">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>\n`
const built = readFileSync(new URL('index.html', dist), 'utf8')
if (built.split('</head>').length !== 2) throw new Error('postbuild: </head> tam bir kez bulunmalı')
if (built.includes('data-seo=')) throw new Error('postbuild: index.html zaten data-seo içeriyor (iki kez çalıştı mı?)')
const template = built.replace('</head>',
  jsonLd('person', personSchema) + jsonLd('website', websiteSchema(tr.seo.site.description)) + '  </head>')
writeFileSync(new URL('index.html', dist), template)

// Şablondaki etiketi tam bir kez bulup değerini değiştirir; bulamazsa build'i durdurur
// (index.html'deki statik etiketler değişirse sessizce yanlış sayfa üretilmesin).
const setOnce = (html, re, value, label) => {
  let count = 0
  const out = html.replace(re, (_m, pre, _old, post) => {
    count++
    return pre + value + post
  })
  if (count !== 1) throw new Error(`postbuild: "${label}" ${count} kez bulundu, 1 bekleniyordu (index.html değişmiş olabilir)`)
  return out
}

const meta = (attr, name) => new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")([^"]*)(")`, 'g')

const render = ({ title, description, url, robots }) => {
  let html = template
  html = setOnce(html, /(<title>)([^<]*)(<\/title>)/g, esc(title), 'title')
  html = setOnce(html, meta('name', 'description'), esc(description), 'description')
  html = setOnce(html, meta('name', 'robots'), robots, 'robots')
  html = setOnce(html, meta('property', 'og:title'), esc(title), 'og:title')
  html = setOnce(html, meta('property', 'og:description'), esc(description), 'og:description')
  html = setOnce(html, meta('name', 'twitter:title'), esc(title), 'twitter:title')
  html = setOnce(html, meta('name', 'twitter:description'), esc(description), 'twitter:description')
  if (url) {
    html = setOnce(html, /(<link\s+rel="canonical"\s+href=")([^"]*)(")/g, url, 'canonical')
    html = setOnce(html, meta('property', 'og:url'), url, 'og:url')
  } else {
    // 404: canonical ana sayfayı göstermesin
    const before = html
    html = html.replace(/[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/, '')
    if (html === before) throw new Error('postbuild: canonical bulunamadı')
  }
  return html
}

// sitemap.xml ile PAGES aynı sayfaları listelemeli
const sitemap = readFileSync(new URL('sitemap.xml', dist), 'utf8')
const inSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([, loc]) => loc.replace(siteConfig.baseUrl, ''))
  .filter((p) => p !== '/')
const known = PAGES.map((p) => p.path)
const missing = inSitemap.filter((p) => !known.includes(p))
const extra = known.filter((p) => !inSitemap.includes(p))
if (missing.length || extra.length) {
  throw new Error(`postbuild: sitemap ile PAGES uyuşmuyor; PAGES'te yok: ${missing.join(', ') || '-'}, sitemap'te yok: ${extra.join(', ') || '-'}`)
}

for (const { path, seo } of PAGES) {
  const { title, description } = tr.seo[seo]
  const html = render({ title, description, url: `${siteConfig.baseUrl}${path}`, robots: 'index, follow' })
  writeFileSync(new URL(`${path.slice(1)}.html`, dist), html)
}

const { title, description } = tr.seo.notFound
writeFileSync(new URL('404.html', dist), render({ title, description, url: null, robots: 'noindex, follow' }))

console.log(`postbuild: yapılandırılmış veri + ${PAGES.length} sayfa + 404.html yazıldı`)
