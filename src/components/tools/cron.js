// Standart 5 alanlı cron ifadesi için sonraki çalışma zamanlarını hesaplar
// (dakika saat ayın-günü ay haftanın-günü). Yerel saat dilimini kullanır.

export const MACROS = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *'
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const FIELDS = [
  { min: 0, max: 59 },                       // dakika
  { min: 0, max: 23 },                       // saat
  { min: 1, max: 31 },                       // ayın günü
  { min: 1, max: 12, names: MONTHS, base: 1 }, // ay
  { min: 0, max: 7, names: DAYS, base: 0 }     // haftanın günü (7 = Pazar)
]

const toNumber = (token, field) => {
  if (/^\d+$/.test(token)) return Number(token)
  const i = field.names ? field.names.indexOf(token.toUpperCase()) : -1
  return i === -1 ? null : i + field.base
}

const parseField = (text, field) => {
  const values = new Set()
  for (const part of text.split(',')) {
    const m = part.match(/^(\*|\?|([A-Za-z0-9]+)(?:-([A-Za-z0-9]+))?)(?:\/(\d+))?$/)
    if (!m) return null
    const step = m[4] ? Number(m[4]) : 1
    let lo, hi
    if (m[1] === '*' || m[1] === '?') {
      lo = field.min
      hi = field.max
    } else {
      lo = toNumber(m[2], field)
      hi = m[3] !== undefined ? toNumber(m[3], field) : (m[4] ? field.max : lo)
    }
    if (lo === null || hi === null || lo < field.min || hi > field.max || lo > hi || step < 1) return null
    for (let v = lo; v <= hi; v += step) values.add(v)
  }
  return values
}

// 5 alan geçerliyse { minute, hour, dom, month, dow, domStar, dowStar }, değilse null
export const parseCron = (expression) => {
  const parts = expression.trim().split(/\s+/)
  if (parts.length !== 5) return null
  const sets = parts.map((p, i) => parseField(p, FIELDS[i]))
  if (sets.some(s => s === null)) return null
  const [minute, hour, dom, month, dowRaw] = sets
  const dow = new Set([...dowRaw].map(d => d % 7))
  return {
    minute, hour, dom, month, dow,
    // Vixie cron: alan "*" ile başlıyorsa kısıtsız sayılır
    domStar: /^[*?]/.test(parts[2]),
    dowStar: /^[*?]/.test(parts[4])
  }
}

const dayMatches = (c, d) => {
  const domOk = c.dom.has(d.getDate())
  const dowOk = c.dow.has(d.getDay())
  if (c.domStar && c.dowStar) return true
  if (c.domStar) return dowOk
  if (c.dowStar) return domOk
  return domOk || dowOk   // ikisi de kısıtlıysa biri yeter
}

export const nextRuns = (cron, count = 5, from = new Date()) => {
  const out = []
  const d = new Date(from)
  d.setSeconds(0, 0)
  d.setMinutes(d.getMinutes() + 1)
  const limit = from.getTime() + 5 * 366 * 86400000   // en fazla 5 yıl ileri bak

  while (out.length < count && d.getTime() <= limit) {
    if (!cron.month.has(d.getMonth() + 1)) {
      d.setMonth(d.getMonth() + 1, 1)
      d.setHours(0, 0, 0, 0)
    } else if (!dayMatches(cron, d)) {
      d.setDate(d.getDate() + 1)
      d.setHours(0, 0, 0, 0)
    } else if (!cron.hour.has(d.getHours())) {
      d.setHours(d.getHours() + 1, 0, 0, 0)
    } else if (!cron.minute.has(d.getMinutes())) {
      d.setMinutes(d.getMinutes() + 1, 0, 0)
    } else {
      out.push(new Date(d))
      d.setMinutes(d.getMinutes() + 1, 0, 0)
    }
  }
  return out
}
