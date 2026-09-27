import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

export const Select = forwardRef(({ label, error, hint, className, children, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-fg-2">{label}</label>}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={cn(
            "w-full bg-surface border rounded-md h-11 px-4 text-fg outline-none transition-colors appearance-none cursor-pointer pr-10",
            error ? "border-danger focus:border-danger" : "border-border-subtle focus:border-accent",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-fg-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span id={`${id}-error`} className="text-sm text-danger">{error}</span>}
      {hint && !error && <span id={`${id}-hint`} className="text-sm text-fg-3">{hint}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
