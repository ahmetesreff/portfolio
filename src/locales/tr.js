export default {
  nav: {
    about: 'Hakkımda',
    contact: 'İletişim'
  },
  profile: {
    name: 'Ahmet Eşref Karabulut',
    title: 'Backend Developer & IT Management Experience',
    bio: 'Backend sistemler geliştirirken aynı zamanda kurumsal IT altyapısı ve operasyon süreçleri konusunda tecrübeye sahibim.',
    contactButton: 'İletişim'
  },
  about: {
    title: 'Hakkımda',
    paragraphs: [
      'Bilgisayar Programcılığı mezunuyum. Kariyerime web scraping ve veri toplama projeleri geliştirerek başladım. Bu süreçte farklı kaynaklardan veri çekme, temizleme ve işleme üzerine çalışmalar yaptım.',
      'Daha sonra IT tarafında görev alarak ağ yapısı, donanım, kullanıcı yönetimi ve sistem operasyonlarıyla ilgilendim. Yaklaşık 1 yıl boyunca bir şirkette IT Manager rolünde çalışarak tüm IT altyapısından sorumlu oldum.',
      'Sonrasında odağımı backend geliştirmeye çevirerek çok kullanıcılı (multi-tenant) çalışan iş uygulamaları geliştirmeye başladım.',
      'Şu anda backend mimarisi, veri modeli tasarımı ve performans odaklı API geliştirme üzerine çalışıyorum.'
    ],
    expertise: {
      title: 'Uzmanlık Alanlarım',
      backend: {
        title: 'Backend Development',
        items: [
          'NestJS (Auth, JWT, Guards, Interceptors)',
          'Multi-tenant mimari (company bazlı veri izolasyonu)',
          'REST API tasarımı',
          'Business logic modelleme'
        ]
      },
      database: {
        title: 'Database',
        items: [
          'PostgreSQL',
          'Entity tasarımı',
          'Index ve performans optimizasyonu',
          'Soft delete & relation yönetimi'
        ]
      },
      devops: {
        title: 'DevOps & Infrastructure',
        items: [
          'Docker & Docker Compose',
          'GitHub Actions (CI/CD)',
          'Linux server yönetimi',
          'Nginx'
        ]
      },
      it: {
        title: 'IT Management Experience',
        items: [
          'Kullanıcı ve cihaz yönetimi',
          'Network & donanım altyapısı',
          'Sistem sürekliliği',
          'IT süreçleri ve dokümantasyon',
          'Teknik destek ve problem çözme'
        ]
      },
      scraping: {
        title: 'Web Scraping & Data',
        items: [
          'Farklı kaynaklardan veri toplama',
          'Veri temizleme ve dönüştürme',
          'Otomasyon scriptleri'
        ]
      }
    },
    experience: {
      title: 'Deneyim',
      positions: [
        {
          title: 'Backend Developer',
          company: 'Bibs Teknoloji · Trabzon',
          period: 'Ağu 2025 - Günümüz'
        },
        {
          title: 'IT Manager',
          company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
          period: 'Şub 2025 - Ağu 2025'
        },
        {
          title: 'IT Specialist',
          company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
          period: 'Mar 2024 - Nis 2025'
        },
        {
          title: 'Data Processing Specialist',
          company: 'Ali Osman Ulusoy Turizm · Trabzon',
          period: 'Kas 2023 - Mar 2024'
        }
      ]
    },
    skills: {
      title: 'Teknolojiler'
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
    copyright: 'Portfolio. Tüm hakları saklıdır.'
  },
  theme: {
    light: 'Açık temaya geç',
    dark: 'Koyu temaya geç'
  }
}
