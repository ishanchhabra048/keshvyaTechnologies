import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Accordion({ items, singleOpen = true }) {
  const [openStates, setOpenStates] = useState(singleOpen ? [0] : []);

  const toggle = (index) => {
    if (singleOpen) {
      setOpenStates(openStates.includes(index) ? [] : [index]);
    } else {
      setOpenStates(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openStates.includes(i);
        return (
          <div key={i} className="border border-border-subtle rounded-lg bg-surface overflow-hidden">
            <button
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className="flex justify-between items-center w-full p-6 text-left hover:bg-surface-hover transition-colors"
            >
              <span className="font-display font-medium text-lg text-fg">{item.q}</span>
              <ChevronDown className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 pb-6 text-fg-2 max-w-none">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
