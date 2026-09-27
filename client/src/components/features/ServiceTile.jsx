import * as LucideIcons from 'lucide-react';
import Card from '../ui/Card.jsx';

export default function ServiceTile({ service, className = '' }) {
  const IconComponent = LucideIcons[service.icon] || LucideIcons.Sparkles;

  const sizeClass =
    service.size === 'wide'
      ? 'md:col-span-2'
      : service.size === 'tall'
      ? 'md:row-span-2'
      : '';

  return (
    <Card
      interactive
      spotlight
      className={`group flex flex-col justify-between p-6 sm:p-8 ${sizeClass} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-surface-hover text-accent border border-border-subtle group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs text-fg-3 uppercase tracking-wider">
            {service.id?.replace(/-/g, ' ')}
          </span>
        </div>

        <h3 className="mt-6 text-xl sm:text-2xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
          {service.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-fg-2 leading-relaxed">
          {service.description}
        </p>
      </div>

      {Array.isArray(service.features) && service.features.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border-subtle">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-fg-2">
            {service.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-2" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
