<template>
  <div class="skills-section">
    <div class="skills-container">
      <h2 class="skills-title">Yetenekler</h2>
      <p class="skills-subtitle">Teknolojiler ve araçlar</p>

      <div class="skills-grid">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skill-item"
        >
          <span class="skill-name">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const skills = [
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'Vue.js' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Python' },
  { name: 'Docker' },
  { name: 'Git' },
  { name: 'PostgreSQL' },
  { name: 'MongoDB' },
  { name: 'AWS' },
  { name: 'CI/CD' },
]
</script>

<style scoped>
.skills-section {
  width: 100%;
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
}

.skills-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  text-align: center;
}

.skills-title {
  font-size: var(--font-size-h2);
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.02em;
}

.skills-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-sm);
  max-width: 800px;
  margin: 0 auto;
}

.skill-item {
  background: var(--color-background);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
}

.skill-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: rgba(0, 0, 0, 0.08);
}

.skill-name {
  font-size: var(--font-size-md);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .skills-section {
    padding: var(--spacing-xl) 0;
  }

  .skills-title {
    font-size: var(--font-size-h3);
  }

  .skills-subtitle {
    font-size: var(--font-size-md);
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-xs);
  }

  .skill-item {
    padding: var(--spacing-sm);
    min-height: 48px;
  }

  .skill-name {
    font-size: var(--font-size-sm);
  }
}
</style>
