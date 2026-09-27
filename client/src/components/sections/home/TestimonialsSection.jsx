import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import TestimonialCard from '../../features/TestimonialCard.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { testimonials } from '../../../content/testimonials.js';

export default function TestimonialsSection() {
  return (
    <Section tone="base" id="testimonials">
      <SectionHeader
        eyebrow="CLIENT VOICES"
        title="Trusted by founders & leaders"
        subtitle="Here is what founders, product managers, and partners say about building with our team."
        align="center"
      />

      <div className="mt-12 sm:mt-16">
        {/* Responsive layout: Snap scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
          {testimonials.map((t, index) => (
            <div key={t.id} className="snap-center shrink-0 w-full">
              <Reveal delay={index * 0.1}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
