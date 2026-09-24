import { cn } from '../../lib/utils';
import { useSpotlight } from '../../hooks/useSpotlight';

export default function Card({ interactive, spotlight, gradientBorder, className = '', children }) {
  const ref = useSpotlight();

  const base = "relative bg-surface rounded-lg lg:rounded-xl overflow-hidden border border-border-subtle";
  const interactiveClasses = interactive ? "transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] cursor-pointer" : "";
  
  // LLD: card ::before paints radial-gradient(500px circle at var(--mx) var(--my), rgba(124,92,255,.18), transparent 40%)
  const spotlightClasses = spotlight ? "before:absolute before:inset-0 before:pointer-events-none before:transition-opacity before:duration-500 before:opacity-0 hover:before:opacity-100 before:bg-[radial-gradient(500px_circle_at_var(--mx)_var(--my),rgba(124,92,255,0.18),transparent_40%)] before:z-10" : "";

  if (gradientBorder) {
    return (
      <div className={cn("relative p-[1px] rounded-lg lg:rounded-xl bg-gradient-brand", interactiveClasses, className)}>
        <div ref={spotlight ? ref : null} className={cn("relative h-full w-full bg-surface rounded-[calc(0.5rem-1px)] lg:rounded-[calc(0.75rem-1px)] overflow-hidden", spotlightClasses)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={spotlight ? ref : null} className={cn(base, interactiveClasses, spotlightClasses, className)}>
      {children}
    </div>
  );
}
