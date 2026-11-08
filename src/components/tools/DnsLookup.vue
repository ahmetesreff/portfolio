<template>
  <div class="tool dns-lookup">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="7" rx="1.5"/>
          <rect x="3" y="14" width="18" height="7" rx="1.5"/>
          <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>
        </svg>
      </div>
      <h2>{{ t('tools.dns.title') }}</h2>
    </div>

    <form class="tool-content" @submit.prevent="lookup">
      <label class="sr-only" for="dns-input">{{ t('tools.dns.domain') }}</label>
      <input
        id="dns-input"
        v-model="domain"
        class="tool-input"
        :placeholder="t('tools.dns.placeholder')"
        inputmode="url"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
      />

      <div class="tool-row dns-types" role="group" :aria-label="t('tools.dns.type')">
        <button
          v-for="ty in TYPES"
          :key="ty"
          type="button"
          class="dns-chip"
          :aria-pressed="type === ty"
          @click="type = ty"
        >{{ ty === 'ALL' ? t('tools.dns.all') : ty }}</button>
      </div>

      <button type="submit" class="tool-btn" :disabled="loading || !domain.trim()">
        {{ loading ? t('tools.loading') : t('tools.dns.lookup') }}
      </button>

      <p v-if="error" class="tool-error" role="alert">{{ error }}</p>

      <template v-else-if="records">
        <ul v-if="records.length" class="dns-list">
          <li v-for="(r, i) in records" :key="i" class="dns-rec">
            <span class="dns-type">{{ r.type }}</span>
            <span class="dns-data">{{ r.data }}</span>
            <span class="dns-ttl">TTL {{ r.ttl }}</span>
          </li>
        </ul>
        <p v-else class="tool-hint">{{ t('tools.dns.empty') }}</p>
        <p class="tool-hint">{{ t('tools.dns.via') }}: {{ resolver }} · {{ elapsed }} ms</p>
      </template>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'ALL']
const ALL_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT']
const TYPE_NAMES = { 1: 'A', 2: 'NS', 5: 'CNAME', 6: 'SOA', 15: 'MX', 16: 'TXT', 28: 'AAAA', 33: 'SRV', 46: 'RRSIG', 65: 'HTTPS', 257: 'CAA' }

// DNS-over-HTTPS (JSON) çözümleyiciler; ikisi de tarayıcıdan CORS ile çağrılabiliyor
const RESOLVERS = [
  {
    name: 'Cloudflare 1.1.1.1',
    url: (n, ty) => `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(n)}&type=${ty}`,
    headers: { accept: 'application/dns-json' }
  },
  {
    name: 'Google 8.8.8.8',
    url: (n, ty) => `https://dns.google/resolve?name=${encodeURIComponent(n)}&type=${ty}`,
    headers: {}
  }
]

const domain = ref('')
const type = ref('A')
const loading = ref(false)
const error = ref('')
const records = ref(null)
const resolver = ref('')
const elapsed = ref(0)

// "https://Örnek.com.tr/yol" → "xn--rnek-...com.tr"
const normalize = (raw) => {
  let s = raw.trim().toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
    .split(/[/?#]/)[0]
    .replace(/:\d+$/, '')
    .replace(/\.$/, '')
  try {
    s = new URL(`http://${s}`).hostname
  } catch {
    return null
  }
  const label = /^[a-z0-9_]([a-z0-9_-]{0,61}[a-z0-9_])?$/
  const parts = s.split('.')
  if (s.length > 253 || parts.length < 2 || !parts.every(p => label.test(p))) return null
  if (/^\d+$/.test(parts[parts.length - 1])) return null   // IP adresi değil, alan adı
  return s
}

const query = async (name, ty) => {
  for (const r of RESOLVERS) {
    try {
      const res = await fetch(r.url(name, ty), { headers: r.headers })
      if (!res.ok) continue
      return { resolver: r.name, json: await res.json() }
    } catch {
      // sıradaki çözümleyiciyi dene
    }
  }
  throw new Error('dns')
}

// TXT: '"v=spf1 ..." "~all"' → 'v=spf1 ...~all'
const cleanData = (typeName, data) => {
  if (typeName !== 'TXT') return data
  const chunks = data.match(/"((?:[^"\\]|\\.)*)"/g)
  return chunks ? chunks.map(c => c.slice(1, -1)).join('') : data
}

const lookup = async () => {
  const name = normalize(domain.value)
  error.value = ''
  records.value = null
  if (!name) {
    error.value = t('tools.dns.invalid')
    return
  }

  loading.value = true
  const started = performance.now()
  try {
    const types = type.value === 'ALL' ? ALL_TYPES : [type.value]
    const results = await Promise.all(types.map(ty => query(name, ty)))
    elapsed.value = Math.round(performance.now() - started)
    resolver.value = results[0].resolver

    const status = results[0].json.Status
    if (status === 3) { error.value = t('tools.dns.nxdomain'); return }
    if (status === 2) { error.value = t('tools.dns.servfail'); return }
    if (status !== 0) { error.value = `${t('tools.dns.failed')} (RCODE ${status})`; return }

    const seen = new Set()
    const list = []
    for (const { json } of results) {
      for (const a of json.Answer || []) {
        const typeName = TYPE_NAMES[a.type] || `TYPE${a.type}`
        if (typeName === 'RRSIG') continue
        const data = cleanData(typeName, a.data)
        const key = `${typeName} ${data}`
        if (seen.has(key)) continue   // "Tümü"nde CNAME zinciri tekrar etmesin
        seen.add(key)
        list.push({ type: typeName, data, ttl: a.TTL })
      }
    }
    records.value = list
  } catch {
    error.value = t('tools.dns.failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.dns-types {
  gap: 6px;
}

.dns-chip {
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background: var(--color-accent);
  color: var(--color-primary);
  font-family: var(--tw-mono, monospace);
  font-size: 12px;
  cursor: pointer;
}

.dns-chip:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.dns-chip[aria-pressed='true'] {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--tw-bg);
}

.dns-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
}

.dns-rec {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: baseline;
  padding: 7px 10px;
  font-size: 13px;
  border-bottom: 1px solid var(--color-border);
}

.dns-rec:last-child {
  border-bottom: 0;
}

.dns-type {
  color: var(--color-secondary);
  font-weight: 600;
}

.dns-data {
  color: var(--color-primary);
  overflow-wrap: anywhere;
  user-select: all;
}

.dns-ttl {
  color: var(--color-text-secondary);
  font-size: 11px;
  white-space: nowrap;
}

/* Dar ekranda TTL değerin altına: IPv6 ve MX değerleri bölünmesin */
@media (max-width: 480px) {
  .dns-rec {
    grid-template-columns: 44px minmax(0, 1fr);
    row-gap: 2px;
  }

  .dns-ttl {
    grid-column: 2;
  }
}
</style>
