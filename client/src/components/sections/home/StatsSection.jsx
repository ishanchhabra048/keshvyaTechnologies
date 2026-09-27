import Section from '../../ui/Section.jsx';
import StatCard from '../../features/StatCard.jsx';
import Card from '../../ui/Card.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { stats } from '../../../content/stats.js';

export default function StatsSection() {
  return (
    <Section tone="base" className="py-12 sm:py-16">
      <Reveal>
        <Card spotlight className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle p-2 sm:p-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              className="py-6"
            />
          ))}
        </Card>
      </Reveal>
    </Section>
  );
}
