import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import Button from '../../ui/Button.jsx';
import GradientText from '../../ui/GradientText.jsx';
import Container from '../../ui/Container.jsx';
import Aurora from '../../layout/Aurora.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { brand, heroChips } from '../../../config/site.js';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <Aurora intensity="high" />

      {/* Background Grid Lines with radial fade mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border-subtle shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
                <span className="eyebrow">WEB DESIGN & DEVELOPMENT STUDIO</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-display text-fg tracking-tight leading-[1.05]">
                We build websites that make brands <GradientText>unforgettable.</GradientText>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-lg sm:text-xl text-fg-2 max-w-xl leading-relaxed">
                {brand.name} is a full-service web studio crafting fast, beautiful, conversion-focused websites and scalable web applications for ambitious businesses.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/contact" variant="primary" size="lg" iconRight={ArrowRight}>
                  Start a project
                </Button>
                <Button to="/#work" variant="secondary" size="lg">
                  View our work
                </Button>
              </div>
            </Reveal>

            {/* Trust Chips */}
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-border-subtle">
                {heroChips.map((chip, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-fg-2">
                    <CheckCircle className="w-4 h-4 text-accent-2 shrink-0" />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Floating Visual Preview Cards */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px]">
              {/* Back card */}
              <div className="absolute top-4 right-0 w-72 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border p-4 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-surface-hover mb-3">
                  <img
                    src="/placeholders/project-2.svg"
                    alt="Fintech Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-fg">Atlas Analytics</h4>
                    <p className="text-xs text-fg-3">Web Application</p>
                  </div>
                  <span className="font-mono text-xs text-accent-2">+120% Vol</span>
                </div>
              </div>

              {/* Front Main card */}
              <div className="absolute bottom-6 left-0 w-80 rounded-2xl bg-surface/90 backdrop-blur-xl border border-accent/30 p-5 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-surface-hover mb-4 relative">
                  <img
                    src="/placeholders/project-1.svg"
                    alt="Lumen Coffee Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold text-white">
                    Featured
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-base font-semibold text-fg">Lumen Coffee Co.</h4>
                    <p className="text-xs text-fg-3">E-Commerce & Subscriptions</p>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
