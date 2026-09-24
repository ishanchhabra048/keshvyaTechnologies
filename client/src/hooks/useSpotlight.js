import { useRef, useEffect } from 'react';

export function useSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    el.addEventListener('pointermove', handlePointerMove);
    return () => el.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return ref;
}
