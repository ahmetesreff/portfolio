<template>
  <div class="tool ip-checker">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </div>
      <h3>{{ t('tools.ipChecker.title') }}</h3>
    </div>

    <div class="tool-content">
      <div v-if="loading" class="loading">
        <span class="spinner"></span>
        {{ t('tools.loading') }}
      </div>

      <div v-else-if="ipData" class="ip-result">
        <div class="ip-main">
          <span class="label">{{ t('tools.ipChecker.yourIp') }}</span>
          <span class="ip-address">{{ ipData.ip }}</span>
        </div>

        <div class="ip-details" v-if="ipData.city">
          <div class="detail-row">
            <span class="detail-label">{{ t('tools.ipChecker.location') }}</span>
            <span class="detail-value">{{ ipData.city }}, {{ ipData.country }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t('tools.ipChecker.isp') }}</span>
            <span class="detail-value">{{ ipData.org || 'N/A' }}</span>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <button @click="checkIp" class="tool-btn" :disabled="loading">
        {{ t('tools.ipChecker.refresh') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const ipData = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchFromIpapi = async () => {
  const response = await fetch('https://ipapi.co/json/')
  if (!response.ok) throw new Error('API error')
  const data = await response.json()
  if (data.error) throw new Error('API error')
  return {
    ip: data.ip,
    city: data.city,
    country: data.country_name,
    org: data.org || 'N/A'
  }
}

const fetchFromIpwho = async () => {
  const response = await fetch('https://ipwho.is/')
  if (!response.ok) throw new Error('API error')
  const data = await response.json()
  if (data.success === false) throw new Error('API error')
  return {
    ip: data.ip,
    city: data.city,
    country: data.country,
    org: data.connection?.isp || data.connection?.org || 'N/A'
  }
}

const checkIp = async () => {
  loading.value = true
  error.value = null

  try {
    ipData.value = await fetchFromIpapi()
  } catch {
    try {
      ipData.value = await fetchFromIpwho()
    } catch {
      error.value = t('tools.error')
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  checkIp()
})
</script>

<style scoped>
.tool-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary);
}

.tool-header h3 {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin: 0;
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.loading {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-secondary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ip-result {
  background: var(--color-background);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-md);
}

.ip-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.ip-main .label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  min-height: 20px;
}

.ip-address {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  font-family: 'Monaco', 'Menlo', monospace;
}

.ip-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  gap: var(--spacing-sm);
}

.detail-label {
  color: var(--color-text-secondary);
  min-width: 130px;
  flex-shrink: 0;
}

.detail-value {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  text-align: right;
  word-break: break-word;
}

.error {
  color: #f44336;
  font-size: var(--font-size-sm);
}

.tool-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.tool-btn:hover {
  opacity: 0.9;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
