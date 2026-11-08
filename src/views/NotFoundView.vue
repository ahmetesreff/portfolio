<template>
  <div class="tw-page">
    <TerminalWindow path="~">
      <p class="tw-line">
        <span class="tw-usr">aek@portfolio</span><span class="tw-sep">:</span><span class="tw-cwd">~</span><span class="tw-dollar">$</span><span class="tw-kw">cd</span> <span class="tw-arg">{{ path }}</span>
      </p>
      <p class="tw-line nf-err">bash: cd: {{ path }}: {{ t('notFound.error') }}</p>
      <h1 class="tw-heading">{{ t('notFound.title') }}</h1>
      <p class="tw-out">{{ t('notFound.text') }}</p>
      <div class="nf-cta">
        <router-link to="/" class="tw-btn">
          <span class="glyph" aria-hidden="true">▸</span>
          {{ t('notFound.home') }}
        </router-link>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TerminalWindow from '../components/TerminalWindow.vue'

const { t } = useI18n()
const route = useRoute()
const path = computed(() => decodeURIComponent(route.path))
</script>

<style scoped>
.nf-err { color: var(--tw-amber); word-break: break-all; }
.nf-cta { margin-top: 8px; }
</style>
