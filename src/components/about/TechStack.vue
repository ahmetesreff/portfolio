<template>
  <div class="tech-stack-section">
    <div class="tech-stack-container">
      <h2 class="section-title" v-scroll-reveal="{ type: 'fade-up' }">
        {{ t('about.techStack.title') }}
      </h2>

      <div class="categories" v-scroll-reveal="{ type: 'fade-up', delay: 50 }">
        <div
          v-for="category in techStack"
          :key="category.key"
          class="category"
        >
          <span class="category-title">{{ t(`about.techStack.categories.${category.key}`) }}</span>
          <span class="tech-list">
            <span
              v-for="(tech, index) in category.technologies"
              :key="tech"
            >{{ tech }}<span v-if="index < category.technologies.length - 1" class="separator"> · </span></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const techStack = [
  {
    key: 'backend',
    technologies: ['NestJS', 'Node.js', 'TypeScript', 'REST API']
  },
  {
    key: 'database',
    technologies: ['PostgreSQL', 'Redis', 'TypeORM']
  },
  {
    key: 'devops',
    technologies: ['Docker', 'GitHub Actions', 'Nginx', 'Git', 'Linux']
  },
  {
    key: 'frontend',
    technologies: ['Vue.js', 'HTML/CSS', 'JavaScript']
  },
  {
    key: 'tools',
    technologies: ['VS Code', 'Postman', 'JWT', 'REST API']
  }
]
</script>

<style scoped>
.tech-stack-section {
  width: 100%;
  padding: var(--spacing-xl) 0;
  background: var(--color-surface);
}

.tech-stack-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.categories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.category {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  line-height: 1.6;
}

.category-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  min-width: 120px;
  flex-shrink: 0;
}

.tech-list {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
}

.separator {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .tech-stack-section {
    padding: var(--spacing-lg) 0;
  }

  .category {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .category-title {
    min-width: auto;
  }
}
</style>
