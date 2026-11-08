// Statik sitenin önündeki tek iş: tek bir kanonik adres.
//   http://…  ve  www.…  →  301  https://ahmetesrefkarabulut.com.tr/… (yol ve sorgu korunur)
// Bölge genelindeki "Always Use HTTPS" bilerek kapalı: aynı bölgedeki sunucu alt alanlarının
// (valteris, nobetci) certbot http-01 yenilemesini bozabilir. Yönlendirme bu yüzden burada.
// Geri kalan her şey statik dosyalar (dist/); 404 ve _headers kuralları ASSETS tarafından uygulanır.
const HOST = 'ahmetesrefkarabulut.com.tr'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.protocol !== 'https:' || url.hostname !== HOST || url.port !== '') {
      url.protocol = 'https:'
      url.hostname = HOST
      url.port = ''
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  }
}
