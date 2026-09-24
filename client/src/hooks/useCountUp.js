import { useState, useEffect } from 'react';
export function useCountUp({ to, duration = 1.4, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(to);
      return;
    }

    let start = null;
    let rafId;
    const end = parseInt(to, 10);
    if (isNaN(end)) return;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration, inView]);

  return count;
}
