export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  role: string;
  tags: string[];
  description: string;
  link: string;
  image?: string;
  imageAlt: string;
  isPlaceholder?: boolean;
}

export interface CapabilityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ApproachItem {
  id: string;
  title: string;
  description: string;
  subtitle: string;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  showInHero?: boolean;
  showInFooter?: boolean;
}

export const portfolioData = {
  owner: {
    name: 'Chukwuemeka Victor',
    shortName: 'CV',
    eyebrow: 'Chukwuemeka • Based in Nigeria',
    profileImage: '/assets/chukwuemeka-profile.jpg',
    availabilityBadge: 'Available for Q2/Q3 Projects',
    headline:
      'I am a UX Designer and Developer focused on building web and mobile applications.',
    focusSummary: 'Bubble.io • Product & UX Design • AI Workflows',
    supportingDescription: '',
    brandMessage:
      'I design and build digital products, combining user-centred design, product thinking, and modern development tools to turn ideas into functional applications.',
    scheduleCallHref: '#contact',
    linkedinUrl: 'https://www.linkedin.com/in/chukwuemeka-onwukwe-05829a16a/',
  },

  navItems: [
    { label: 'Selected Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
  ],

  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chukwuemeka-onwukwe-05829a16a/',
      showInHero: true,
      showInFooter: true,
    },
    {
      label: 'X / Twitter',
      href: '#contact',
      showInHero: true,
      showInFooter: true,
    },
    {
      label: 'Upwork',
      href: '#contact',
      showInHero: true,
      showInFooter: true,
    },
  ] as SocialLinkItem[],

  projectsSection: {
    heading: 'Selected projects',
    subheading:
      'Explore featured full-stack Bubble web apps and platforms built for high performance and seamless UX.',
  },

  projects: [
    {
      id: 'alumates-pro',
      slug: 'alumates-pro',
      title: 'Alumates Pro',
      category: 'EdTech / Professional Services / Marketplace',
      role: 'Product Designer & Bubble Developer',
      tags: ['LIVE', 'BUBBLE.IO', 'EDTECH & MARKETPLACE'],
      description:
        'A connected digital platform bringing together interior design learning, professional discovery, business directories, job opportunities, projects, and product sourcing.',
      link: '/work/alumates-pro',
      image: '/assets/alumates-pro-hero.png',
      imageAlt:
        'Alumates Pro web application interface showing the Learn. Hire. Build. Work — All in One hero screen',
      isPlaceholder: false,
    },
    {
      id: 'balanceport-gym-manager',
      slug: 'balanceport-gym-manager',
      title: 'Balanceport Gym Manager',
      category: 'SaaS / Fitness Technology',
      role: 'Product Designer & Bubble Developer',
      tags: ['SAAS', 'BUBBLE.IO', 'FITNESS TECH'],
      description:
        'A gym management application designed to help fitness businesses manage memberships, trainers, attendance, and daily operations.',
      link: '/work/balanceport-gym-manager',
      imageAlt: 'Placeholder preview for Balanceport Gym Manager application screenshot',
      isPlaceholder: true,
    },
  ] as ProjectItem[],

  capabilitiesSection: {
    eyebrow: 'Specialized Expertise',
    heading: 'Engineering scalable products on Bubble',
    description:
      'Bridging the gap between rapid no-code development cycles and production-grade software performance.',
  },

  capabilities: [
    {
      id: 'product-ux-design',
      icon: 'design_services',
      title: 'Product & UX Design',
      description:
        'Design systems, user research, wireframing, high-fidelity prototyping, and user-centred interface design.',
    },
    {
      id: 'bubble-fullstack',
      icon: 'devices',
      title: 'Bubble.io Full-Stack',
      description:
        'Scalable database schemas, complex workflows, custom plugins, responsive web and mobile applications.',
    },
    {
      id: 'ai-workflows-apis',
      icon: 'smart_toy',
      title: 'AI Workflows & APIs',
      description:
        'LLM integration, AI-powered applications, API integrations, automation, and event-driven workflows.',
    },
    {
      id: 'modern-tech-code',
      icon: 'code',
      title: 'Modern Tech & Code',
      description:
        'JavaScript, TypeScript, HTML, CSS, Git, GitHub, and AI-assisted modern development.',
    },
  ] as CapabilityItem[],

  aboutSection: {
    eyebrow: 'About',
    heading: 'Designing with structure, building for real-world execution',
    paragraphs: [
      'With a foundation in Computer Science and a Google UX Design Professional Certificate, I approach digital product creation from both an engineering and user-centred design perspective.',
      'I specialise in taking products from early discovery, information architecture, and interface design through to full-stack development in Bubble.io—structuring relational databases, payment workflows, and third-party API integrations alongside modern AI-assisted software development practices.',
    ],
    highlights: [
      { label: 'Academic Foundation', value: 'Computer Science Background' },
      { label: 'UX Credential', value: 'Google UX Design Professional Certificate' },
      { label: 'Core Stack', value: 'Bubble.io, TypeScript, AI Workflows & APIs' },
    ],
  },

  approachSection: {
    heading: 'What working with me looks like',
    subheading:
      'How I partner with founders and teams to take ideas from product thinking through to deployed software.',
    items: [
      {
        id: 'product-minded-thinking',
        title: 'Product-minded thinking',
        description:
          'I approach projects by understanding the problem, the users, and the business requirements before designing solutions.',
        subtitle: 'Discovery • Information Architecture • User Flows',
      },
      {
        id: 'design-through-to-development',
        title: 'Design through to development',
        description:
          'I combine UX design and hands-on development to take ideas beyond visual concepts and turn them into working applications.',
        subtitle: 'UI/UX Design • Bubble.io Full-Stack • AI-Assisted Delivery',
      },
    ] as ApproachItem[],
  },

  footer: {
    headline: "Let's build something extraordinary together.",
    ctaLabel: 'Schedule a Call',
    copyright: `© ${new Date().getFullYear()} Chukwuemeka Victor. All rights reserved.`,
  },
};

