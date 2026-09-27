import Section from '../../ui/Section.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { brand } from '../../../config/site.js';
import { Calendar, Users, MapPin, Award } from 'lucide-react';

export default function StorySection() {
  return (
    <Section tone="base" className="pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Story copy */}
        <div className="lg:col-span-7 space-y-6 text-fg-2 text-base sm:text-lg leading-relaxed">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-fg tracking-tight">
              Why We Started
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              We founded {brand.name} in {brand.founded} out of frustration with the bloated timelines and cookie-cutter templates rampant across modern web agencies. Too many clients were paying five-figure retainers only to receive generic theme setups that stalled on mobile and failed to convert.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              We set out to build something different: a focused studio where clients collaborate directly with senior engineers and principal designers. Every project is built from scratch with custom design systems, clean modern frameworks, and measurable performance standards.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Today, we partner with ambitious venture-backed startups, boutique retail brands, and professional practices worldwide to build digital storefronts and web applications that stand out in crowded markets.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Studio Fast Facts Card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <Card gradientBorder className="p-8 space-y-6">
              <h3 className="text-xl font-bold text-fg tracking-tight pb-4 border-b border-border-subtle">
                Studio Facts
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-fg-3">Founded</p>
                    <p className="text-base font-semibold text-fg">{brand.founded}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent-2/10 text-accent-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-fg-3">Core Team</p>
                    <p className="text-base font-semibold text-fg">{brand.teamSize} Senior Craftsmen</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent-3/10 text-accent-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-fg-3">Headquarters</p>
                    <p className="text-base font-semibold text-fg">{brand.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-success/10 text-success">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-fg-3">Client Retention</p>
                    <p className="text-base font-semibold text-fg">94% Long-Term Partners</p>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
