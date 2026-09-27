import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { techStack } from '../../../content/techStack.js';

const categories = [
  { key: 'frontend', title: 'Frontend Architecture', color: 'accent' },
  { key: 'backend', title: 'Backend & Databases', color: 'accent-2' },
  { key: 'design', title: 'Design & Prototyping', color: 'accent-3' },
  { key: 'devops', title: 'DevOps & Quality', color: 'success' },
];

export default function StackSection() {
  return (
    <Section tone="base">
      <SectionHeader
        eyebrow="MODERN TOOLING"
        title="Our production technology stack"
        subtitle="We build exclusively with battle-tested modern web tools engineered for maximum speed, security, and developer velocity."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Reveal key={cat.key} delay={index * 0.08}>
            <Card spotlight className="p-6 sm:p-8 h-full flex flex-col justify-start">
              <h3 className="text-lg font-bold text-fg tracking-tight pb-4 border-b border-border-subtle">
                {cat.title}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {techStack[cat.key]?.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium text-fg-2 bg-surface-hover border border-border-subtle"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
