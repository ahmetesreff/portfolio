<template>
  <div class="contact-info">
    <p class="tw-line">
      <span class="tw-usr">aek@portfolio</span><span class="tw-sep">:</span><span class="tw-cwd">~/contact</span><span class="tw-dollar">$</span><span class="tw-kw">./contact.sh</span>
    </p>
    <h1 class="tw-heading">{{ t('contact.title') }}</h1>
    <p class="tw-out">{{ t('contact.subtitle') }}</p>

    <div class="c-rows">
      <div class="c-row">
        <span class="c-key">{{ t('contact.email') }}</span>
        <a class="tw-flag c-val" href="mailto:ahmetesrefkarabulut@gmail.com">
          ahmetesrefkarabulut@gmail.com
        </a>
      </div>
      <div class="c-row">
        <span class="c-key">{{ t('contact.location') }}</span>
        <span class="c-val plain">{{ t('contact.locationValue') }}</span>
      </div>
    </div>

    <p class="tw-line dim">
      <span class="tw-dollar">$</span><span class="tw-kw">ls</span> <span class="tw-arg">./social</span>
    </p>
    <nav class="c-flags" :aria-label="t('contact.social')">
      <a
        v-for="link in socialLinks"
        :key="link.flag"
        :href="link.url"
        :aria-label="link.label"
        target="_blank"
        rel="noopener noreferrer"
        class="tw-flag"
      >--{{ link.flag }}</a>
    </nav>

    <div class="c-cta">
      <a class="tw-btn" href="mailto:ahmetesrefkarabulut@gmail.com">
        <span class="glyph" aria-hidden="true">▸</span>
        {{ t('profile.contactButton') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socialLinks = [
  { flag: 'github', label: 'GitHub', url: 'https://github.com/ahmetesreff' },
  { flag: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmetesrefkarabulut/' },
  { flag: 'email', label: 'Email', url: 'mailto:ahmetesrefkarabulut@gmail.com' }
]
</script>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.c-rows {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  border-left: 1px solid var(--tw-line);
}

.c-row {
  display: flex;
  gap: 18px;
  align-items: baseline;
  padding: 9px 0;
  border-bottom: 1px dashed var(--tw-line);
}

.c-row:last-child {
  border-bottom: none;
}

.c-key {
  flex-shrink: 0;
  width: 120px;
  font-size: 12.5px;
  color: var(--tw-green);
}

.c-val {
  font-size: 14px;
  word-break: break-word;
}

.c-val.plain {
  color: var(--tw-fg);
}

.c-flags {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  padding-left: 16px;
}

.c-cta {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 6px;
}

@media (max-width: 600px) {
  .c-row {
    flex-direction: column;
    gap: 3px;
  }

  .c-key {
    width: auto;
  }
}
</style>
