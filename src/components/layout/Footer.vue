<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-cmd">
        <span class="f-dollar">$</span><span class="f-kw">echo</span>
        <span class="f-str">"&copy; {{ currentYear }} {{ t('footer.copyright') }}"</span>
      </p>
      <nav class="footer-flags" aria-label="Social links">
        <a
          href="https://github.com/ahmetesreff"
          target="_blank"
          rel="noopener noreferrer"
          class="tw-flag"
          aria-label="GitHub"
        >--github</a>
        <a
          href="https://www.linkedin.com/in/ahmetesrefkarabulut/"
          target="_blank"
          rel="noopener noreferrer"
          class="tw-flag"
          aria-label="LinkedIn"
        >--linkedin</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: var(--tw-bar);
  border-top: 1px solid var(--tw-edge);
  padding: 20px var(--spacing-md);
  margin-top: auto;
  font-family: var(--tw-mono);
}

.footer-inner {
  max-width: var(--max-width-wide);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-cmd {
  margin: 0;
  font-size: 12.5px;
  color: var(--tw-fg);
}

.f-dollar { color: var(--tw-green); margin-right: 8px; font-weight: 600; }
.f-kw { color: var(--tw-amber); margin-right: 6px; }
.f-str { color: var(--tw-dim); }

.footer-flags {
  display: flex;
  gap: 18px;
}

@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
