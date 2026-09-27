import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { pricingData } from '../../../content/pricing.js';
import { PlusCircle } from 'lucide-react';

export default function AddOnsGrid() {
  return (
    <Section tone="base">
      <SectionHeader
        eyebrow="CUSTOM ENHANCEMENTS"
        title="Optional add-ons & services"
        subtitle="Enhance any package with modular additions tailored to your project scope."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingData.addOns.map((addon, index) => (
          <Reveal key={addon.title} delay={index * 0.05}>
            <Card spotlight className="p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2.5 rounded-lg bg-surface-hover text-accent">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-sm font-bold text-accent-2">
                    from {addon.fromPrice}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-fg tracking-tight">
                  {addon.title}
                </h3>
                <p className="mt-2 text-sm text-fg-2 leading-relaxed">
                  {addon.description}
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
