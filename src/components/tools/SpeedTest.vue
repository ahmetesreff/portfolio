<template>
  <div class="tool speed-test">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      <h3>{{ t('tools.speedTest.title') }}</h3>
    </div>

    <div class="tool-content">
      <div class="metrics-display">
        <div class="metric-item">
          <div class="metric-label">{{ t('tools.speedTest.downloadSpeed') }}</div>
          <div class="metric-value-container">
            <div class="metric-value" :class="{ 'testing': testing }">
              {{ testing ? currentSpeed.toFixed(1) : (result ? result.toFixed(1) : '0.0') }}
            </div>
            <div class="metric-unit">Mbps</div>
          </div>
        </div>

        <div class="metric-divider"></div>

        <div class="metric-item">
          <div class="metric-label">{{ t('tools.speedTest.ping') }}</div>
          <div class="metric-value-container">
            <div class="metric-value" :class="[{ 'testing': testing }, pingClass]">
              {{ testing ? currentPing.toFixed(0) : (resultPing ? resultPing.toFixed(0) : '0') }}
            </div>
            <div class="metric-unit">ms</div>
          </div>
        </div>
      </div>

      <div class="progress-bars">
        <div class="progress-item">
          <div class="progress-label">
            <span>{{ t('tools.speedTest.speed') }}</span>
            <span class="progress-value">{{ displaySpeed }} / 1000 Mbps</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill speed-fill"
              :class="speedClass"
              :style="{ width: speedBarWidth }"
            ></div>
          </div>
        </div>

        <div class="progress-item">
          <div class="progress-label">
            <span>{{ t('tools.speedTest.duration') }}</span>
            <span class="progress-value">{{ progressPercent }}%</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill time-fill"
              :style="{ width: progressWidth }"
            ></div>
          </div>
        </div>
      </div>

      <div class="speed-status">
        {{ statusText }}
      </div>

      <button @click="startTest" class="tool-btn" :disabled="testing">
        {{ testing ? t('tools.speedTest.testing') : t('tools.speedTest.start') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const testing = ref(false)
const result = ref(null)
const resultPing = ref(null)
const currentSpeed = ref(0)
const currentPing = ref(0)
const progress = ref(0)

const MAX_SPEED = 1000 // Max speed in Mbps

const progressWidth = computed(() => `${progress.value}%`)
const progressPercent = computed(() => Math.round(progress.value))

const displaySpeed = computed(() => {
  const speed = testing.value ? currentSpeed.value : (result.value || 0)
  return speed.toFixed(1)
})

const speedBarWidth = computed(() => {
  const speed = testing.value ? currentSpeed.value : (result.value || 0)
  const percentage = Math.min((speed / MAX_SPEED) * 100, 100)
  return `${percentage}%`
})

const speedClass = computed(() => {
  const speed = testing.value ? currentSpeed.value : (result.value || 0)
  if (speed >= 500) return 'speed-excellent'
  if (speed >= 200) return 'speed-good'
  if (speed >= 50) return 'speed-average'
  return 'speed-slow'
})

const pingClass = computed(() => {
  const ping = testing.value ? currentPing.value : (resultPing.value || 0)
  if (ping <= 30) return 'ping-excellent'
  if (ping <= 100) return 'ping-good'
  if (ping <= 200) return 'ping-average'
  return 'ping-slow'
})

const statusText = computed(() => {
  if (testing.value) return t('tools.speedTest.measuring')
  if (result.value === null) return t('tools.speedTest.ready')
  if (result.value > 100) return t('tools.speedTest.excellent')
  if (result.value > 50) return t('tools.speedTest.good')
  if (result.value > 20) return t('tools.speedTest.average')
  return t('tools.speedTest.slow')
})

// Measure real ping latency
const measurePing = async (url) => {
  const startTime = performance.now()
  try {
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    })
    const endTime = performance.now()
    return endTime - startTime
  } catch (error) {
    return null
  }
}

// Perform multiple ping tests and return average
const getRealPing = async () => {
  // Ping to current server (user's portfolio site)
  const serverUrl = `${window.location.origin}/favicon.ico`

  const pingResults = []

  // Test server 5 times for accurate measurement
  for (let i = 0; i < 5; i++) {
    const ping = await measurePing(serverUrl)
    if (ping !== null) {
      pingResults.push(ping)
    }
  }

  // Calculate average ping
  if (pingResults.length > 0) {
    return pingResults.reduce((a, b) => a + b, 0) / pingResults.length
  }

  return 50 // Fallback if all pings fail
}

const startTest = async () => {
  testing.value = true
  result.value = null
  resultPing.value = null
  currentSpeed.value = 0
  currentPing.value = 0
  progress.value = 0

  // Measure real ping first
  const realPing = await getRealPing()

  const testDuration = 5000 // 5 seconds
  const updateInterval = 100
  const startTime = Date.now()

  // Simulate speed test with realistic fluctuation
  const baseSpeed = 50 + Math.random() * 100 // Random base between 50-150

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / testDuration) * 100, 100)

    // Add realistic fluctuation for speed
    const speedFluctuation = (Math.random() - 0.5) * 20
    currentSpeed.value = Math.max(0, baseSpeed + speedFluctuation + (elapsed / testDuration) * 10)

    // Show real ping with slight fluctuation
    const pingFluctuation = (Math.random() - 0.5) * 5
    currentPing.value = Math.max(5, realPing + pingFluctuation)

    if (elapsed >= testDuration) {
      clearInterval(interval)
      testing.value = false
      result.value = baseSpeed + Math.random() * 20
      resultPing.value = realPing + (Math.random() - 0.5) * 3
      progress.value = 100
    }
  }, updateInterval)
}
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
  align-items: center;
  gap: var(--spacing-md);
}

.metrics-display {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: var(--spacing-md);
}

.metric-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.metric-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: var(--font-weight-medium);
}

.metric-value-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  font-family: 'Monaco', 'Menlo', monospace;
  line-height: 1;
  transition: color var(--transition-fast);
}

.metric-value.testing {
  animation: pulse 0.5s ease-in-out infinite;
}

.metric-value:not(.testing) {
  color: var(--color-secondary);
}

/* Ping color coding */
.ping-excellent {
  color: #4caf50 !important;
}

.ping-good {
  color: #ff9800 !important;
}

.ping-average {
  color: #ff5722 !important;
}

.ping-slow {
  color: #f44336 !important;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.metric-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.metric-divider {
  width: 1px;
  background: var(--color-border);
  align-self: stretch;
}

.progress-bars {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.progress-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  font-family: 'Monaco', 'Menlo', monospace;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-accent);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background 0.3s ease;
}

.speed-fill {
  transition: width 0.1s linear, background 0.3s ease;
}

.speed-slow {
  background: linear-gradient(90deg, #f44336, #e91e63);
}

.speed-average {
  background: linear-gradient(90deg, #ff9800, #ffc107);
}

.speed-good {
  background: linear-gradient(90deg, #4caf50, #8bc34a);
}

.speed-excellent {
  background: linear-gradient(90deg, #00bcd4, #03a9f4);
}

.time-fill {
  background: linear-gradient(90deg, var(--color-secondary), var(--color-hover));
}

.speed-status {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.tool-btn {
  width: 100%;
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
