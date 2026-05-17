<template>
  <div class="tech-stack">
    <p class="tw-line dim">
      <span class="tw-dollar">$</span><span class="tw-kw">ls</span> <span class="tw-arg">./stack</span>
    </p>
    <div class="stack-grid">
      <div v-for="category in techStack" :key="category.key" class="stack-cat">
        <span class="stack-label">{{ t(`about.techStack.categories.${category.key}`) }}/</span>
        <ul class="tw-chips">
          <li v-for="tech in category.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const techStack = [
  { key: 'backend', technologies: ['NestJS', 'Node.js', 'TypeScript', 'REST API'] },
  { key: 'database', technologies: ['PostgreSQL', 'Redis', 'TypeORM'] },
  { key: 'devops', technologies: ['Docker', 'GitHub Actions', 'Nginx', 'Git', 'Linux'] },
  { key: 'frontend', technologies: ['Vue.js', 'HTML/CSS', 'JavaScript'] },
  { key: 'tools', technologies: ['VS Code', 'Postman', 'JWT', 'REST API'] }
]
</script>

<style scoped>
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stack-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--tw-line);
}

.stack-cat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stack-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--tw-green);
  letter-spacing: 0.02em;
}
</style>
