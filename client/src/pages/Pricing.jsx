import Seo from '../components/ui/Seo.jsx';
import PricingHero from '../components/sections/pricing/PricingHero.jsx';
import PlansGrid from '../components/sections/pricing/PlansGrid.jsx';
import ComparisonTable from '../components/sections/pricing/ComparisonTable.jsx';
import AddOnsGrid from '../components/sections/pricing/AddOnsGrid.jsx';
import FaqSection from '../components/sections/pricing/FaqSection.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import Section from '../components/ui/Section.jsx';

export default function Pricing() {
  return (
    <>
      <Seo
        title="Pricing & Packages"
        description="Transparent, fixed-scope web design and development packages with zero hidden retainers."
        path="/pricing"
      />

      <PricingHero />
      <PlansGrid />
      <ComparisonTable />
      <AddOnsGrid />
      <FaqSection />

      <Section tone="base" className="pt-0">
        <CtaBanner />
      </Section>
    </>
  );
}
