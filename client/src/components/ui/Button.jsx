import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils.js';

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  loading,
  iconRight,
  disabled,
  children,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-150 active:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group';

  const variants = {
    primary:
      'text-white bg-gradient-brand shadow-[0_8px_30px_-8px_rgba(124,92,255,0.6)] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.3),transparent)] before:-translate-x-[200%] hover:before:animate-[sheen_1.5s_ease]',
    secondary: 'text-fg border border-border-subtle hover:border-accent hover:text-accent bg-surface',
    ghost: 'text-fg-2 hover:text-fg hover:bg-surface-hover',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm rounded-md',
    md: 'h-11 px-6 text-base rounded-md min-w-[44px] min-h-[44px]',
    lg: 'h-14 px-8 text-lg rounded-lg min-w-[44px] min-h-[44px]',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const renderIcon = (icon) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    const IconComponent = icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const content = (
    <>
      {loading ? (
        <span className="animate-spin mr-2 border-2 border-current border-t-transparent rounded-full w-4 h-4" />
      ) : null}
      <span className="relative z-10 flex items-center">
        {children}
        {iconRight && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform inline-flex items-center">
            {renderIcon(iconRight)}
          </span>
        )}
      </span>
    </>
  );

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{content}</a>;
  return (
    <button onClick={onClick} disabled={disabled || loading} className={classes} {...props}>
      {content}
    </button>
  );
}
