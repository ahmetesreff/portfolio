// JWT ve zaman damgası araçlarının ortak tarih yardımcıları (dile göre Intl biçimleri)

const intlLocale = (locale) => (locale === 'tr' ? 'tr-TR' : 'en-GB')

export const localTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

// "8 Kas 2026 Paz 14:30:05" gibi, ziyaretçinin kendi saat diliminde
export const formatLocal = (date, locale) =>
  new Intl.DateTimeFormat(intlLocale(locale), {
    year: 'numeric', month: 'short', day: 'numeric', weekday: 'short',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(date)

// "3 saat önce" / "2 gün sonra"
export const formatRelative = (date, locale, now = Date.now()) => {
  const diffSec = Math.round((date.getTime() - now) / 1000)
  const abs = Math.abs(diffSec)
  // Yuvarlama eşikleri (moment.js gibi): 59 dk 59 sn "60 dakika" değil "1 saat" olsun
  const steps = [
    ['second', 1, 45], ['minute', 60, 45 * 60], ['hour', 3600, 22 * 3600],
    ['day', 86400, 26 * 86400], ['month', 30 * 86400, 320 * 86400], ['year', 365 * 86400, Infinity]
  ]
  const [unit, size] = steps.find(([, , limit]) => abs < limit)
  return new Intl.RelativeTimeFormat(intlLocale(locale), { numeric: 'auto' })
    .format(Math.round(diffSec / size), unit)
}
