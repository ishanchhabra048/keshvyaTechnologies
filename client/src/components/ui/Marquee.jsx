import { cn } from '../../lib/utils';
export default function Marquee({ items = [], speed = '30s', pauseOnHover = true, className }) {
  return (
    <div className={cn('flex overflow-hidden group select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', className)}>
      <div 
        className={cn('flex flex-shrink-0 min-w-full justify-around gap-8 py-4 animate-marquee', pauseOnHover && 'group-hover:[animation-play-state:paused]')}
        style={{ animationDuration: speed }}
      >
        {items.map((item, i) => (
          <div key={`m1-${i}`} className="flex-shrink-0 px-4">{item}</div>
        ))}
      </div>
      <div 
        className={cn('flex flex-shrink-0 min-w-full justify-around gap-8 py-4 animate-marquee', pauseOnHover && 'group-hover:[animation-play-state:paused]')}
        style={{ animationDuration: speed }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div key={`m2-${i}`} className="flex-shrink-0 px-4">{item}</div>
        ))}
      </div>
    </div>
  );
}
