import { motion } from 'framer-motion';

export default function FilterChips({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`relative px-4 py-2 rounded-sm text-sm font-medium transition-colors ${isSelected ? 'text-fg' : 'text-fg-2 hover:text-fg bg-surface'}`}
          >
            {isSelected && (
              <motion.div
                layoutId="filter-chip-active"
                className="absolute inset-0 bg-accent/20 border border-accent/30 rounded-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
