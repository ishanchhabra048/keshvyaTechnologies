import { Helmet } from 'react-helmet-async';
import { brand } from '../../config/site.js';

export default function Seo({
  title,
  description = brand.tagline,
  path = '',
  image = '/og-image.png',
  type = 'website',
  jsonLd = null,
  noindex = false,
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || brand.url;
  const canonicalUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
  const pageTitle = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.tagline}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={brand.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
