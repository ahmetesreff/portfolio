<template>
  <div class="tw-page">
    <TerminalWindow path="~/tools" class="tools-window">
      <p class="tw-line">
        <span class="tw-usr">aek@portfolio</span><span class="tw-sep">:</span><span class="tw-cwd">~/tools</span><span class="tw-dollar">$</span><span class="tw-kw">ls</span> <span class="tw-arg">./bin</span>
      </p>
      <div class="tools-head">
        <h1 class="tw-heading">{{ t('tools.title') }}</h1>
        <p class="tw-out">{{ t('tools.subtitle') }}</p>
        <p class="tools-note">{{ t('tools.privacy') }}</p>
      </div>

      <div class="tools-grid">
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 0 }">
          <IpChecker />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 40 }">
          <DnsLookup />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 80 }">
          <JwtDecoder />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 120 }">
          <JsonTool />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 160 }">
          <TimestampConverter />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 200 }">
          <CronExplainer />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 240 }">
          <PasswordGenerator />
        </div>
        <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 280 }">
          <QrGenerator />
        </div>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import TerminalWindow from '../components/TerminalWindow.vue'
import IpChecker from '../components/tools/IpChecker.vue'
import DnsLookup from '../components/tools/DnsLookup.vue'
import JwtDecoder from '../components/tools/JwtDecoder.vue'
import JsonTool from '../components/tools/JsonTool.vue'
import TimestampConverter from '../components/tools/TimestampConverter.vue'
import CronExplainer from '../components/tools/CronExplainer.vue'
import PasswordGenerator from '../components/tools/PasswordGenerator.vue'
import QrGenerator from '../components/tools/QrGenerator.vue'

const { t } = useI18n()
</script>

<style scoped>
.tools-window {
  max-width: 1080px;
}

.tools-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tools-note {
  margin: 0;
  font-size: 13px;
  color: var(--tw-dim);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));   /* masaüstünde 2 geniş sütun */
  gap: 18px;

  /* Remap the site design tokens to the terminal palette for the
     whole tools subtree. Custom properties inherit into the child
     tool components, so every tool adopts the theme without per-rule
     overrides. */
  --color-secondary: var(--tw-green);
  --color-hover: var(--tw-green-soft);
  --color-accent: var(--tw-stack-bg);
  --color-primary: var(--tw-fg);
  --color-background: var(--tw-bg);
  --color-surface: var(--tw-bg);
  --color-border: var(--tw-edge);
  --color-text: var(--tw-fg);
  --color-text-secondary: var(--tw-dim);
  --border-radius: 6px;
  --border-radius-sm: 4px;
}

.tool-card {
  position: relative;
  background: var(--tw-bg);
  border: 1px solid var(--tw-edge);
  border-radius: 6px;
  padding: 22px 20px 20px;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  font-family: var(--tw-mono);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--tw-green),
    var(--tw-amber)
  );
  opacity: 0.5;
  border-radius: 6px 6px 0 0;
  transition: opacity 0.2s ease;
}

.tool-card:hover {
  border-color: var(--tw-green);
  box-shadow: 0 0 26px -10px var(--tw-green);
}

.tool-card:hover::before {
  opacity: 1;
}

/* Make the tool internals feel terminal-native */
.tool-card :deep(.tool) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-card :deep(.tool-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-card :deep(.tool-header h2) {   /* sayfa h1'inin altında doğru başlık sırası için h2 */
  font-family: var(--tw-mono);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.14286;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.tool-card :deep(.tool-icon) {
  border: 1px solid var(--tw-edge);
}

.tool-card :deep(input),
.tool-card :deep(textarea) {
  font-family: var(--tw-mono);
}

/* Dolgulu düğmede yazı zemin renginde: karanlık temada parlak yeşil üstünde beyaz 1,9:1 kalıyordu */
.tool-card :deep(.tool-btn:not(.secondary)) {
  color: var(--tw-bg);
}

.tool-card :deep(.tool-btn) {
  font-family: var(--tw-mono);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    padding: 18px 16px;
    min-height: 0;   /* tek sütunda eşit yükseklik gerekmiyor; kısa kartlarda boşluk bırakıyordu */
  }
}
</style>
