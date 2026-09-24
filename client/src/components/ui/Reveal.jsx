import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 24, once = true, as = 'div', className }) {
  const Component = motion[as] || motion.div;
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Component
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
