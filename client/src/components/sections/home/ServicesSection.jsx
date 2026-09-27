import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import ServiceTile from '../../features/ServiceTile.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { services } from '../../../content/services.js';

export default function ServicesSection() {
  return (
    <Section tone="elevated" id="services">
      <SectionHeader
        eyebrow="WHAT WE DO"
        title="Everything your brand needs online"
        subtitle="From bespoke marketing sites to complex web applications, we provide end-to-end design and engineering excellence."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.05}>
            <ServiceTile service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
