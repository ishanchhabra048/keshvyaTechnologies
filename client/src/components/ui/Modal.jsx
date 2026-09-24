import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      ref.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
          />
          <motion.div
            ref={ref}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-surface border border-border-subtle rounded-xl shadow-2xl overflow-hidden focus:outline-none"
          >
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 className="text-xl font-display font-medium text-fg">{title}</h2>
              <button onClick={onClose} className="text-fg-2 hover:text-fg rounded-sm focus-visible"><X size={20} /></button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
