import Seo from '../components/ui/Seo.jsx';
import AboutHero from '../components/sections/about/AboutHero.jsx';
import StorySection from '../components/sections/about/StorySection.jsx';
import ValuesSection from '../components/sections/about/ValuesSection.jsx';
import StatsSection from '../components/sections/home/StatsSection.jsx';
import TeamSection from '../components/sections/about/TeamSection.jsx';
import MilestonesSection from '../components/sections/about/MilestonesSection.jsx';
import StackSection from '../components/sections/about/StackSection.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import Section from '../components/ui/Section.jsx';
import { brand } from '../config/site.js';

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Learn about ${brand.name}, our principles, engineering culture, and the senior craftsmen behind our client work.`}
        path="/about"
      />

      <AboutHero />
      <StorySection />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
      <MilestonesSection />
      <StackSection />

      <Section tone="base" className="pt-0">
        <CtaBanner />
      </Section>
    </>
  );
}
