import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

export const Textarea = forwardRef(({ label, error, hint, className, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-fg-2">{label}</label>}
      <textarea
        id={id}
        ref={ref}
        className={cn(
          "bg-surface border rounded-md p-4 text-fg outline-none transition-colors min-h-[120px]",
          error ? "border-danger focus:border-danger" : "border-border-subtle focus:border-accent",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-sm text-danger">{error}</span>}
      {hint && !error && <span id={`${id}-hint`} className="text-sm text-fg-3">{hint}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
