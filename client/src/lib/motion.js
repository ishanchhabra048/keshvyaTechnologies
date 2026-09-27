export const EASING_DEFAULT = [0.22, 1, 0.36, 1];

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: EASING_DEFAULT } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const slideUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING_DEFAULT } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.25 } }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};
