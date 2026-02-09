export const siteConfig = {
  siteName: 'Ahmet Eşref Karabulut',
  baseUrl: 'https://ahmetesrefkarabulut.com.tr',
  author: 'Ahmet Eşref Karabulut',
  ogImage: '/og-image.svg',
  locale: 'tr_TR'
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmet Eşref Karabulut',
  url: 'https://ahmetesrefkarabulut.com.tr',
  image: 'https://ahmetesrefkarabulut.com.tr/og-image.svg',
  jobTitle: 'Backend Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Bibs Teknoloji'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Trabzon',
    addressCountry: 'TR'
  },
  email: 'ahmetesrefkarabulut@gmail.com',
  sameAs: [
    'https://github.com/ahmetesreff',
    'https://www.linkedin.com/in/ahmetesrefkarabulut/'
  ],
  knowsAbout: [
    'NestJS',
    'PostgreSQL',
    'Docker',
    'Redis',
    'TypeScript',
    'REST API',
    'CI/CD',
    'Linux'
  ]
}
