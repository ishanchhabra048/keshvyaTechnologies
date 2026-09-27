import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Aurora from '../layout/Aurora.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner({
  eyebrow = 'READY TO ELEVATE YOUR BRAND?',
  title = 'Have a project in mind?',
  subtitle = 'Tell us about your goals and vision. We review every inquiry and reply with a tailored roadmap within one business day.',
  buttonText = 'Start a project',
  buttonTo = '/contact',
  className = '',
}) {
  return (
    <Reveal className={`w-full ${className}`}>
      <Card
        gradientBorder
        className="relative overflow-hidden p-8 sm:p-14 md:p-16 text-center flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl"
      >
        <Aurora intensity="medium" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="eyebrow mb-4">{eyebrow}</span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-fg tracking-tight leading-tight">
            {title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-fg-2 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button to={buttonTo} variant="primary" size="lg" iconRight={ArrowRight}>
              {buttonText}
            </Button>
            <Button to="/pricing" variant="ghost" size="lg">
              View transparent pricing
            </Button>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
