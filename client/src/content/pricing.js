export const pricingData = {
  currency: '$',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '499',
      period: 'one-time',
      description: 'Ideal for personal brands, consultants, and small local businesses needing a high-polish storefront.',
      popular: false,
      ctaText: 'Get started',
      ctaTo: '/contact',
      features: [
        'Up to 5 custom pages',
        'Responsive layout (Mobile to 4K)',
        'Design system token styling',
        'Validated contact inquiry form',
        'Essential SEO & Open Graph meta',
        '1 round of revisions',
        '~1 week delivery timeline',
        '14 days post-launch support'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: '1,499',
      period: 'one-time',
      description: 'Our most popular package for growing companies needing full customization, CMS, and dynamic showcase.',
      popular: true,
      ctaText: 'Get started',
      ctaTo: '/contact',
      features: [
        'Up to 10 bespoke pages',
        'Full custom UI/UX design in Figma',
        'Custom Admin Panel & CMS',
        'Dynamic Project Portfolio CRUD',
        'Cloudinary image pipeline',
        'Framer Motion micro-animations',
        'Core Web Vitals 95+ guarantee',
        '3 rounds of revisions',
        '2–3 weeks delivery timeline',
        '60 days priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'milestone-based',
      description: 'Tailored for complex web applications, high-traffic portals, and bespoke SaaS platforms.',
      popular: false,
      ctaText: 'Talk to us',
      ctaTo: '/contact',
      features: [
        'Unlimited custom pages & views',
        'Bespoke backend architecture',
        'Role-based auth & permissions',
        'Third-party API & CRM integrations',
        'Custom database schema & indexing',
        'Automated CI/CD deployment pipeline',
        'Contract-based revisions',
        'Milestone-driven roadmap',
        'Dedicated SLA & ongoing maintenance'
      ]
    }
  ],
  comparison: [
    { feature: 'Target Scope', starter: 'Up to 5 pages', business: 'Up to 10 pages', enterprise: 'Custom scope' },
    { feature: 'Design Fidelity', starter: 'Design system based', business: '100% Bespoke Figma', enterprise: 'Full Brand System' },
    { feature: 'Admin CMS / CRUD', starter: false, business: true, enterprise: true },
    { feature: 'Image CDN Pipeline', starter: false, business: true, enterprise: true },
    { feature: 'Micro-interactions', starter: 'Standard', business: 'Advanced 60fps', enterprise: 'Custom 3D / WebGL' },
    { feature: 'SEO & Structured Data', starter: 'Basic Meta', business: 'Full JSON-LD + Sitemap', enterprise: 'Enterprise Technical SEO' },
    { feature: 'Revision Rounds', starter: '1 round', business: '3 rounds', enterprise: 'Agreed in contract' },
    { feature: 'Delivery Speed', starter: '~1 week', business: '2–3 weeks', enterprise: 'Milestone roadmap' },
    { feature: 'Post-launch Support', starter: '14 days', business: '60 days', enterprise: 'Custom SLA' }
  ],
  addOns: [
    { title: 'Extra Page Design & Build', fromPrice: '$99', description: 'Additional fully responsive page crafted to match your design system.' },
    { title: 'Logo & Brand Identity Kit', fromPrice: '$299', description: 'Logomark, typography hierarchy, colour palette, and export assets.' },
    { title: 'Professional Content Writing', fromPrice: '$199', description: 'Conversion-optimized copywriting tailored to your target audience.' },
    { title: 'Monthly Maintenance & Care', fromPrice: '$149/mo', description: 'Weekly backups, uptime monitoring, dependency patching, and minor updates.' },
    { title: 'Domain & Hosting Setup', fromPrice: '$49', description: 'DNS configuration, SSL certificate issuance, and CDN optimization.' },
    { title: 'Comprehensive SEO Audit', fromPrice: '$149', description: 'Deep Core Web Vitals analysis, keyword taxonomy, and ranking strategy.' }
  ]
};
