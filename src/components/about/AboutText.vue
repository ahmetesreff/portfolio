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
  max-width: 700px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: var(--spacing-lg);
}

.about-section h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.about-section h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-xl);
}

.about-section p {
  line-height: var(--line-height);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.interests {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.interest-tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.interest-tag:hover {
  background: var(--color-secondary);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-section h2 {
    font-size: var(--font-size-h2);
  }

  .about-section h3 {
    font-size: var(--font-size-lg);
  }
}
</style>
