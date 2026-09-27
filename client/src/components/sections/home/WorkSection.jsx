import { useState } from 'react';
import Section from '../../ui/Section.jsx';
import SectionHeader from '../../ui/SectionHeader.jsx';
import FilterChips from '../../ui/FilterChips.jsx';
import ProjectGrid from '../../features/ProjectGrid.jsx';
import Button from '../../ui/Button.jsx';
import Reveal from '../../ui/Reveal.jsx';
import { useProjects } from '../../../hooks/useProjects.js';
import { ArrowRight, Loader2 } from 'lucide-react';

const categoryOptions = [
  { label: 'All Projects', value: 'all' },
  { label: 'Websites', value: 'website' },
  { label: 'Web Apps', value: 'web-app' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Branding', value: 'branding' },
];

export default function WorkSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProjects({ category: selectedCategory, limit: 6 });

  // Flatten infinite query pages into single list
  const projects = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Section tone="base" id="work">
      <SectionHeader
        eyebrow="SELECTED WORK"
        title="Projects we are proud of"
        subtitle="Real products designed, engineered, and shipped for forward-thinking businesses across the globe."
        align="center"
      />

      {/* Filter Chips */}
      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <FilterChips
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </Reveal>

      {/* Projects Grid */}
      <div className="mt-12">
        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={() => refetch()}
        />
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            loading={isFetchingNextPage}
            iconRight={isFetchingNextPage ? Loader2 : undefined}
          >
            {isFetchingNextPage ? 'Loading more work...' : 'Load more projects'}
          </Button>
        </div>
      )}

      {/* Bottom CTA bar */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle gap-4">
        <div>
          <h4 className="text-lg font-semibold text-fg">Have a specific concept in mind?</h4>
          <p className="text-sm text-fg-2 mt-0.5">Let us discuss your custom requirements and timeline.</p>
        </div>
        <Button to="/contact" variant="secondary" size="md" iconRight={ArrowRight}>
          Discuss your project
        </Button>
      </div>
    </Section>
  );
}
