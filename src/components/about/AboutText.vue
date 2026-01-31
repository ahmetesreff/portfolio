<template>
  <div class="about-text">
    <div class="about-section">
      <h2>{{ t('about.title') }}</h2>
      <p v-for="(paragraph, index) in t('about.paragraphs')" :key="index">
        {{ paragraph }}
      </p>
    </div>

    <div class="about-section">
      <h3>{{ t('about.expertise.title') }}</h3>

      <div class="expertise-category">
        <h4 class="expertise-title">{{ t('about.expertise.backend.title') }}</h4>
        <ul class="expertise-list">
          <li v-for="(item, index) in t('about.expertise.backend.items')" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="expertise-category">
        <h4 class="expertise-title">{{ t('about.expertise.database.title') }}</h4>
        <ul class="expertise-list">
          <li v-for="(item, index) in t('about.expertise.database.items')" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="expertise-category">
        <h4 class="expertise-title">{{ t('about.expertise.devops.title') }}</h4>
        <ul class="expertise-list">
          <li v-for="(item, index) in t('about.expertise.devops.items')" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="expertise-category">
        <h4 class="expertise-title">{{ t('about.expertise.it.title') }}</h4>
        <ul class="expertise-list">
          <li v-for="(item, index) in t('about.expertise.it.items')" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="expertise-category">
        <h4 class="expertise-title">{{ t('about.expertise.scraping.title') }}</h4>
        <ul class="expertise-list">
          <li v-for="(item, index) in t('about.expertise.scraping.items')" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="about-section">
      <h3>{{ t('about.experience.title') }}</h3>

      <div
        v-for="(position, index) in t('about.experience.positions')"
        :key="index"
        class="experience-item"
      >
        <div class="experience-header">
          <h4 class="experience-title">{{ position.title }}</h4>
          <span class="experience-period">{{ position.period }}</span>
        </div>
        <p class="experience-company">{{ position.company }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.about-text {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
}

.about-section {
  margin-bottom: var(--spacing-2xl);
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
}

.about-section h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.015em;
}

.about-section p {
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

/* Expertise categories */
.expertise-category {
  margin-bottom: var(--spacing-xl);
}

.expertise-category:last-child {
  margin-bottom: 0;
}

.expertise-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.01em;
}

.expertise-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.expertise-list li {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  padding: var(--spacing-xs) 0;
  padding-left: var(--spacing-md);
  position: relative;
  line-height: 1.6;
}

.expertise-list li::before {
  content: "·";
  position: absolute;
  left: 0;
  color: var(--color-secondary);
  font-weight: bold;
  font-size: var(--font-size-xl);
  line-height: 1;
}

/* Experience items */
.experience-item {
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.experience-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--spacing-xs);
  gap: var(--spacing-sm);
}

.experience-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.experience-period {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  font-weight: var(--font-weight-normal);
}

.experience-company {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.experience-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
}

.skill-badge {
  font-size: 12px;
  padding: 4px 12px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border-radius: 6px;
  font-weight: var(--font-weight-normal);
}

/* Interest tags */
.interests {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.interest-tag {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  background: var(--color-surface);
  color: var(--color-primary);
  border-radius: 980px;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  transition: var(--transition-fast);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.interest-tag:hover {
  background: var(--color-accent);
  border-color: rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .about-section {
    margin-bottom: var(--spacing-xl);
  }

  .about-section h2 {
    font-size: var(--font-size-h3);
  }

  .about-section h3 {
    font-size: var(--font-size-xl);
  }

  .about-section p {
    font-size: var(--font-size-md);
  }

  .expertise-category {
    margin-bottom: var(--spacing-lg);
  }

  .expertise-title {
    font-size: var(--font-size-md);
  }

  .expertise-list li {
    font-size: var(--font-size-sm);
    padding-left: var(--spacing-sm);
  }

  .experience-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .experience-title {
    font-size: var(--font-size-md);
  }

  .experience-period {
    font-size: 12px;
  }

  .experience-company {
    font-size: var(--font-size-sm);
  }

  .interest-tag {
    font-size: var(--font-size-sm);
    padding: 8px 16px;
  }
}
</style>
