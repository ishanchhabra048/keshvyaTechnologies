import * as LucideIcons from 'lucide-react';
import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { values } from '../../../content/values.js';

export default function ValuesSection() {
  return (
    <Section tone="elevated">
      <SectionHeader
        eyebrow="OUR PRINCIPLES"
        title="What guides our engineering"
        subtitle="We operate with four non-negotiable core values that dictate how we write code, design interfaces, and interact with partners."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((val, index) => {
          const IconComponent = LucideIcons[val.icon] || LucideIcons.Sparkles;
          return (
            <Reveal key={val.title} delay={index * 0.08}>
              <Card spotlight className="p-8 h-full flex flex-col justify-start">
                <div className="p-3 w-fit rounded-xl bg-accent/10 text-accent mb-6 border border-accent/20">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-fg tracking-tight">{val.title}</h3>
                <p className="mt-3 text-fg-2 text-sm sm:text-base leading-relaxed">
                  {val.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
