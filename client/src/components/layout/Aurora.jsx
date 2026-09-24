import { cn } from '../../lib/utils';

export default function Aurora({ intensity = 'medium', className }) {
  const opacityMap = {
    low: 'opacity-15',
    medium: 'opacity-30',
    high: 'opacity-40',
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <div className={cn('absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent blur-3xl animate-[float_22s_ease-in-out_infinite_alternate]', opacityMap[intensity])} />
      <div className={cn('absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-2 blur-3xl animate-[float_18s_ease-in-out_infinite_alternate]', opacityMap[intensity])} />
      <div className={cn('absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-accent-3 blur-3xl animate-[float_24s_ease-in-out_infinite_alternate]', opacityMap[intensity])} />
    </div>
  );
}
