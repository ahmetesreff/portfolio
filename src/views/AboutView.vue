<template>
  <div class="tw-page">
    <TerminalWindow path="~/about">
      <p class="tw-line">
        <span class="tw-usr">aek@portfolio</span><span class="tw-sep">:</span><span class="tw-cwd">~/about</span><span class="tw-dollar">$</span><span class="tw-kw">whoami</span> --verbose
      </p>
      <h1 class="tw-heading">{{ t('about.title') }}</h1>
      <AboutText />
      <TechStack />
    </TerminalWindow>
  </div>
</template>

<script setup>
import TerminalWindow from '../components/TerminalWindow.vue'
import AboutText from '../components/about/AboutText.vue'
import TechStack from '../components/about/TechStack.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
