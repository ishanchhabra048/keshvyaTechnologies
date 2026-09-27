import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';

export const seedProjects = [
  {
    title: 'Lumen Coffee Roasters',
    slug: 'lumen-coffee-roasters',
    category: 'ecommerce',
    featured: true,
    order: 1,
    industry: 'Food & Beverage',
    clientName: 'Lumen Coffee Co.',
    year: 2025,
    liveUrl: 'https://example.com/lumen',
    techStack: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    summary: 'A direct-to-consumer artisanal coffee subscription and storefront built for conversion and seamless customer retention.',
    description: `### The Challenge
Lumen Coffee Roasters needed to modernize their online presence and transition from a physical wholesale roastery to a high-converting digital storefront with recurring subscription capabilities. Their legacy platform suffered from slow load times, high cart abandonment rates, and an inability to customize roast preference tiers.

### The Solution
We engineered a bespoke e-commerce experience from the ground up using React and Tailwind CSS on the frontend, paired with a robust Express backend. The custom subscription builder allows customers to choose their grind type, roast intensity, and delivery cadence with live pricing updates and instant checkout via Stripe Billing.

### The Outcome
Within the first 90 days following launch, Lumen saw a significant boost in subscriber lifetime value, sub-second page transitions across mobile devices, and a streamlined management dashboard that automates roast batch orders and fulfillment workflows.`,
    results: [
      { label: 'Conversion Rate', value: '+140%' },
      { label: 'Monthly Recurring Revenue', value: '3.2x' }
    ],
    testimonial: {
      quote: 'The new storefront completely transformed how we sell coffee. Our recurring subscription volume quadrupled in three months.',
      author: 'Marcus Vance',
      role: 'Founder & Master Roaster'
    },
    status: 'published',
    publishedAt: new Date('2025-01-15T10:00:00Z'),
    coverImage: { url: '/placeholders/project-1.svg', publicId: 'p1', alt: 'Lumen Coffee Roasters Storefront' },
    gallery: [
      { url: '/placeholders/project-1.svg', publicId: 'p1-1', alt: 'Subscription Configurator' },
      { url: '/placeholders/project-2.svg', publicId: 'p1-2', alt: 'Mobile Checkout Flow' }
    ]
  },
  {
    title: 'Atlas Fintech Dashboard',
    slug: 'atlas-fintech-dashboard',
    category: 'web-app',
    featured: true,
    order: 2,
    industry: 'Financial Technology',
    clientName: 'Atlas Capital Partners',
    year: 2025,
    liveUrl: 'https://example.com/atlas',
    techStack: ['React', 'Express', 'PostgreSQL', 'Chart.js', 'WebSockets'],
    summary: 'Real-time multi-asset portfolio analytics platform for institutional traders and private wealth managers.',
    description: `### The Challenge
Atlas Capital required a unified risk assessment and portfolio visualization interface capable of processing live tick data, historical yield curves, and asset allocation simulations without UI frame drops.

### The Solution
We designed and implemented a dark-mode first, density-optimized dashboard application. Utilizing high-performance canvas chart renderers, WebSocket streams for live equity quotes, and optimistic UI updates, the interface delivers institutional-grade responsiveness.

### The Outcome
Traders now execute scenario analyses in seconds rather than minutes, reducing latency and giving portfolio managers real-time visibility across global currency pairs and structured products.`,
    results: [
      { label: 'Data Processing Latency', value: '< 20ms' },
      { label: 'Daily Active Traders', value: '12,500+' }
    ],
    testimonial: {
      quote: 'Exceptional craft and technical depth. They built an interface that handles complex financial telemetry with zero lag.',
      author: 'Elena Rostova',
      role: 'Chief Technology Officer'
    },
    status: 'published',
    publishedAt: new Date('2025-02-10T12:00:00Z'),
    coverImage: { url: '/placeholders/project-2.svg', publicId: 'p2', alt: 'Atlas Fintech Dashboard UI' },
    gallery: [
      { url: '/placeholders/project-2.svg', publicId: 'p2-1', alt: 'Real-time Telemetry Screen' },
      { url: '/placeholders/project-3.svg', publicId: 'p2-2', alt: 'Asset Allocation Matrix' }
    ]
  },
  {
    title: 'Northwind Legal',
    slug: 'northwind-legal',
    category: 'website',
    featured: false,
    order: 3,
    industry: 'Legal & Professional Services',
    clientName: 'Northwind Law Group LLP',
    year: 2024,
    liveUrl: 'https://example.com/northwind',
    techStack: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    summary: 'Authoritative, typography-forward web identity and attorney directory for a boutique corporate law firm.',
    description: `### The Challenge
Northwind Legal needed to differentiate themselves from traditional corporate law firms with a refined, contemporary brand presence that conveyed gravitas, technical precision, and modern accessibility.

### The Solution
We crafted an editorial layout leveraging custom typography scales, smooth scroll reveals, and an instant attorney directory search with practice area taxonomy filters.

### The Outcome
The firm saw a substantial increase in qualified partner inquiries and corporate consultation bookings within six weeks of launch.`,
    results: [
      { label: 'Qualified Lead Volume', value: '+85%' },
      { label: 'Average Session Duration', value: '4m 12s' }
    ],
    testimonial: {
      quote: 'Our new digital presence commands immediate respect. Clients frequently comment on how clear and elegant our site is.',
      author: 'David Sterling',
      role: 'Managing Partner'
    },
    status: 'published',
    publishedAt: new Date('2024-11-20T09:00:00Z'),
    coverImage: { url: '/placeholders/project-3.svg', publicId: 'p3', alt: 'Northwind Legal Editorial Webpage' },
    gallery: [
      { url: '/placeholders/project-3.svg', publicId: 'p3-1', alt: 'Practice Area Directory' }
    ]
  },
  {
    title: 'FitPulse Coaching App',
    slug: 'fitpulse-coaching-app',
    category: 'web-app',
    featured: false,
    order: 4,
    industry: 'Health & Fitness',
    clientName: 'FitPulse Global',
    year: 2025,
    liveUrl: 'https://example.com/fitpulse',
    techStack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    summary: 'Interactive workout programming, client habit tracking, and biometric reporting platform for elite fitness trainers.',
    description: `### The Challenge
Fitness coaches were managing hundreds of clients using disconnected spreadsheets, messaging apps, and PDF logs, causing high client churn and severe operational overhead.

### The Solution
We built an end-to-end coach and trainee web application with customizable routine templates, video exercise libraries, automated progression calculators, and secure client check-in portals.

### The Outcome
Coaches reduced weekly administrative workload by over 70%, allowing them to scale their client rosters while maintaining personalized feedback.`,
    results: [
      { label: 'Coach Admin Time Saved', value: '14 hrs/wk' },
      { label: 'Client Retention Rate', value: '94%' }
    ],
    testimonial: {
      quote: 'FitPulse has given my coaching business the platform it needed to scale sustainably to hundreds of athletes.',
      author: 'Samantha Cruz',
      role: 'Head of Coaching Operations'
    },
    status: 'published',
    publishedAt: new Date('2025-03-01T14:30:00Z'),
    coverImage: { url: '/placeholders/project-4.svg', publicId: 'p4', alt: 'FitPulse Coaching Portal' },
    gallery: [
      { url: '/placeholders/project-4.svg', publicId: 'p4-1', alt: 'Workout Planner Interface' }
    ]
  },
  {
    title: 'Verdant Interiors',
    slug: 'verdant-interiors',
    category: 'website',
    featured: false,
    order: 5,
    industry: 'Architecture & Design',
    clientName: 'Verdant Architecture Studio',
    year: 2024,
    liveUrl: 'https://example.com/verdant',
    techStack: ['React', 'Node.js', 'Cloudinary', 'Tailwind CSS'],
    summary: 'Immersive architectural portfolio showcasing high-end sustainable residential and commercial interior spaces.',
    description: `### The Challenge
Verdant Interiors needed an ultra-fluid, visually driven portfolio to exhibit high-resolution architectural photography across varying viewports without sacrificing performance or aesthetic delicacy.

### The Solution
We implemented dynamic picture grids, responsive image transformations via Cloudinary CDN, full-screen lightbox galleries, and subtle motion transitions that emphasize texture and natural lighting.

### The Outcome
The studio successfully secured several multi-million dollar residential design commissions directly through inbound portfolio inquiries.`,
    results: [
      { label: 'Lighthouse Performance Score', value: '98/100' },
      { label: 'Inbound Inquiries', value: '+110%' }
    ],
    testimonial: {
      quote: 'The portfolio feels like an interactive art exhibition. It captures the exact texture and quality of our physical spaces.',
      author: 'Claire Moreau',
      role: 'Principal Architect'
    },
    status: 'published',
    publishedAt: new Date('2024-09-12T11:00:00Z'),
    coverImage: { url: '/placeholders/project-5.svg', publicId: 'p5', alt: 'Verdant Interiors Architectural Showcase' },
    gallery: [
      { url: '/placeholders/project-5.svg', publicId: 'p5-1', alt: 'Gallery View' }
    ]
  },
  {
    title: 'Orbit SaaS Landing',
    slug: 'orbit-saas-landing',
    category: 'branding',
    featured: false,
    order: 6,
    industry: 'Software & Developer Tools',
    clientName: 'Orbit Systems Inc.',
    year: 2025,
    liveUrl: 'https://example.com/orbit',
    techStack: ['React', 'Tailwind', 'Lottie', 'Framer Motion'],
    summary: 'Interactive product launch landing page and 3D visual identity system for next-generation developer tooling.',
    description: `### The Challenge
Orbit was launching their breakthrough cloud infrastructure debugger and required an arresting landing page with interactive terminal previews, feature benchmarks, and immediate dev signups.

### The Solution
We built an immersive developer-centric landing experience featuring live code sandboxes, interactive architectural diagrams, and smooth keyframe animations.

### The Outcome
The launch campaign captured over 25,000 developer waitlist signups in the first 48 hours and reached #1 on Product Hunt.`,
    results: [
      { label: 'Waitlist Signups', value: '25,000+' },
      { label: 'Product Hunt Ranking', value: '#1 Product of Day' }
    ],
    testimonial: {
      quote: 'The landing page drove our launch to viral success. The animations and attention to detail blew our users away.',
      author: 'Julian Thorne',
      role: 'CEO & Co-founder'
    },
    status: 'published',
    publishedAt: new Date('2025-04-18T08:00:00Z'),
    coverImage: { url: '/placeholders/project-6.svg', publicId: 'p6', alt: 'Orbit SaaS Product Launch Page' },
    gallery: [
      { url: '/placeholders/project-6.svg', publicId: 'p6-1', alt: 'Interactive Terminal Preview' }
    ]
  }
];

export const runSeed = async () => {
  await connectDB();
  
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(seedProjects);
    console.log('Inserted 6 seed projects.');
  } else if (env.NODE_ENV !== 'production') {
    await Project.deleteMany({});
    await Project.insertMany(seedProjects);
    console.log('Re-inserted 6 seed projects in dev.');
  } else {
    console.log('Production DB has projects, skipping project seed.');
  }

  const adminEmail = (env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = env.ADMIN_PASSWORD || 'supersecurepassword123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await User.findOneAndUpdate(
    { email: adminEmail },
    { name: 'Studio Admin', passwordHash, role: 'admin' },
    { upsert: true, new: true }
  );
  console.log(`Admin user seeded: ${adminEmail}`);

  return true;
};

// If run directly via node CLI
if (process.argv[1]?.endsWith('seed.js')) {
  runSeed()
    .then(() => {
      console.log('Seed completed successfully.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}
