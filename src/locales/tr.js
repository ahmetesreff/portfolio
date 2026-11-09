export default {
  nav: {
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    contact: 'İletişim',
    tools: 'Araçlar'
  },
  profile: {
    name: 'Ahmet Eşref Karabulut',
    bio: 'Backend sistemler geliştirirken aynı zamanda kurumsal IT altyapısı ve operasyon süreçleri konusunda tecrübeye sahibim.',
    contactButton: 'İletişim'
  },
  seo: {
    notFound: { title: 'Sayfa bulunamadı | Ahmet Eşref Karabulut', description: 'Aradığınız sayfa bulunamadı.' },
    site: {
      description: 'Ahmet Eşref Karabulut | Backend yazılım geliştirici, IT yönetimi deneyimi.'
    },
    home: {
      title: 'Ahmet Eşref Karabulut - Backend Yazılım Geliştirici | Trabzon',
      description: "Trabzon'da backend yazılım geliştirici. NestJS, PostgreSQL, Docker ve Redis ile multi-tenant sistemler ve REST API'ler geliştiriyorum; IT yönetimi deneyimi."
    },
    about: {
      title: 'Hakkımda | Ahmet Eşref Karabulut',
      description: 'Backend geliştirme, veritabanı tasarımı, DevOps ve IT yönetimi alanlarında deneyim.'
    },
    contact: {
      title: 'İletişim | Ahmet Eşref Karabulut',
      description: 'Ahmet Eşref Karabulut ile iletişime geçin. E-posta ve sosyal medya bilgileri.'
    },
    tools: {
      title: 'Araçlar | Ahmet Eşref Karabulut',
      description: 'IP ve DNS sorgulama, JWT çözücü, JSON biçimlendirme, zaman damgası çevirici, cron açıklayıcı, şifre ve QR kod oluşturucu.'
    }
  },
  about: {
    title: 'Hakkımda',
    p1: 'Kariyerime web scraping ve veri toplama projeleri geliştirerek başladım. Bu süreçte farklı kaynaklardan veri çekme, temizleme ve işleme üzerine çalışmalar yaptım.',
    p2: 'Daha sonra IT tarafında görev alarak ağ yapısı, donanım, kullanıcı yönetimi ve sistem operasyonlarıyla ilgilendim. Yaklaşık 1 yıl boyunca bir şirkette IT Manager rolünde çalışarak tüm IT altyapısından sorumlu oldum.',
    p3: 'Sonrasında odağımı backend geliştirmeye çevirerek çok kullanıcılı (multi-tenant) çalışan iş uygulamaları geliştirmeye başladım.',
    p4: 'Şu anda backend mimarisi, veri modeli tasarımı ve performans odaklı API geliştirme üzerine çalışıyorum.',
    expertise: {
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
    social: 'Sosyal Medya',
    sendEmail: 'E-posta gönder'
  },
  notFound: {
    error: 'Böyle bir dosya ya da dizin yok',
    title: '404 · Sayfa bulunamadı',
    text: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
    home: 'Ana sayfaya dön'
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
    hint: 'İpucu: Tab ile otomatik tamamlama, ↑↓ ile komut geçmişi',
    lsHint: 'Klasör içeriği için: ls /<klasör>',
    inputLabel: 'Terminal komut girişi'
  },
  tools: {
    title: 'IT Araçları',
    subtitle: 'Günlük IT işleriniz için faydalı araçlar',
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    example: 'Örnek',
    privacy: 'IP ve DNS dışındaki araçlar tamamen tarayıcınızda çalışır; girdiğiniz veri hiçbir yere gönderilmez.',
    ipChecker: {
      title: 'IP Adresi',
      yourIp: 'IP Adresiniz',
      location: 'Konum',
      isp: 'İnternet Sağlayıcı',
      refresh: 'Yenile'
    },
    dns: {
      title: 'DNS Sorgulama',
      domain: 'Alan adı',
      placeholder: 'ornek.com',
      type: 'Kayıt türü',
      all: 'Tümü',
      lookup: 'Sorgula',
      invalid: 'Geçerli bir alan adı girin (ör. ornek.com).',
      nxdomain: 'Böyle bir alan adı yok (NXDOMAIN).',
      servfail: 'DNS sunucusu yanıt veremedi (SERVFAIL).',
      failed: 'DNS sorgusu yapılamadı',
      empty: 'Bu türde kayıt yok.',
      via: 'Çözümleyici'
    },
    jwt: {
      title: 'JWT Çözücü',
      placeholder: 'Token yapıştırın (eyJhbGciOi...)',
      sample: 'Örnek token',
      notJwt: 'Geçerli bir JWT değil: noktayla ayrılmış üç parça (header.payload.signature) bekleniyor.',
      jwe: 'Bu şifreli bir token (JWE); içeriği anahtar olmadan çözülemez.',
      badPart: '{part} çözülemedi: Base64URL ya da JSON hatalı.',
      valid: 'Geçerli · {rel} sona eriyor',
      expired: 'Süresi dolmuş · {rel}',
      notYet: 'Henüz geçerli değil · {rel} başlıyor',
      noExp: 'Süresiz: exp alanı yok',
      algNone: 'İmzasız token (alg: none).',
      note: 'İmza doğrulanmaz; token tarayıcınızdan dışarı çıkmaz.',
      claims: {
        exp: 'Bitiş (exp)',
        iat: 'Oluşturulma (iat)',
        nbf: 'Başlangıç (nbf)'
      }
    },
    json: {
      title: 'JSON Araçları',
      placeholder: 'JSON yapıştırın...',
      view: 'Görünüm',
      pretty: 'Biçimlendir',
      minify: 'Küçült',
      tree: 'Ağaç',
      valid: 'Geçerli JSON',
      invalid: 'Geçersiz JSON',
      invalidAt: 'Geçersiz JSON: satır {line}, sütun {col}',
      expandAll: 'Tümünü aç',
      collapseAll: 'Tümünü kapat'
    },
    timestamp: {
      title: 'Zaman Damgası',
      placeholder: '1794150000 ya da 08.11.2026 14:30',
      now: 'Şimdi',
      current: 'Şu an',
      seconds: 'Unix (saniye)',
      millis: 'Unix (ms)',
      iso: 'ISO 8601 (UTC)',
      local: 'Yerel saat',
      relative: 'Göreli',
      detectedMs: 'Sayı milisaniye olarak algılandı.',
      invalid: 'Tanınmayan biçim. Örnekler: 1794150000 · 2026-11-08T14:30:00Z · 08.11.2026 14:30'
    },
    cron: {
      title: 'Cron Açıklayıcı',
      label: 'Cron ifadesi',
      fields: 'dakika · saat · ayın günü · ay · haftanın günü',
      next: 'Sonraki çalışmalar',
      none: 'Önümüzdeki 5 yılda çalışma zamanı yok.',
      onlyFive: 'Sonraki zamanlar yalnızca standart 5 alanlı ifadeler için hesaplanır.',
      invalid: 'Geçersiz cron ifadesi.',
      reboot: 'Sistem her açıldığında'
    },
    passwordGenerator: {
      title: 'Şifre Oluşturucu',
      output: 'Oluşturulan şifre',
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
      label: 'Oluşturulan QR kod',
      download: 'PNG indir',
      tooLong: 'Metin QR kod için çok uzun.'
    }
  }
}
