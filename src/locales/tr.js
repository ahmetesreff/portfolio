export default {
  nav: {
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    contact: 'İletişim',
    tools: 'Araçlar'
  },
  profile: {
    name: 'Ahmet Eşref Karabulut',
    title: 'Backend Developer & IT Management Experience',
    bio: 'Backend sistemler geliştirirken aynı zamanda kurumsal IT altyapısı ve operasyon süreçleri konusunda tecrübeye sahibim.',
    contactButton: 'İletişim'
  },
  about: {
    title: 'Hakkımda',
    p1: 'Bilgisayar Programcılığı mezunuyum. Kariyerime web scraping ve veri toplama projeleri geliştirerek başladım. Bu süreçte farklı kaynaklardan veri çekme, temizleme ve işleme üzerine çalışmalar yaptım.',
    p2: 'Daha sonra IT tarafında görev alarak ağ yapısı, donanım, kullanıcı yönetimi ve sistem operasyonlarıyla ilgilendim. Yaklaşık 1 yıl boyunca bir şirkette IT Manager rolünde çalışarak tüm IT altyapısından sorumlu oldum.',
    p3: 'Sonrasında odağımı backend geliştirmeye çevirerek çok kullanıcılı (multi-tenant) çalışan iş uygulamaları geliştirmeye başladım.',
    p4: 'Şu anda backend mimarisi, veri modeli tasarımı ve performans odaklı API geliştirme üzerine çalışıyorum.',
    expertise: {
      title: 'Uzmanlık Alanlarım',
      backend: {
        title: 'Backend Development',
        i1: 'NestJS (Auth, JWT, Guards, Interceptors)',
        i2: 'Multi-tenant mimari (company bazlı veri izolasyonu)',
        i3: 'REST API tasarımı',
        i4: 'Business logic modelleme'
      },
      database: {
        title: 'Database',
        i1: 'PostgreSQL',
        i2: 'Entity tasarımı',
        i3: 'Index ve performans optimizasyonu',
        i4: 'Soft delete & relation yönetimi'
      },
      devops: {
        title: 'DevOps & Infrastructure',
        i1: 'Docker & Docker Compose',
        i2: 'GitHub Actions (CI/CD)',
        i3: 'Linux server yönetimi',
        i4: 'Nginx'
      },
      it: {
        title: 'IT Management Experience',
        i1: 'Kullanıcı ve cihaz yönetimi',
        i2: 'Network & donanım altyapısı',
        i3: 'Sistem sürekliliği',
        i4: 'IT süreçleri ve dokümantasyon',
        i5: 'Teknik destek ve problem çözme'
      },
      scraping: {
        title: 'Web Scraping & Data',
        i1: 'Farklı kaynaklardan veri toplama',
        i2: 'Veri temizleme ve dönüştürme',
        i3: 'Otomasyon scriptleri'
      }
    },
    experience: {
      title: 'Deneyim',
      pos1: {
        title: 'Backend Developer',
        company: 'Bibs Teknoloji · Trabzon',
        period: 'Ağu 2025 - Günümüz'
      },
      pos2: {
        title: 'IT Manager',
        company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
        period: 'Şub 2025 - Ağu 2025'
      },
      pos3: {
        title: 'IT Specialist',
        company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
        period: 'Mar 2024 - Nis 2025'
      },
      pos4: {
        title: 'Data Processing Specialist',
        company: 'Ali Osman Ulusoy Turizm · Trabzon',
        period: 'Kas 2023 - Mar 2024'
      }
    },
    techStack: {
      title: 'Teknoloji Stack',
      subtitle: 'Kullandığım teknolojiler ve araçlar',
      categories: {
        backend: 'Backend',
        database: 'Database',
        devops: 'DevOps & Infrastructure',
        frontend: 'Frontend & Web',
        tools: 'Araçlar & Diğer'
      }
    }
  },
  contact: {
    title: 'İletişime Geçin',
    subtitle: 'Benimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz',
    email: 'E-posta',
    location: 'Konum',
    locationValue: 'Trabzon, Türkiye',
    social: 'Sosyal Medya'
  },
  footer: {
    copyright: 'Ahmet Eşref Karabulut · Trabzon'
  },
  theme: {
    light: 'Açık temaya geç',
    dark: 'Koyu temaya geç'
  },
  terminal: {
    welcome: 'Terminal simülatörüne hoş geldiniz! Komutları keşfetmek için "help" yazın.',
    hint: 'İpucu: Tab ile otomatik tamamlama, ↑↓ ile komut geçmişi'
  },
  tools: {
    title: 'IT Araçları',
    subtitle: 'Günlük IT işleriniz için faydalı araçlar',
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    ipChecker: {
      title: 'IP Adresi',
      yourIp: 'IP Adresiniz',
      location: 'Konum',
      isp: 'İnternet Sağlayıcı',
      refresh: 'Yenile'
    },
    speedTest: {
      title: 'Hız Testi',
      start: 'Testi Başlat',
      testing: 'Test Ediliyor...',
      measuring: 'Hız ölçülüyor...',
      ready: 'Teste hazır',
      excellent: 'Mükemmel hız!',
      good: 'İyi hız',
      average: 'Ortalama hız',
      slow: 'Yavaş bağlantı'
    },
    jsonFormatter: {
      title: 'JSON Formatlayıcı',
      placeholder: 'JSON kodunuzu buraya yapıştırın...',
      format: 'Formatla',
      minify: 'Küçült',
      invalidJson: 'Geçersiz JSON formatı'
    },
    jsonViewer: {
      title: 'JSON Görüntüleyici',
      placeholder: 'JSON kodunuzu buraya yapıştırın...',
      expandAll: 'Tümünü Aç',
      collapseAll: 'Tümünü Kapat',
      invalidJson: 'Geçersiz JSON formatı'
    },
    passwordGenerator: {
      title: 'Şifre Oluşturucu',
      length: 'Uzunluk',
      uppercase: 'Büyük harf',
      lowercase: 'Küçük harf',
      numbers: 'Rakamlar',
      symbols: 'Semboller',
      generate: 'Oluştur',
      weak: 'Zayıf',
      medium: 'Orta',
      strong: 'Güçlü'
    },
    qrGenerator: {
      title: 'QR Kod Oluşturucu',
      placeholder: 'Metin veya URL girin...',
      generate: 'QR Kod Oluştur',
      download: 'İndir'
    }
  }
}
