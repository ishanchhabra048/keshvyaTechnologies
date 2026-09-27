/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://example.com';
const API_URL = process.env.SITEMAP_API_URL || 'http://localhost:5000/api/projects';

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { url: '/contact', priority: '0.9', changefreq: 'monthly' },
];

async function generateSitemap() {
  const routes = [...staticRoutes];

  try {
    const res = await fetch(`${API_URL}?limit=50`);
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        data.data.forEach((p) => {
          routes.push({
            url: `/projects/${p.slug}`,
            priority: '0.7',
            changefreq: 'monthly',
            lastmod: p.updatedAt || p.publishedAt,
          });
        });
      }
    }
  } catch {
    console.warn('Could not fetch projects for sitemap, falling back to static routes only.');
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>${
      r.lastmod ? `\n    <lastmod>${new Date(r.lastmod).toISOString()}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log(`Generated sitemap with ${routes.length} routes.`);
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(0); // fail-soft
});
