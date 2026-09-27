import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import Seo from '../components/ui/Seo.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import Modal from '../components/ui/Modal.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { useProject } from '../hooks/useProject.js';
import { useProjects } from '../hooks/useProjects.js';
import { cdn } from '../lib/utils.js';
import { brand } from '../config/site.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading, isError, error } = useProject(slug);
  const { data: allProjectsData } = useProjects({ limit: 50 });

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <Container className="space-y-8">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
            <div className="lg:col-span-8 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
            </div>
            <div className="lg:col-span-4 space-y-4">
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex items-center">
        <Container className="text-center max-w-lg mx-auto">
          <div className="p-4 rounded-full bg-accent/10 text-accent w-fit mx-auto mb-6">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold font-display text-fg">Project Not Found</h1>
          <p className="mt-3 text-fg-2 text-base">
            {error?.message || 'The requested project case study could not be located or is no longer published.'}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/#work" variant="primary">
              Browse All Work
            </Button>
            <Button to="/" variant="secondary">
              Go Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Find next project for footer navigation
  const allProjects = allProjectsData?.pages?.[0]?.data || [];
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex !== -1 && allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.coverImage?.url,
    creator: {
      '@type': 'Organization',
      name: brand.name,
    },
    dateCreated: project.year ? `${project.year}` : undefined,
  };

  const galleryList = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <>
      <Seo
        title={project.title}
        description={project.summary}
        path={`/projects/${project.slug}`}
        image={project.coverImage?.url || '/placeholders/project-1.svg'}
        jsonLd={jsonLd}
      />

      <article className="pt-32 pb-24">
        <Container>
          {/* Back Navigation & Category */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 text-sm font-medium text-fg-2 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all projects</span>
              </Link>

              <Badge tone="accent" className="capitalize">
                {project.category?.replace('-', ' ')}
              </Badge>
            </div>
          </Reveal>

          {/* Project Title & Summary */}
          <Reveal delay={0.05}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-fg tracking-tight leading-[1.1]">
              {project.title}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-fg-2 max-w-3xl leading-relaxed">
              {project.summary}
            </p>
          </Reveal>

          {/* Project Meta Bar */}
          <Reveal delay={0.1}>
            <div className="mt-8 p-6 rounded-2xl bg-surface border border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-xs font-mono uppercase text-fg-3">Client</span>
                <p className="text-sm sm:text-base font-semibold text-fg mt-0.5">
                  {project.clientName || 'Confidential'}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-fg-3">Industry</span>
                <p className="text-sm sm:text-base font-semibold text-fg mt-0.5">
                  {project.industry || 'Technology'}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-fg-3">Year</span>
                <p className="text-sm sm:text-base font-semibold text-fg mt-0.5">
                  {project.year || '2025'}
                </p>
              </div>

              <div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/15 text-accent hover:bg-accent hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div>
                    <span className="text-xs font-mono uppercase text-fg-3">Status</span>
                    <p className="text-sm font-semibold text-fg-2 mt-0.5">Delivered</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Cover Hero Frame */}
          <Reveal delay={0.15} className="mt-10">
            <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-border-subtle shadow-2xl">
              <img
                src={cdn(project.coverImage?.url, 1600) || '/placeholders/project-1.svg'}
                alt={project.coverImage?.alt || project.title}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </div>
          </Reveal>

          {/* Content & Sticky Sidebar */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Markdown Description */}
            <div className="lg:col-span-8">
              <Reveal delay={0.2}>
                <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-fg prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-p:text-fg-2 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-a:text-accent prose-strong:text-fg">
                  <ReactMarkdown>{project.description || project.summary}</ReactMarkdown>
                </div>
              </Reveal>

              {/* Testimonial if present */}
              {project.testimonial?.quote && (
                <Reveal delay={0.25} className="mt-12">
                  <Card gradientBorder className="p-8 sm:p-10">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent w-fit mb-4">
                      <Quote className="w-6 h-6" />
                    </div>
                    <p className="text-lg sm:text-xl text-fg-2 italic leading-relaxed">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-4 border-t border-border-subtle">
                      <h4 className="text-sm font-bold text-fg">{project.testimonial.author}</h4>
                      <p className="text-xs text-accent-2 mt-0.5">{project.testimonial.role}</p>
                    </div>
                  </Card>
                </Reveal>
              )}

              {/* Gallery Grid */}
              {galleryList.length > 0 && (
                <Reveal delay={0.3} className="mt-16">
                  <h3 className="text-2xl font-bold font-display text-fg tracking-tight mb-6">
                    Project Gallery & Screens
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {galleryList.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightboxIndex(i)}
                        className="group relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-surface border border-border-subtle cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <img
                          src={cdn(img.url, 800)}
                          alt={img.alt || `Screenshot ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <div className="p-3 rounded-full bg-surface/80 backdrop-blur-md">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right: Sticky Sidebar (Results & Tech Stack) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              {/* Results & Metrics */}
              {Array.isArray(project.results) && project.results.length > 0 && (
                <Reveal delay={0.25}>
                  <Card spotlight className="p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-fg tracking-tight pb-4 border-b border-border-subtle">
                      Key Results & Impact
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {project.results.map((res, i) => (
                        <div key={i} className="p-4 rounded-xl bg-surface-hover/60 border border-border-subtle">
                          <div className="text-3xl font-extrabold font-display text-accent-2">
                            {res.value}
                          </div>
                          <p className="text-xs font-medium text-fg-2 mt-1">
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              )}

              {/* Tech Stack Chips */}
              {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                <Reveal delay={0.3}>
                  <Card spotlight className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-lg font-bold text-fg tracking-tight pb-3 border-b border-border-subtle">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium text-fg bg-surface-hover border border-border-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              )}
            </div>
          </div>

          {/* Next Project Footer Card */}
          {nextProject && (
            <Reveal className="mt-24 pt-16 border-t border-border-subtle">
              <div className="flex justify-between items-center mb-6">
                <span className="eyebrow">NEXT CASE STUDY</span>
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
                >
                  <span>View Project</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <Card
                interactive
                className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-surface-hover shrink-0">
                    <img
                      src={cdn(nextProject.coverImage?.url, 200) || '/placeholders/project-1.svg'}
                      alt={nextProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <Badge tone="accent" className="capitalize text-xs mb-1">
                      {nextProject.category}
                    </Badge>
                    <h4 className="text-xl font-bold text-fg group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-fg-2 line-clamp-1 mt-0.5">
                      {nextProject.summary}
                    </p>
                  </div>
                </div>

                <Button to={`/projects/${nextProject.slug}`} variant="secondary" size="md">
                  Explore Case Study
                </Button>
              </Card>
            </Reveal>
          )}

          {/* Bottom CTA */}
          <div className="mt-20">
            <CtaBanner
              title="Ready for similar results?"
              subtitle="Let's build a standout digital experience for your brand."
            />
          </div>
        </Container>
      </article>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryList[lightboxIndex] && (
        <Modal
          open={true}
          onClose={() => setLightboxIndex(null)}
          title={galleryList[lightboxIndex].alt || `Image ${lightboxIndex + 1} of ${galleryList.length}`}
        >
          <div className="relative flex flex-col items-center">
            <div className="relative max-h-[70vh] overflow-hidden rounded-lg bg-surface">
              <img
                src={cdn(galleryList[lightboxIndex].url, 1200)}
                alt={galleryList[lightboxIndex].alt || 'Gallery View'}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {galleryList.length > 1 && (
              <div className="mt-4 flex items-center justify-between w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + galleryList.length) % galleryList.length)
                  }
                  iconRight={ChevronLeft}
                >
                  Previous
                </Button>
                <span className="text-xs font-mono text-fg-3">
                  {lightboxIndex + 1} / {galleryList.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryList.length)}
                  iconRight={ChevronRight}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
