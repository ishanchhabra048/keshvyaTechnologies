import { cn } from '../../lib/utils';
export default function Section({ id, tone = 'base', className = '', children }) {
  const tones = {
    base: 'bg-base',
    elevated: 'bg-elevated',
  };
  return (
    <section id={id} className={cn('py-16 lg:py-24', tones[tone], className)} style={{ scrollMarginTop: '96px' }}>
      {children}
    </section>
  );
}
