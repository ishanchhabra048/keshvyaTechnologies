import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import TeamCard from '../../features/TeamCard.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { team } from '../../../content/team.js';

export default function TeamSection() {
  return (
    <Section tone="base">
      <SectionHeader
        eyebrow="LEADERSHIP"
        title="Meet the craftsmen"
        subtitle="You will work directly with our senior leads. No account managers playing telephone."
        align="center"
      />

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <Reveal key={member.name} delay={index * 0.08}>
            <TeamCard member={member} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
