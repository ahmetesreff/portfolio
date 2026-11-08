<template>
  <div class="tool jwt-decoder">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7.5" cy="15.5" r="4.5"/>
          <path d="M10.7 12.3 21 2"/>
          <path d="m16 7 3 3"/>
          <path d="m19 4 2 2"/>
        </svg>
      </div>
      <h2>{{ t('tools.jwt.title') }}</h2>
    </div>

    <div class="tool-content">
      <label class="sr-only" for="jwt-input">{{ t('tools.jwt.title') }}</label>
      <textarea
        id="jwt-input"
        v-model="input"
        class="tool-input jwt-input"
        :placeholder="t('tools.jwt.placeholder')"
        spellcheck="false"
        autocomplete="off"
      ></textarea>

      <div class="tool-row">
        <button type="button" class="tool-link" @click="loadSample">{{ t('tools.jwt.sample') }}</button>
      </div>

      <p v-if="decoded.error" class="tool-error" role="alert">{{ decoded.error }}</p>

      <template v-else-if="decoded.ok">
        <p class="jwt-status" :class="status.cls">{{ status.text }}</p>

        <dl v-if="timeClaims.length" class="kv">
          <template v-for="c in timeClaims" :key="c.key">
            <dt>{{ t(`tools.jwt.claims.${c.key}`) }}</dt>
            <dd>{{ c.local }} <span class="jwt-rel">· {{ c.relative }}</span></dd>
          </template>
        </dl>

        <p class="tool-label">Header</p>
        <pre class="tool-output">{{ decoded.headerText }}</pre>
        <p class="tool-label">Payload</p>
        <pre class="tool-output">{{ decoded.payloadText }}</pre>
        <p v-if="decoded.header.alg === 'none'" class="tool-hint">{{ t('tools.jwt.algNone') }}</p>
      </template>

      <p class="tool-hint">{{ t('tools.jwt.note') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatLocal, formatRelative } from './time.js'

const { t, locale } = useI18n()

const input = ref('')
const now = ref(Date.now())
let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 15000) })
onUnmounted(() => clearInterval(timer))

const b64urlDecode = (segment) => {
  let b64 = segment.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  const bytes = Uint8Array.from(atob(b64), ch => ch.charCodeAt(0))
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

const b64urlEncode = (text) => {
  const bytes = new TextEncoder().encode(text)
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const decodePart = (segment, name) => {
  try {
    const value = JSON.parse(b64urlDecode(segment))
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error()
    return value
  } catch {
    throw new Error(t('tools.jwt.badPart', { part: name }))
  }
}

const decoded = computed(() => {
  // "Bearer ..." önekini ve kopyalarken araya giren boşlukları temizle
  const token = input.value.trim().replace(/^bearer\s+/i, '').replace(/\s+/g, '')
  if (!token) return { ok: false }
  const parts = token.split('.')
  if (parts.length === 5) return { ok: false, error: t('tools.jwt.jwe') }
  if (parts.length !== 3) return { ok: false, error: t('tools.jwt.notJwt') }
  try {
    const header = decodePart(parts[0], 'Header')
    const payload = decodePart(parts[1], 'Payload')
    return {
      ok: true,
      header,
      payload,
      headerText: JSON.stringify(header, null, 2),
      payloadText: JSON.stringify(payload, null, 2)
    }
  } catch (e) {
    return { ok: false, error: e.message }
  }
})

const claimDate = (key) => {
  const v = decoded.value.payload?.[key]
  return typeof v === 'number' && Number.isFinite(v) ? new Date(v * 1000) : null
}

const timeClaims = computed(() => {
  if (!decoded.value.ok) return []
  return ['exp', 'iat', 'nbf']
    .map(key => ({ key, date: claimDate(key) }))
    .filter(c => c.date && !isNaN(c.date))
    .map(c => ({
      key: c.key,
      local: formatLocal(c.date, locale.value),
      relative: formatRelative(c.date, locale.value, now.value)
    }))
})

const status = computed(() => {
  const exp = claimDate('exp')
  const nbf = claimDate('nbf')
  const rel = (d) => formatRelative(d, locale.value, now.value)
  if (nbf && nbf.getTime() > now.value) return { cls: 'is-warn', text: t('tools.jwt.notYet', { rel: rel(nbf) }) }
  if (!exp) return { cls: 'is-warn', text: t('tools.jwt.noExp') }
  if (exp.getTime() <= now.value) return { cls: 'is-bad', text: t('tools.jwt.expired', { rel: rel(exp) }) }
  return { cls: 'is-good', text: t('tools.jwt.valid', { rel: rel(exp) }) }
})

// Örnek: şu an üretilmiş, 1 saat geçerli bir token (imza temsili; doğrulanmaz)
const loadSample = () => {
  const iat = Math.floor(Date.now() / 1000)
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = { sub: '42', name: 'Ahmet Eşref Karabulut', role: 'admin', iat, exp: iat + 3600 }
  input.value = [
    b64urlEncode(JSON.stringify(header)),
    b64urlEncode(JSON.stringify(payload)),
    'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  ].join('.')
  now.value = Date.now()
}
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.jwt-input {
  min-height: 92px;
  word-break: break-all;
}

.jwt-status {
  margin: 0;
  padding: 8px 10px;
  border-radius: var(--border-radius-sm);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid currentColor;
}

.jwt-status.is-good { color: var(--color-secondary); background: var(--color-accent); }
.jwt-status.is-bad { color: #d93025; background: rgba(229, 72, 77, 0.08); }
.jwt-status.is-warn { color: var(--tw-amber, #b26b00); background: rgba(230, 164, 23, 0.08); }

.jwt-rel {
  color: var(--color-text-secondary);
}
</style>
