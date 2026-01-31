export default {
  nav: {
    about: 'About',
    contact: 'Contact'
  },
  profile: {
    name: 'Ahmet Eşref Karabulut',
    title: 'Backend Developer & IT Management Experience',
    bio: 'I develop backend systems while having experience in corporate IT infrastructure and operational processes.',
    contactButton: 'Contact'
  },
  about: {
    title: 'About Me',
    paragraphs: [
      'I am a Computer Programming graduate. I started my career by developing web scraping and data collection projects. During this process, I worked on extracting, cleaning, and processing data from different sources.',
      'Later, I took on a role in IT, dealing with network structure, hardware, user management, and system operations. I worked as an IT Manager at a company for approximately 1 year, being responsible for the entire IT infrastructure.',
      'Afterwards, I shifted my focus to backend development and started developing multi-tenant business applications.',
      'Currently, I am working on backend architecture, data model design, and performance-focused API development.'
    ],
    expertise: {
      title: 'Areas of Expertise',
      backend: {
        title: 'Backend Development',
        items: [
          'NestJS (Auth, JWT, Guards, Interceptors)',
          'Multi-tenant architecture (company-based data isolation)',
          'REST API design',
          'Business logic modeling'
        ]
      },
      database: {
        title: 'Database',
        items: [
          'PostgreSQL',
          'Entity design',
          'Index and performance optimization',
          'Soft delete & relation management'
        ]
      },
      devops: {
        title: 'DevOps & Infrastructure',
        items: [
          'Docker & Docker Compose',
          'GitHub Actions (CI/CD)',
          'Linux server management',
          'Nginx'
        ]
      },
      it: {
        title: 'IT Management Experience',
        items: [
          'User and device management',
          'Network & hardware infrastructure',
          'System continuity',
          'IT processes and documentation',
          'Technical support and problem solving'
        ]
      },
      scraping: {
        title: 'Web Scraping & Data',
        items: [
          'Data collection from various sources',
          'Data cleaning and transformation',
          'Automation scripts'
        ]
      }
    },
    experience: {
      title: 'Experience',
      positions: [
        {
          title: 'Backend Developer',
          company: 'Bibs Teknoloji · Trabzon',
          period: 'Aug 2025 - Present'
        },
        {
          title: 'IT Manager',
          company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
          period: 'Feb 2025 - Aug 2025'
        },
        {
          title: 'IT Specialist',
          company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
          period: 'Mar 2024 - Apr 2025'
        },
        {
          title: 'Data Processing Specialist',
          company: 'Ali Osman Ulusoy Turizm · Trabzon',
          period: 'Nov 2023 - Mar 2024'
        }
      ]
    },
    skills: {
      title: 'Technologies'
    }
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'You can use the following information to contact me',
    email: 'Email',
    location: 'Location',
    locationValue: 'Trabzon, Turkey',
    social: 'Social Media'
  },
  footer: {
    copyright: 'Portfolio. All rights reserved.'
  },
  theme: {
    light: 'Switch to light theme',
    dark: 'Switch to dark theme'
  }
}
