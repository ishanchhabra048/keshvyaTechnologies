import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

export default function Counter({ to, suffix = '', prefix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const value = useCountUp({ to, duration, inView });
  
  return <span ref={ref} className="font-tabular-nums">{prefix}{value}{suffix}</span>;
}
