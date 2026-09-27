import Card from '../ui/Card.jsx';
import { ArrowUpRight } from 'lucide-react';

export default function TeamCard({ member, className = '' }) {
  return (
    <Card spotlight className={`flex flex-col p-6 sm:p-8 ${className}`}>
      {/* Avatar with gradient & initials */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-accent to-accent-2 p-0.5 shadow-lg">
        <div className="w-full h-full rounded-[14px] bg-surface flex items-center justify-center text-xl sm:text-2xl font-bold font-display text-fg">
          {member.initials || member.name?.slice(0, 2).toUpperCase()}
        </div>
      </div>

      <div className="mt-6 flex-grow">
        <h3 className="text-xl font-semibold text-fg tracking-tight">{member.name}</h3>
        <p className="font-mono text-xs text-accent-2 mt-1 uppercase tracking-wider">{member.role}</p>
        {member.bio && (
          <p className="mt-3 text-sm text-fg-2 leading-relaxed">{member.bio}</p>
        )}
      </div>

      {Array.isArray(member.socials) && member.socials.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-3">
          {member.socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-fg-3 hover:text-accent transition-colors"
            >
              <span>{s.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
