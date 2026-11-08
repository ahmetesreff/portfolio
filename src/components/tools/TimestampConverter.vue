<template>
  <div class="tool timestamp-converter">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3 2"/>
        </svg>
      </div>
      <h2>{{ t('tools.timestamp.title') }}</h2>
    </div>

    <div class="tool-content">
      <div class="tool-row ts-row">
        <label class="sr-only" for="ts-input">{{ t('tools.timestamp.title') }}</label>
        <input
          id="ts-input"
          v-model="input"
          class="tool-input ts-input"
          :placeholder="t('tools.timestamp.placeholder')"
          spellcheck="false"
          autocomplete="off"
        />
        <button type="button" class="tool-btn secondary ts-now" @click="setNow">{{ t('tools.timestamp.now') }}</button>
      </div>

      <p class="tool-hint">
        {{ t('tools.timestamp.current') }}: <span class="ts-live">{{ Math.floor(now / 1000) }}</span>
      </p>

      <p v-if="result.error" class="tool-error" role="alert">{{ t('tools.timestamp.invalid') }}</p>

      <template v-else-if="result.date">
        <dl class="kv">
          <dt>{{ t('tools.timestamp.seconds') }}</dt>
          <dd>{{ Math.floor(result.date.getTime() / 1000) }}</dd>
          <dt>{{ t('tools.timestamp.millis') }}</dt>
          <dd>{{ result.date.getTime() }}</dd>
          <dt>{{ t('tools.timestamp.iso') }}</dt>
          <dd>{{ result.date.toISOString() }}</dd>
          <dt>{{ t('tools.timestamp.local') }}</dt>
          <dd>{{ formatLocal(result.date, locale) }} <span class="ts-tz">({{ tz }})</span></dd>
          <dt>{{ t('tools.timestamp.relative') }}</dt>
          <dd>{{ formatRelative(result.date, locale, now) }}</dd>
        </dl>
        <p v-if="result.unit === 'ms'" class="tool-hint">{{ t('tools.timestamp.detectedMs') }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatLocal, formatRelative, localTimeZone } from './time.js'

const { t, locale } = useI18n()

const now = ref(Date.now())
const input = ref(String(Math.floor(now.value / 1000)))
const tz = localTimeZone()

let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(timer))

const setNow = () => { input.value = String(Math.floor(Date.now() / 1000)) }

const valid = (date) => (isNaN(date.getTime()) ? { error: true } : { date })

const parse = (raw) => {
  const s = raw.trim()
  if (!s) return {}

  // Sayı: 1e11 ve üstü milisaniye (saniye olsaydı 5138 yılı olurdu)
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    const n = Number(s)
    const isMs = Math.abs(n) >= 1e11
    return { ...valid(new Date(isMs ? n : n * 1000)), unit: isMs ? 'ms' : 's' }
  }

  // Türkçe biçim: 08.11.2026 [14:30[:05]] (yerel saat)
  const tr = s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})(?:[ T,]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/)
  if (tr) {
    const [, d, mo, y, h = 0, mi = 0, se = 0] = tr
    const date = new Date(+y, +mo - 1, +d, +h, +mi, +se)
    // 31.02.2026 gibi taşan tarihleri reddet
    if (date.getDate() !== +d || date.getMonth() !== +mo - 1) return { error: true }
    return valid(date)
  }

  // ISO ve benzeri; yalnız tarih (2026-11-08) UTC değil yerel gece yarısı sayılsın
  let iso = s
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) iso += 'T00:00'
  iso = iso.replace(/^(\d{4}-\d{2}-\d{2}) (\d)/, '$1T$2')
  return valid(new Date(iso))
}

const result = computed(() => parse(input.value))
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.ts-row {
  flex-wrap: nowrap;
}

.ts-input {
  flex: 1;
  min-width: 0;
}

.ts-now {
  flex: 0 0 auto;
  min-width: 0;
}

.ts-live {
  color: var(--color-secondary);
  font-variant-numeric: tabular-nums;
}

.ts-tz {
  color: var(--color-text-secondary);
}
</style>
