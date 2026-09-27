import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { cdn } from '../../lib/utils.js';

export default function ProjectCard({ project, className = '' }) {
  const isFeatured = project.featured;

  return (
    <Card
      interactive
      gradientBorder={isFeatured}
      className={`group relative flex flex-col overflow-hidden ${
        isFeatured ? 'lg:col-span-2' : ''
      } ${className}`}
    >
      <Link to={`/projects/${project.slug}`} className="flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-hover">
          <img
            src={cdn(project.coverImage?.url, 800) || '/placeholders/project-1.svg'}
            alt={project.coverImage?.alt || project.title}
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge tone="accent" className="capitalize">
              {project.category?.replace('-', ' ')}
            </Badge>
          </div>

          {/* Featured Pill */}
          {isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge tone="warning">Featured</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <div className="p-2 rounded-full bg-surface-hover text-fg-2 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <p className="mt-2 text-fg-2 line-clamp-2 text-sm sm:text-base leading-relaxed">
            {project.summary}
          </p>

          {/* Tech Stack Chips */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono text-fg-2 bg-surface-hover border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono text-fg-3">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}
