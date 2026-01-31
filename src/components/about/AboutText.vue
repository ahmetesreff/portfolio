<template>
  <div class="about-text">
    <div class="about-section">
      <h2>Merhaba!</h2>
      <p>
        Ben [Adınız Soyadınız], [profesyonel unvanınız]. [Şehir, Ülke] merkezliyim
        ve [kaç yıldır] süredir [alanınız] alanında çalışıyorum.
      </p>
      <p>
        [İşiniz ve tutkularınız hakkında 2-3 cümle. Örneğin: "Modern web teknolojileri
        ile kullanıcı deneyimini ön planda tutan uygulamalar geliştirmeyi seviyorum.
        Vue.js, React ve Node.js ile projeler üretmekten keyif alıyorum."]
      </p>
    </div>

    <div class="about-section">
      <h3>Deneyim</h3>
      <p>
        [Profesyonel deneyiminiz hakkında bilgi. Örneğin: "Son 5 yıldır farklı
        şirketlerde frontend developer olarak çalıştım. E-ticaret, fintech ve
        SaaS projelerinde yer aldım."]
      </p>
    </div>

    <div class="about-section">
      <h3>Eğitim</h3>
      <p>
        [Eğitim geçmişiniz. Örneğin: "Bilgisayar Mühendisliği lisans derecesine
        sahibim. Sürekli öğrenmeye inanıyor ve yeni teknolojileri takip ediyorum."]
      </p>
    </div>

    <div class="about-section">
      <h3>İlgi Alanları</h3>
      <div class="interests">
        <span class="interest-tag">Web Geliştirme</span>
        <span class="interest-tag">UI/UX Tasarım</span>
        <span class="interest-tag">Açık Kaynak</span>
        <span class="interest-tag">Teknoloji Blogları</span>
        <span class="interest-tag">Fotoğrafçılık</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Bu bileşende dinamik içerik yok,
// isterseniz props ile dışarıdan veri alabilirsiniz
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
  margin-bottom: var(--spacing-md);
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

  .interest-tag {
    font-size: var(--font-size-sm);
    padding: 8px 16px;
  }
}
</style>
