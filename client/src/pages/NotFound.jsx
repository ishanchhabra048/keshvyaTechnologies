import Seo from '../components/ui/Seo.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Aurora from '../components/layout/Aurora.jsx';
import GradientText from '../components/ui/GradientText.jsx';
import Reveal from '../components/ui/Reveal.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found (404)" noindex={true} />

      <div className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        <Aurora intensity="low" />

        <Container className="relative z-10 text-center max-w-lg mx-auto">
          <Reveal delay={0.05}>
            <span className="eyebrow mb-4 inline-block">404 ERROR</span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-7xl sm:text-9xl font-black font-display tracking-tighter leading-none mb-4">
              <GradientText>404</GradientText>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-fg tracking-tight">
              Page Not Found
            </h1>
            <p className="mt-3 text-base text-fg-2 leading-relaxed">
              The page you are looking for may have been relocated, removed, or never existed in the first place.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button to="/" variant="primary" size="lg">
                Go Home
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
