import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';

const milestones = [
  {
    year: '2021',
    title: 'Studio Founded',
    description: 'Started as a boutique two-person engineering lab serving early-stage tech startups.'
  },
  {
    year: '2023',
    title: 'First 25 Projects Shipped',
    description: 'Scaled to a full design system studio, expanding into enterprise SaaS portals and bespoke e-commerce.'
  },
  {
    year: '2024',
    title: 'Global Client Network',
    description: 'Partnered with international clients across North America, Europe, and Asia-Pacific.'
  },
  {
    year: '2025–Now',
    title: 'Core Design System 2.0',
    description: 'Launched our proprietary dark-theme framework and automated CI/CD performance pipeline.'
  }
];

export default function MilestonesSection() {
  return (
    <Section tone="elevated">
      <SectionHeader
        eyebrow="OUR JOURNEY"
        title="Key studio milestones"
        subtitle="A look back at how our studio evolved from an experimental coding lab to an established web consultancy."
        align="center"
      />

      <div className="mt-12 sm:mt-16 max-w-4xl mx-auto relative">
        {/* Center line on lg */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border-subtle" />

        <div className="space-y-8 lg:space-y-12">
          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={m.year}
                className={`relative flex flex-col lg:flex-row items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Year Pill Center */}
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 mb-4 lg:mb-0 z-10">
                  <div className="px-4 py-1.5 rounded-full bg-surface border border-accent/40 font-mono text-xs font-bold text-accent-2 shadow-lg">
                    {m.year}
                  </div>
                </div>

                {/* Content Card (Half width on lg) */}
                <div className="w-full lg:w-1/2 px-0 lg:px-8">
                  <Reveal delay={index * 0.1}>
                    <Card spotlight className="p-6 sm:p-8">
                      <h3 className="text-lg sm:text-xl font-bold text-fg tracking-tight">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm text-fg-2 leading-relaxed">
                        {m.description}
                      </p>
                    </Card>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
