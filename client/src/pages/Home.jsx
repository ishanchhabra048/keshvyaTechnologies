import Seo from '../components/ui/Seo.jsx';
import Hero from '../components/sections/home/Hero.jsx';
import MarqueeSection from '../components/sections/home/MarqueeSection.jsx';
import StatsSection from '../components/sections/home/StatsSection.jsx';
import ServicesSection from '../components/sections/home/ServicesSection.jsx';
import WorkSection from '../components/sections/home/WorkSection.jsx';
import ProcessSection from '../components/sections/home/ProcessSection.jsx';
import TestimonialsSection from '../components/sections/home/TestimonialsSection.jsx';
import PricingTeaserSection from '../components/sections/home/PricingTeaserSection.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import Section from '../components/ui/Section.jsx';
import { brand } from '../config/site.js';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${brand.url}/#organization`,
        name: brand.name,
        url: brand.url,
        description: brand.tagline,
        email: brand.email,
        telephone: brand.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: brand.city,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${brand.url}/#website`,
        url: brand.url,
        name: brand.name,
        publisher: { '@id': `${brand.url}/#organization` },
      },
    ],
  };

  return (
    <>
      <Seo
        title="Web Design & Development Studio"
        description={`${brand.name} crafts fast, beautiful, conversion-focused websites and web apps for ambitious businesses.`}
        path="/"
        jsonLd={jsonLd}
      />

      <Hero />
      <MarqueeSection />
      <StatsSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingTeaserSection />

      <Section tone="base" className="pt-0">
        <CtaBanner />
      </Section>
    </>
  );
}
