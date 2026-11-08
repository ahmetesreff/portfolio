export default {
  nav: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    tools: 'Tools'
  },
  profile: {
    name: 'Ahmet Eşref Karabulut',
    bio: 'I develop backend systems while having experience in corporate IT infrastructure and operational processes.',
    contactButton: 'Contact'
  },
  seo: {
    notFound: { title: 'Page not found | Ahmet Eşref Karabulut', description: 'The page you are looking for could not be found.' },
    site: {
      description: 'Ahmet Eşref Karabulut | Backend Developer and IT Management experience.'
    },
    home: {
      title: 'Ahmet Eşref Karabulut - Backend Developer | Trabzon',
      description: 'Backend Developer & IT Management experience. I build multi-tenant systems and REST APIs with NestJS, PostgreSQL, Docker, Redis.'
    },
    about: {
      title: 'About | Ahmet Eşref Karabulut',
      description: 'Experience in backend development, database design, DevOps, and IT management.'
    },
    contact: {
      title: 'Contact | Ahmet Eşref Karabulut',
      description: 'Get in touch with Ahmet Eşref Karabulut. Email and social links.'
    },
    tools: {
      title: 'Tools | Ahmet Eşref Karabulut',
      description: 'IP and DNS lookup, JWT decoder, JSON formatter, timestamp converter, cron explainer, password and QR code generator.'
    }
  },
  about: {
    title: 'About Me',
    p1: 'I started my career by developing web scraping and data collection projects. During this process, I worked on extracting, cleaning, and processing data from different sources.',
    p2: 'Later, I took on a role in IT, dealing with network structure, hardware, user management, and system operations. I worked as an IT Manager at a company for approximately 1 year, being responsible for the entire IT infrastructure.',
    p3: 'Afterwards, I shifted my focus to backend development and started developing multi-tenant business applications.',
    p4: 'Currently, I am working on backend architecture, data model design, and performance-focused API development.',
    expertise: {
      backend: {
        title: 'Backend Development',
        i1: 'NestJS (Auth, JWT, Guards, Interceptors)',
        i2: 'Multi-tenant architecture (company-based data isolation)',
        i3: 'REST API design',
        i4: 'Business logic modeling'
      },
      database: {
        title: 'Database',
        i1: 'PostgreSQL',
        i2: 'Entity design',
        i3: 'Index and performance optimization',
        i4: 'Soft delete & relation management'
      },
      devops: {
        title: 'DevOps & Infrastructure',
        i1: 'Docker & Docker Compose',
        i2: 'GitHub Actions (CI/CD)',
        i3: 'Linux server management',
        i4: 'Nginx'
      },
      it: {
        title: 'IT Management Experience',
        i1: 'User and device management',
        i2: 'Network & hardware infrastructure',
        i3: 'System continuity',
        i4: 'IT processes and documentation',
        i5: 'Technical support and problem solving'
      },
      scraping: {
        title: 'Web Scraping & Data',
        i1: 'Data collection from various sources',
        i2: 'Data cleaning and transformation',
        i3: 'Automation scripts'
      }
    },
    experience: {
      pos1: {
        title: 'Backend Developer',
        company: 'Bibs Teknoloji · Trabzon',
        period: 'Aug 2025 - Present'
      },
      pos2: {
        title: 'IT Manager',
        company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
        period: 'Feb 2025 - Aug 2025'
      },
      pos3: {
        title: 'IT Specialist',
        company: 'Karadeniz Kardeşler Gıda · Vakfıkebir, Trabzon',
        period: 'Mar 2024 - Apr 2025'
      },
      pos4: {
        title: 'Data Processing Specialist',
        company: 'Ali Osman Ulusoy Turizm · Trabzon',
        period: 'Nov 2023 - Mar 2024'
      }
    },
    techStack: {
      categories: {
        backend: 'Backend',
        database: 'Database',
        devops: 'DevOps & Infrastructure',
        frontend: 'Frontend & Web',
        tools: 'Tools & Other'
      }
    }
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'You can use the following information to contact me',
    email: 'Email',
    location: 'Location',
    locationValue: 'Trabzon, Turkey',
    social: 'Social Media',
    sendEmail: 'Send email'
  },
  notFound: {
    error: 'No such file or directory',
    title: '404 · Page not found',
    text: 'The page you are looking for may have moved or never existed.',
    home: 'Back to home'
  },
  footer: {
    copyright: 'Ahmet Eşref Karabulut · Trabzon'
  },
  theme: {
    light: 'Switch to light theme',
    dark: 'Switch to dark theme'
  },
  terminal: {
    welcome: 'Welcome to the terminal simulator! Type "help" to explore commands.',
    hint: 'Tip: Tab for autocomplete, ↑↓ for command history',
    lsHint: 'List a folder: ls /<folder>',
    inputLabel: 'Terminal command input'
  },
  tools: {
    title: 'IT Tools',
    subtitle: 'Useful tools for your daily IT tasks',
    loading: 'Loading...',
    error: 'An error occurred',
    copy: 'Copy',
    copied: 'Copied!',
    example: 'Example',
    privacy: 'Apart from IP and DNS, every tool runs entirely in your browser; nothing you enter is sent anywhere.',
    ipChecker: {
      title: 'IP Address',
      yourIp: 'Your IP Address',
      location: 'Location',
      isp: 'ISP',
      refresh: 'Refresh'
    },
    dns: {
      title: 'DNS Lookup',
      domain: 'Domain',
      placeholder: 'example.com',
      type: 'Record type',
      all: 'All',
      lookup: 'Look up',
      invalid: 'Enter a valid domain (e.g. example.com).',
      nxdomain: 'No such domain (NXDOMAIN).',
      servfail: 'The DNS server could not answer (SERVFAIL).',
      failed: 'DNS lookup failed',
      empty: 'No records of this type.',
      via: 'Resolver'
    },
    jwt: {
      title: 'JWT Decoder',
      placeholder: 'Paste a token (eyJhbGciOi...)',
      sample: 'Sample token',
      notJwt: 'Not a valid JWT: expected three dot-separated parts (header.payload.signature).',
      jwe: 'This is an encrypted token (JWE); its contents cannot be read without the key.',
      badPart: 'Could not decode {part}: invalid Base64URL or JSON.',
      valid: 'Valid · expires {rel}',
      expired: 'Expired · {rel}',
      notYet: 'Not valid yet · starts {rel}',
      noExp: 'No expiry: exp claim missing',
      algNone: 'Unsigned token (alg: none).',
      note: 'The signature is not verified; the token never leaves your browser.',
      claims: {
        exp: 'Expires (exp)',
        iat: 'Issued (iat)',
        nbf: 'Not before (nbf)'
      }
    },
    json: {
      title: 'JSON Tools',
      placeholder: 'Paste JSON...',
      view: 'View',
      pretty: 'Format',
      minify: 'Minify',
      tree: 'Tree',
      valid: 'Valid JSON',
      invalid: 'Invalid JSON',
      invalidAt: 'Invalid JSON: line {line}, column {col}',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all'
    },
    timestamp: {
      title: 'Timestamp',
      placeholder: '1794150000 or 2026-11-08 14:30',
      now: 'Now',
      current: 'Now',
      seconds: 'Unix (seconds)',
      millis: 'Unix (ms)',
      iso: 'ISO 8601 (UTC)',
      local: 'Local time',
      relative: 'Relative',
      detectedMs: 'Number detected as milliseconds.',
      invalid: 'Unrecognised format. Examples: 1794150000 · 2026-11-08T14:30:00Z · 08.11.2026 14:30'
    },
    cron: {
      title: 'Cron Explainer',
      label: 'Cron expression',
      fields: 'minute · hour · day of month · month · day of week',
      next: 'Next runs',
      none: 'No run time in the next 5 years.',
      onlyFive: 'Next run times are only calculated for standard 5-field expressions.',
      invalid: 'Invalid cron expression.',
      reboot: 'Every time the system boots'
    },
    passwordGenerator: {
      title: 'Password Generator',
      output: 'Generated password',
      length: 'Length',
      uppercase: 'Uppercase',
      lowercase: 'Lowercase',
      numbers: 'Numbers',
      symbols: 'Symbols',
      generate: 'Generate',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    },
    qrGenerator: {
      title: 'QR Code Generator',
      placeholder: 'Enter text or URL...',
      label: 'Generated QR code',
      download: 'Download PNG',
      tooLong: 'The text is too long for a QR code.'
    }
  }
}
