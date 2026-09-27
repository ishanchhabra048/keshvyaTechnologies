import Container from '../../ui/Container.jsx';
import Aurora from '../../layout/Aurora.jsx';
import GradientText from '../../ui/GradientText.jsx';
import Reveal from '../../ui/Reveal.jsx';

export default function AboutHero() {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      <Aurora intensity="low" />
      <Container className="relative z-10 text-center max-w-3xl mx-auto">
        <Reveal delay={0.05}>
          <span className="eyebrow mb-3 inline-block">ABOUT US</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-fg tracking-tight leading-tight">
            A small team obsessed with <GradientText>craft.</GradientText>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-lg sm:text-xl text-fg-2 leading-relaxed">
            We are engineers, designers, and strategists who believe great software is born from extreme attention to detail, tight feedback loops, and uncompromising technical standards.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
