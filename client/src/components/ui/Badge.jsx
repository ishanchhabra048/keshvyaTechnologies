import { cn } from '../../lib/utils';

export default function Badge({ tone = 'neutral', children, className }) {
  const tones = {
    neutral: 'bg-surface border-border-subtle text-fg-2',
    accent: 'bg-accent/10 border-accent/20 text-accent',
    success: 'bg-[#34D399]/10 border-[#34D399]/20 text-[#34D399]',
    warning: 'bg-[#FBBF24]/10 border-[#FBBF24]/20 text-[#FBBF24]',
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-sm border font-mono text-[12px] uppercase tracking-wider", tones[tone], className)}>
      {children}
    </span>
  );
}
