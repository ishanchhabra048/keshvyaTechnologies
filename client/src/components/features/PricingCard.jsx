import { Check } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

export default function PricingCard({ plan, className = '' }) {
  const isPopular = plan.popular;

  return (
    <Card
      spotlight
      gradientBorder={isPopular}
      className={`relative flex flex-col justify-between h-full ${
        isPopular ? 'p-8 sm:p-10 shadow-2xl border-accent/40 bg-surface/90' : 'p-6 sm:p-8'
      } ${className}`}
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-fg tracking-tight">{plan.name}</h3>
          {isPopular && (
            <Badge tone="accent" className="font-semibold">
              Most popular
            </Badge>
          )}
        </div>

        <p className="mt-3 text-sm text-fg-2 leading-relaxed min-h-[40px]">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-fg font-display tracking-tight">
            {plan.price.startsWith('$') || plan.price === 'Custom' ? plan.price : `$${plan.price}`}
          </span>
          {plan.period && (
            <span className="text-sm font-mono text-fg-3">/{plan.period}</span>
          )}
        </div>

        {/* Feature List */}
        <ul className="mt-8 space-y-3.5 border-t border-border-subtle pt-6">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-fg-2">
              <div className="mt-0.5 p-0.5 rounded-full bg-accent/15 text-accent shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-8 pt-4">
        <Button
          to={plan.ctaTo || '/contact'}
          variant={isPopular ? 'primary' : 'secondary'}
          size="lg"
          className="w-full justify-center"
        >
          {plan.ctaText || 'Get started'}
        </Button>
      </div>
    </Card>
  );
}
