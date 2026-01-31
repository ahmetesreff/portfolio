<template>
  <div class="about-text">
    <div class="about-section">
      <h2>Merhaba!</h2>
      <p>
        Trabzon merkezli bir yazılım geliştiriciyim. Backend geliştirme, veri işleme ve
        kurumsal yazılım çözümleri konusunda deneyimliyim.
      </p>
      <p>
        Modern web teknolojileri, veritabanı yönetimi ve iş süreçlerini optimize etmek
        için yazılım geliştirmeyi seviyorum.
      </p>
    </div>

    <div class="about-section">
      <h3>Deneyim</h3>

      <div class="experience-item">
        <div class="experience-header">
          <h4 class="experience-title">Backend Developer</h4>
          <span class="experience-period">Ağu 2025 - Günümüz</span>
        </div>
        <p class="experience-company">Bibs Teknoloji · Trabzon</p>
      </div>

      <div class="experience-item">
        <div class="experience-header">
          <h4 class="experience-title">IT Manager</h4>
          <span class="experience-period">Şub 2025 - Ağu 2025</span>
        </div>
        <p class="experience-company">Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon</p>
      </div>

      <div class="experience-item">
        <div class="experience-header">
          <h4 class="experience-title">IT Specialist</h4>
          <span class="experience-period">Mar 2024 - Nis 2025</span>
        </div>
        <p class="experience-company">Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon</p>
        <div class="experience-skills">
          <span class="skill-badge">ERP</span>
          <span class="skill-badge">SQL</span>
        </div>
      </div>

      <div class="experience-item">
        <div class="experience-header">
          <h4 class="experience-title">Data Processing Specialist</h4>
          <span class="experience-period">Kas 2023 - Mar 2024</span>
        </div>
        <p class="experience-company">Ali Osman Ulusoy Turizm · Trabzon</p>
        <div class="experience-skills">
          <span class="skill-badge">Veri Analizi</span>
          <span class="skill-badge">JavaScript</span>
        </div>
      </div>
    </div>

    <div class="about-section">
      <h3>Teknik Yetenekler</h3>
      <div class="interests">
        <span class="interest-tag">Backend Development</span>
        <span class="interest-tag">SQL & Veritabanı</span>
        <span class="interest-tag">ERP Sistemleri</span>
        <span class="interest-tag">JavaScript</span>
        <span class="interest-tag">Veri Analizi</span>
        <span class="interest-tag">Vue.js</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Experience data from LinkedIn
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
