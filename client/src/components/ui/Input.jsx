import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, hint, className, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-fg-2">{label}</label>}
      <input
        id={id}
        ref={ref}
        className={cn("bg-surface border rounded-md h-11 px-4 text-fg outline-none transition-colors", error ? "border-[#F87171] focus:border-[#F87171]" : "border-border-subtle focus:border-accent", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-sm text-[#F87171]">{error}</span>}
      {hint && !error && <span id={`${id}-hint`} className="text-sm text-fg-3">{hint}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;

export const Textarea = forwardRef(({ label, error, hint, className, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-fg-2">{label}</label>}
      <textarea
        id={id}
        ref={ref}
        className={cn("bg-surface border rounded-md p-4 text-fg outline-none transition-colors min-h-[120px]", error ? "border-[#F87171] focus:border-[#F87171]" : "border-border-subtle focus:border-accent", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-sm text-[#F87171]">{error}</span>}
      {hint && !error && <span id={`${id}-hint`} className="text-sm text-fg-3">{hint}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export const Select = forwardRef(({ label, error, hint, className, children, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-fg-2">{label}</label>}
      <select
        id={id}
        ref={ref}
        className={cn("bg-surface border rounded-md h-11 px-4 text-fg outline-none transition-colors appearance-none", error ? "border-[#F87171] focus:border-[#F87171]" : "border-border-subtle focus:border-accent", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <span id={`${id}-error`} className="text-sm text-[#F87171]">{error}</span>}
      {hint && !error && <span id={`${id}-hint`} className="text-sm text-fg-3">{hint}</span>}
    </div>
  );
});
Select.displayName = 'Select';
