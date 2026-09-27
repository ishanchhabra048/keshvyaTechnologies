import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import Accordion from '../../ui/Accordion.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { faqItems } from '../../../content/faq.js';

export default function FaqSection() {
  return (
    <Section tone="elevated" id="faq">
      <SectionHeader
        eyebrow="FREQUENTLY ASKED"
        title="Everything you need to know"
        subtitle="Common questions about our sprint process, code ownership, timelines, and post-launch maintenance."
        align="center"
      />

      <Reveal className="mt-12 sm:mt-16 max-w-3xl mx-auto">
        <Accordion items={faqItems} />
      </Reveal>
    </Section>
  );
}
