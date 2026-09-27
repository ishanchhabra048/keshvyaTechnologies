import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Button from '../../ui/Button.jsx';
import Badge from '../../ui/Badge.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { pricingData } from '../../../content/pricing.js';
import { ArrowRight } from 'lucide-react';

export default function PricingTeaserSection() {
  return (
    <Section tone="elevated" id="pricing-teaser">
      <SectionHeader
        eyebrow="TRANSPARENT PRICING"
        title="Predictable plans for every stage"
        subtitle="No hidden retainers, no mystery billable hours. Clear, fixed-scope packages built to scale."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingData.plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.1}>
            <Card
              spotlight
              gradientBorder={plan.popular}
              className={`flex flex-col justify-between p-6 sm:p-8 h-full ${
                plan.popular ? 'border-accent/40 bg-surface/90 shadow-xl' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-fg tracking-tight">{plan.name}</h3>
                  {plan.popular && (
                    <Badge tone="accent">Most popular</Badge>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-display text-fg">
                    {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-mono text-fg-3">/{plan.period}</span>
                  )}
                </div>

                <p className="mt-3 text-sm text-fg-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border-subtle">
                <Button
                  to="/pricing"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full justify-center"
                >
                  Explore Plan Details
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to="/pricing" variant="ghost" size="lg" iconRight={ArrowRight}>
          View full package comparison & FAQ
        </Button>
      </div>
    </Section>
  );
}
