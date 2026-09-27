import Container from '../../ui/Container.jsx';
import Aurora from '../../layout/Aurora.jsx';
import GradientText from '../../ui/GradientText.jsx';
import Reveal from '../../ui/Reveal.jsx';

export default function PricingHero() {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      <Aurora intensity="low" />
      <Container className="relative z-10 text-center max-w-3xl mx-auto">
        <Reveal delay={0.05}>
          <span className="eyebrow mb-3 inline-block">PRICING</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-fg tracking-tight leading-tight">
            Simple, <GradientText>transparent</GradientText> pricing
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-lg sm:text-xl text-fg-2 leading-relaxed">
            Fixed-scope packages with zero surprises or hidden retainers. Need something custom? Let us discuss your specific architecture.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
