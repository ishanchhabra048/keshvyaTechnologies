import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import ProcessStep from '../../features/ProcessStep.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { processSteps } from '../../../content/process.js';

export default function ProcessSection() {
  return (
    <Section tone="elevated" id="process">
      <SectionHeader
        eyebrow="HOW WE WORK"
        title="A clear path from idea to launch"
        subtitle="Our battle-tested sprint methodology eliminates guesswork, keeps you in control, and guarantees on-time delivery."
        align="center"
      />

      <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
        {processSteps.map((step, index) => (
          <Reveal key={step.step} delay={index * 0.08}>
            <ProcessStep
              step={step}
              isLast={index === processSteps.length - 1}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
