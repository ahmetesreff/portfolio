<template>
  <div class="about-text">
    <section class="about-block">
      <p class="tw-line dim">
        <span class="tw-dollar">$</span><span class="tw-kw">cat</span> <span class="tw-arg">bio.txt</span>
      </p>
      <div class="tw-out bio">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
        <p>{{ t('about.p4') }}</p>
      </div>
    </section>

    <section class="about-block">
      <p class="tw-line dim">
        <span class="tw-dollar">$</span><span class="tw-kw">cat</span> <span class="tw-arg">expertise.md</span>
      </p>
      <div class="exp-grid">
        <div v-for="cat in expertise" :key="cat.key" class="exp-cat">
          <h3 class="exp-cat-title">
            <span class="exp-arrow">▸</span>{{ t(`about.expertise.${cat.key}.title`) }}
          </h3>
          <ul class="exp-list">
            <li v-for="i in cat.items" :key="i">
              {{ t(`about.expertise.${cat.key}.i${i}`) }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="about-block">
      <p class="tw-line dim">
        <span class="tw-dollar">$</span><span class="tw-kw">cat</span> <span class="tw-arg">experience.log</span>
      </p>
      <div class="exp-log">
        <div v-for="pos in positions" :key="pos" class="log-row">
          <span class="log-period">{{ t(`about.experience.${pos}.period`) }}</span>
          <span class="log-main">
            <span class="log-title">{{ t(`about.experience.${pos}.title`) }}</span>
            <span class="log-co">{{ t(`about.experience.${pos}.company`) }}</span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const expertise = [
  { key: 'backend', items: [1, 2, 3, 4] },
  { key: 'database', items: [1, 2, 3, 4] },
  { key: 'devops', items: [1, 2, 3, 4] },
  { key: 'it', items: [1, 2, 3, 4, 5] },
  { key: 'scraping', items: [1, 2, 3] }
]

const positions = ['pos1', 'pos2', 'pos3', 'pos4']
</script>

<style scoped>
.about-text {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.about-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bio p {
  margin: 0 0 12px;
}

.bio p:last-child {
  margin-bottom: 0;
}

/* expertise grid */
.exp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px 28px;
  padding-left: 16px;
  border-left: 1px solid var(--tw-line);
}

.exp-cat-title {
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: var(--tw-fg);
  margin: 0 0 8px;
  letter-spacing: 0.01em;
}

.exp-arrow {
  color: var(--tw-amber);
  font-weight: 700;
}

.exp-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.exp-list li {
  position: relative;
  font-size: 13px;
  line-height: 1.55;
  color: var(--tw-bio);
  padding: 2px 0 2px 16px;
}

.exp-list li::before {
  content: '·';
  position: absolute;
  left: 2px;
  color: var(--tw-green);
  font-weight: 700;
}

/* experience log */
.exp-log {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  border-left: 1px solid var(--tw-line);
}

.log-row {
  display: flex;
  gap: 18px;
  padding: 10px 0;
  border-bottom: 1px dashed var(--tw-line);
}

.log-row:last-child {
  border-bottom: none;
}

.log-period {
  flex-shrink: 0;
  width: 150px;
  font-size: 12.5px;
  color: var(--tw-green);
  padding-top: 1px;
}

.log-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.log-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--tw-name);
}

.log-co {
  font-size: 12.5px;
  color: var(--tw-dim);
}

@media (max-width: 600px) {
  .exp-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .log-row {
    flex-direction: column;
    gap: 4px;
  }

  .log-period {
    width: auto;
  }
}
</style>
