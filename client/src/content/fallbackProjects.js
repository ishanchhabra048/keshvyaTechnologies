export const fallbackProjects = [
  {
    _id: 'seed-p1',
    title: 'AnyFeast Nutritionist Portal & Seminar Platform',
    slug: 'anyfeast-nutrition-seminar',
    category: 'web-app',
    featured: true,
    order: 1,
    industry: 'HealthTech & Nutrition',
    clientName: 'AnyFeast (London, UK)',
    year: 2026,
    liveUrl: 'https://anyfeast.com/nutriton-seminar',
    techStack: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Azure OpenAI', '@react-pdf/renderer', 'JWT', 'RBAC'],
    summary: 'Production nutrition platform and seminar publishing engine enabling dietitians to manage clients, consultations, AI-augmented 7-day diet plans, and branded PDF generation.',
    description: `### The Challenge
AnyFeast needed a unified digital ecosystem for certified nutritionists to manage client consultation rosters, generate personalized multi-day nutrition programs, and coordinate live public educational seminars. The existing manual workflows caused operational friction in meal plan generation and lacked unified event registration.

### The Solution
Engineered full-stack web applications and robust REST APIs with Node.js, Express.js, and PostgreSQL:
- **Client & Consultation Portal**: Role-Based Access Control (RBAC) allowing nutritionists to securely track client health histories and consultation progress.
- **Interactive 7-Day Diet Form & PDF Engine**: Integrated \`@react-pdf/renderer\` to dynamically compile branded, downloadable meal plans tailored to individual dietary requirements.
- **AI-Powered Workflows**: Integrated Azure OpenAI to assist nutritionists in meal recommendation drafting and macro balance calculations.
- **Nutrition Seminar Platform**: Built the seminar management system enabling dietitians to publish events surfaced directly within the nutritionist portal with automated email notification workflows.

### The Outcome
Successfully deployed on the company's official website for production use, accelerating meal-plan generation by 75% and fully automating event communications.`,
    results: [
      { label: 'Diet Plan Turnaround', value: '75% Faster' },
      { label: 'Event Email Automation', value: '100% Automated' }
    ],
    testimonial: {
      quote: 'The Nutritionist Portal and Seminar platform transformed our daily operations. Generating custom PDFs and publishing live seminars is now completely frictionless.',
      author: 'Nutrition Team Lead',
      role: 'AnyFeast Platform'
    },
    status: 'published',
    publishedAt: '2026-03-15T10:00:00Z',
    coverImage: { url: '/projects/anyfeast.png', publicId: 'anyfeast-cover', alt: 'AnyFeast Live Nutrition Sessions & Dietitian Platform' },
    gallery: [
      { url: '/projects/anyfeast.png', publicId: 'anyfeast-1', alt: 'AnyFeast Live Nutrition Sessions' }
    ]
  },
  {
    _id: 'seed-p2',
    title: 'Tiffino - Food Delivery & Kitchens Platform',
    slug: 'food-delivery-backend',
    category: 'web-app',
    featured: true,
    order: 2,
    industry: 'Food & Beverage / Logistics',
    clientName: 'Tiffino Fresh & Fast',
    year: 2026,
    liveUrl: 'https://food-delivery-backend-lake-seven.vercel.app/',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs', 'RBAC', 'Mongoose'],
    summary: 'Curated dining and artisan tiffins food delivery platform with modular REST API, multi-cuisine filtering, and real-time order tracking.',
    description: `### The Challenge
Modern food delivery platforms require resilient, low-latency API architectures capable of handling multi-tenant restaurant catalogs, dynamic cart mutations, strict authorization policies, and atomic order consistency checks.

### The Solution
Architected and deployed a modular REST API backend using Node.js, Express.js, and MongoDB:
- **Authentication & Security**: Implemented JWT-based authentication with access and refresh token rotation, secure password hashing, and Role-Based Access Control (Customer, Restaurant Partner, Admin).
- **Resource Management**: Built REST endpoints for users, restaurants, menus, delivery addresses, carts, and orders with strict ownership and authorization checks.
- **Cart & Order Integrity**: Implemented multi-restaurant validation, address verification, and transactional order checkout workflows.
- **Production Deployment**: Deployed to cloud with live health monitoring and production CORS safeguards.

### The Outcome
Delivered sub-50ms API response times across core endpoints and 100% data integrity during multi-item concurrent checkout operations.`,
    results: [
      { label: 'API Response Latency', value: '< 50ms' },
      { label: 'REST Endpoints Covered', value: '25+ Routes' }
    ],
    testimonial: {
      quote: 'A clean, well-structured Node.js backend with rock-solid authorization, robust error handling, and airtight cart-to-checkout validation.',
      author: 'Technical Reviewer',
      role: 'Backend Engineering'
    },
    status: 'published',
    publishedAt: '2026-02-10T12:00:00Z',
    coverImage: { url: '/projects/tiffino-food-delivery.png', publicId: 'tiffino-cover', alt: 'Tiffino Food Delivery & Kitchens Platform UI' },
    gallery: [
      { url: '/projects/tiffino-food-delivery.png', publicId: 'tiffino-1', alt: 'Explore Kitchens & Restaurants UI' }
    ]
  },
  {
    _id: 'seed-p3',
    title: 'Event Management & Booking Platform',
    slug: 'event-management-platform',
    category: 'web-app',
    featured: true,
    order: 3,
    industry: 'Event Tech & Ticketing',
    clientName: 'MERN Event Hub',
    year: 2025,
    liveUrl: 'https://github.com/ishanchhabra048',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Email OTP', 'Tailwind CSS'],
    summary: 'Full-stack event discovery and reservation platform featuring email OTP verification, interactive ticket bookings, and organizer analytics dashboard.',
    description: `### The Challenge
Event organizers needed a streamlined, full-stack ticketing platform that eliminates fraudulent registrations while offering attendees an intuitive discovery and booking interface.

### The Solution
Developed a full-stack MERN application integrating:
- **Email OTP Verification**: Secure two-factor account verification flow ensuring genuine user profiles.
- **Booking Management**: Real-time ticket allocation, booking confirmation generation, and cancellation policies.
- **Organizer Analytics Dashboard**: Interactive dashboard displaying event revenue, attendee demographics, and booking trends.
- **Responsive Client UI**: Built with React and Tailwind CSS for mobile-first ticket access and QR code generation.

### The Outcome
Delivered a frictionless event hosting experience with verified attendees and real-time attendance reporting.`,
    results: [
      { label: 'Attendee Verification', value: '100% OTP Verified' },
      { label: 'Booking Friction', value: '-60% Drop-off' }
    ],
    testimonial: {
      quote: 'The OTP-verified booking system and real-time organizer analytics made managing large scale events effortless.',
      author: 'Event Coordinator',
      role: 'Community Operations'
    },
    status: 'published',
    publishedAt: '2025-11-20T09:00:00Z',
    coverImage: { url: '/placeholders/project-3.svg', publicId: 'p3', alt: 'Event Management Platform UI' },
    gallery: [
      { url: '/placeholders/project-3.svg', publicId: 'p3-1', alt: 'Event Booking Interface' }
    ]
  },
  {
    _id: 'seed-p4',
    title: 'Lumen Coffee Roasters',
    slug: 'lumen-coffee-roasters',
    category: 'ecommerce',
    featured: false,
    order: 4,
    industry: 'Food & Beverage',
    clientName: 'Lumen Coffee Co.',
    year: 2025,
    liveUrl: 'https://example.com/lumen',
    techStack: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    summary: 'Direct-to-consumer artisanal coffee subscription and storefront built for conversion and seamless recurring orders.',
    description: `### The Challenge
Lumen Coffee Roasters needed to modernize their online presence and transition from a physical wholesale roastery to a high-converting digital storefront with recurring subscription capabilities.

### The Solution
We engineered a bespoke e-commerce experience from the ground up using React and Tailwind CSS on the frontend, paired with a robust Express backend. The custom subscription builder allows customers to choose their grind type, roast intensity, and delivery cadence with live pricing updates and instant checkout via Stripe Billing.

### The Outcome
Within the first 90 days following launch, Lumen saw a significant boost in subscriber lifetime value and sub-second page transitions across mobile devices.`,
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
    publishedAt: '2025-01-15T10:00:00Z',
    coverImage: { url: '/placeholders/project-4.svg', publicId: 'p4', alt: 'Lumen Coffee Roasters Storefront' },
    gallery: [
      { url: '/placeholders/project-4.svg', publicId: 'p4-1', alt: 'Subscription Configurator' }
    ]
  },
  {
    _id: 'seed-p5',
    title: 'Northwind Legal',
    slug: 'northwind-legal',
    category: 'website',
    featured: false,
    order: 5,
    industry: 'Legal & Professional Services',
    clientName: 'Northwind Law Group LLP',
    year: 2024,
    liveUrl: 'https://example.com/northwind',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
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
    publishedAt: '2024-11-20T09:00:00Z',
    coverImage: { url: '/placeholders/project-5.svg', publicId: 'p5', alt: 'Northwind Legal Editorial Webpage' },
    gallery: [
      { url: '/placeholders/project-5.svg', publicId: 'p5-1', alt: 'Practice Area Directory' }
    ]
  },
  {
    _id: 'seed-p6',
    title: 'Orbit Developer Tools',
    slug: 'orbit-developer-tools',
    category: 'branding',
    featured: false,
    order: 6,
    industry: 'Software & Developer Tools',
    clientName: 'Orbit Systems Inc.',
    year: 2025,
    liveUrl: 'https://example.com/orbit',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    summary: 'Interactive product launch landing page and visual identity system for next-generation cloud developer tooling.',
    description: `### The Challenge
Orbit was launching their cloud infrastructure debugger and required an arresting landing page with interactive terminal previews, feature benchmarks, and immediate dev signups.

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
    publishedAt: '2025-04-18T08:00:00Z',
    coverImage: { url: '/placeholders/project-6.svg', publicId: 'p6', alt: 'Orbit Developer Tools Landing Page' },
    gallery: [
      { url: '/placeholders/project-6.svg', publicId: 'p6-1', alt: 'Interactive Terminal Preview' }
    ]
  }
];
