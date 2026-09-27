import Section from '../../ui/Section.jsx';
import PricingCard from '../../features/PricingCard.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { pricingData } from '../../../content/pricing.js';

export default function PlansGrid() {
  return (
    <Section tone="base" className="pt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {pricingData.plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.1}>
            <PricingCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
