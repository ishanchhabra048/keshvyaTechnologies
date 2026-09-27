# Agency Portfolio & Digital Storefront

A modern, high-performance, dark-themed agency portfolio and lead-generation website built with React 18, Vite 5, Tailwind CSS, Node.js 20, Express, MongoDB Atlas, and Cloudinary.

---

## 🌟 Key Features

- **Signature Aesthetic**: "Midnight Aurora" dark theme with layered surfaces, subtle violet/cyan floating aurora orbs, fine film-grain noise overlay, and interactive cursor spotlight cards.
- **Dynamic Project Portfolio**: API-driven project showcase with category filter chips, infinite "Load more" pagination, markdown case studies, results metrics, sticky sidebar, and lightbox image gallery.
- **Transparent Pricing**: 3-tier package cards, detailed feature comparison matrix, modular add-on services grid, and interactive FAQ accordion.
- **Lead Capture Engine**: Validated project inquiry form with honeypot anti-spam trap, rate limiting, MongoDB persistence, and automatic asynchronous SMTP email dispatch.
- **Admin Management Console**:
  - Secure JWT authentication in httpOnly cookies.
  - Interactive Dashboard with real-time project and lead metrics.
  - Project CRUD with multi-image Cloudinary uploads, live markdown preview, results repeater, and draft/publish toggles.
  - Lead Inbox with status workflow (`new`, `read`, `replied`, `archived`) and one-click `mailto:` replies.
- **Production Hardened**: Helmet security headers, Mongo operator sanitization, CORS allowlists, same-origin API proxy rewrites, automated CI/CD pipeline, and WCAG 2.1 AA accessibility.

---

## 🛠️ Tech Stack

### Client (`/client`)
- **Framework**: React 18 (Vite 5)
- **Styling**: Tailwind CSS 3.4 with custom CSS variable tokens
- **Motion & Scrolling**: Framer Motion, Lenis Smooth Scroll
- **Server State & Data Fetching**: TanStack Query v5 (React Query), Axios
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **SEO & Meta**: `react-helmet-async`, structured JSON-LD data (Organization, WebSite, CreativeWork), automated sitemap generator
- **Icons & Notifications**: `lucide-react`, `sonner` toasts, `react-markdown`

### Server (`/server`)
- **Runtime**: Node.js 20 LTS (ES Modules)
- **Framework**: Express 4
- **Database**: MongoDB Atlas + Mongoose 8
- **Authentication**: JWT in `httpOnly` secure cookies + bcryptjs password hashing (cost 12)
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize, CORS allowlist
- **Media Pipeline**: Cloudinary API + Multer memory storage
- **Email**: Nodemailer SMTP

---

## 📁 Repository Structure

```text
agency-portfolio/
├── client/                           # React + Vite SPA
│   ├── public/                       # Favicon, robots.txt, sitemap.xml, placeholder SVGs
│   ├── scripts/generate-sitemap.js   # Pre-build sitemap generator
│   ├── src/
│   │   ├── main.jsx                  # Root providers (QueryClient, Helmet, Auth, Sonner)
│   │   ├── App.jsx                   # Router, public layout & protected admin routes
│   │   ├── config/site.js            # Brand identity, navigation, socials, hero chips
│   │   ├── content/                  # Static content files (services, pricing, team, etc.)
│   │   ├── context/AuthContext.jsx   # Admin authentication context
│   │   ├── hooks/                    # useProjects, useProject, useSubmitInquiry, useSpotlight
│   │   ├── lib/                      # api.js, queryClient.js, utils.js, motion.js
│   │   ├── components/
│   │   │   ├── ui/                   # Button, Card, Badge, Modal, Input, Select, etc.
│   │   │   ├── layout/               # Navbar, Footer, Aurora, NoiseOverlay, ScrollToTop
│   │   │   ├── features/             # ProjectCard, ProjectGrid, PricingCard, ContactForm
│   │   │   └── sections/             # Home, About, Pricing, and CTA banner sections
│   │   └── pages/                    # Home, About, Pricing, Contact, ProjectDetail, NotFound
│   │       └── admin/                # Login, Dashboard, Projects, ProjectForm, Inquiries
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vercel.json                   # API proxy rewrite & SPA routing
│   └── vite.config.js
├── server/                           # Express REST API
│   ├── src/
│   │   ├── server.js                 # HTTP listener & database bootstrap
│   │   ├── app.js                    # Express middleware configuration
│   │   ├── config/                   # env.js (Zod validated), db.js, cloudinary.js
│   │   ├── models/                   # Project.js, Inquiry.js, User.js
│   │   ├── routes/                   # auth, project, inquiry, admin routes
│   │   ├── controllers/              # Thin request handlers
│   │   ├── services/                 # Business logic & database operations
│   │   ├── middleware/               # auth, validate, rateLimit, errorHandler, upload
│   │   ├── validators/               # Zod schemas (auth, project, inquiry)
│   │   └── scripts/seed.js           # Idempotent seed script (admin + 6 case studies)
│   └── tests/                        # Vitest + Supertest + MongoMemoryServer test suites
├── .github/workflows/ci.yml          # GitHub Actions CI workflow
├── package.json                      # Monorepo scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20 or higher
- **MongoDB**: Local MongoDB or free MongoDB Atlas cluster

### 2. Installation
Install all root, client, and server dependencies with a single command:
```bash
npm run install:all
```

### 3. Environment Setup
Configure your environment variables:

**Server (`server/.env`)**:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agency
JWT_SECRET=super_secret_jwt_key_that_is_at_least_32_characters_long
JWT_EXPIRES_IN=1d
CLIENT_ORIGINS=http://localhost:5173

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional: SMTP for contact form emails
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_FROM="Agency Studio <no-reply@yourdomain.com>"
MAIL_TO="inbox@yourdomain.com"

# Admin seed credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecurepassword123
```

**Client (`client/.env`)**:
```env
VITE_API_BASE_URL=/api
VITE_SITE_URL=http://localhost:5173
```

### 4. Seed Database
Seed the database with the default admin account and 6 rich placeholder case studies:
```bash
npm run seed --prefix server
```

### 5. Start Development Servers
Run both client (Vite on `http://localhost:5173`) and server (Express on `http://localhost:5000`) concurrently:
```bash
npm run dev
```

---

## 🧪 Testing & Code Quality

Run tests across both client and server:
```bash
npm test
```

Run ESLint across both workspaces:
```bash
npm run lint
```

Build client for production (including automated sitemap generation):
```bash
npm run build
```

---

## 🔐 Admin Console Access

1. Open `http://localhost:5173/admin/login` in your browser.
2. Sign in with the seeded admin credentials:
   - **Email**: `admin@example.com` (or value of `ADMIN_EMAIL`)
   - **Password**: `supersecurepassword123` (or value of `ADMIN_PASSWORD`)
3. From the admin console, you can:
   - Create, edit, publish, and delete projects.
   - Upload media directly to Cloudinary.
   - View, filter, and update status on client inquiries.

---

## 📦 Production Deployment

### 1. Backend on Render
1. Create a **Web Service** pointing to the repository.
2. **Root Directory**: `server`
3. **Build Command**: `npm ci`
4. **Start Command**: `npm start`
5. **Health Check Path**: `/api/health`
6. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGINS` (set to your Vercel frontend URL), `CLOUDINARY_*`, `SMTP_*`.

### 2. Frontend on Vercel
1. Import the repository on Vercel.
2. **Root Directory**: `client`
3. **Framework Preset**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. In `client/vercel.json`, verify that the `/api/:path*` rewrite points to your Render web service URL.

---

## 📝 License
Proprietary — All rights reserved.
