import ProjectCard from './ProjectCard.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import Button from '../ui/Button.jsx';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function ProjectGrid({
  projects = [],
  isLoading = false,
  isError = false,
  error = null,
  onRetry = null,
  className = '',
}) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-lg bg-surface border border-border-subtle overflow-hidden p-0">
            <Skeleton className="aspect-[16/10] w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-surface border border-danger/20 text-center max-w-lg mx-auto">
        <div className="p-3 rounded-full bg-danger/10 text-danger mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-fg">Unable to load projects</h3>
        <p className="mt-2 text-fg-2 text-sm max-w-sm">
          {error?.message || 'There was a problem fetching projects from our API.'}
        </p>
        {onRetry && (
          <div className="mt-6">
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-surface border border-border-subtle text-center max-w-lg mx-auto">
        <div className="p-3 rounded-full bg-accent/10 text-accent mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-fg">New work coming soon</h3>
        <p className="mt-2 text-fg-2 text-sm max-w-sm">
          We are currently putting final touches on our latest case studies. Check back shortly!
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project._id || project.slug} project={project} />
      ))}
    </div>
  );
}
