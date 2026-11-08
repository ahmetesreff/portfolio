<template>
  <div class="tool cron-explainer">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="17" rx="2"/>
          <path d="M3 9h18M8 2v4M16 2v4"/>
          <path d="M12 13v3l2 1"/>
        </svg>
      </div>
      <h2>{{ t('tools.cron.title') }}</h2>
    </div>

    <div class="tool-content">
      <label class="sr-only" for="cron-input">{{ t('tools.cron.label') }}</label>
      <input
        id="cron-input"
        v-model="input"
        class="tool-input cron-input"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
      />
      <p class="tool-hint">{{ t('tools.cron.fields') }}</p>

      <div class="tool-row cron-presets">
        <button
          v-for="p in PRESETS"
          :key="p"
          type="button"
          class="cron-chip"
          :aria-pressed="input.trim() === p"
          @click="input = p"
        >{{ p }}</button>
      </div>

      <p v-if="result.error" class="tool-error" role="alert">{{ t('tools.cron.invalid') }}</p>

      <template v-else-if="result.description">
        <p class="cron-desc">{{ result.description }}</p>

        <template v-if="result.runs">
          <p class="tool-label">{{ t('tools.cron.next') }} · {{ tz }}</p>
          <ol v-if="result.runs.length" class="cron-runs">
            <li v-for="r in result.runs" :key="r.getTime()">
              {{ formatLocal(r, locale) }} <span class="cron-rel">· {{ formatRelative(r, locale, now) }}</span>
            </li>
          </ol>
          <p v-else class="tool-hint">{{ t('tools.cron.none') }}</p>
        </template>
        <p v-else-if="!result.reboot" class="tool-hint">{{ t('tools.cron.onlyFive') }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import cronstrue from 'cronstrue'
import 'cronstrue/locales/tr'
import { MACROS, parseCron, nextRuns } from './cron.js'
import { formatLocal, formatRelative, localTimeZone } from './time.js'

const { t, locale } = useI18n()

const PRESETS = ['*/5 * * * *', '0 4 * * *', '0 9 * * 1-5', '30 2 1 * *', '@weekly']

const input = ref('0 4 * * *')
const now = ref(Date.now())
const tz = localTimeZone()

let timer
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 30000) })
onUnmounted(() => clearInterval(timer))

const result = computed(() => {
  const raw = input.value.trim().replace(/\s+/g, ' ')
  if (!raw) return {}
  if (raw.toLowerCase() === '@reboot') {
    return { description: t('tools.cron.reboot'), reboot: true }
  }
  const expression = MACROS[raw.toLowerCase()] || raw
  let description
  try {
    description = cronstrue.toString(expression, {
      locale: locale.value === 'tr' ? 'tr' : 'en',
      use24HourTimeFormat: true,
      throwExceptionOnParseError: true
    })
  } catch {
    return { error: true }
  }
  const parsed = parseCron(expression)
  // now'a bağlı: dakika dönünce liste kendiliğinden ilerler
  return { description, runs: parsed ? nextRuns(parsed, 5, new Date(now.value)) : null }
})
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.cron-input {
  font-size: 16px;
  letter-spacing: 0.04em;
}

.cron-presets {
  gap: 6px;
}

.cron-chip {
  padding: 5px 9px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background: var(--color-accent);
  color: var(--color-primary);
  font-family: var(--tw-mono, monospace);
  font-size: 12px;
  cursor: pointer;
}

.cron-chip:hover,
.cron-chip[aria-pressed='true'] {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.cron-desc {
  margin: 0;
  padding: 10px 12px;
  border-left: 3px solid var(--color-secondary);
  background: var(--color-accent);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
}

.cron-runs {
  margin: 0;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}

.cron-rel {
  color: var(--color-text-secondary);
}
</style>
