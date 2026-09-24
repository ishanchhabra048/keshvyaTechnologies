import { cn } from '../../lib/utils';
import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', className }) {
  return (
    <Reveal className={cn('max-w-[640px] mb-12', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      {title && <h2 className="font-display text-2xl lg:text-4xl text-fg mb-4">{title}</h2>}
      {subtitle && <p className="text-lg text-fg-2">{subtitle}</p>}
    </Reveal>
  );
}
