import Marquee from '../../ui/Marquee.jsx';

const techLogos = [
  'React',
  'Node.js',
  'MongoDB',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Figma',
  'Stripe',
  'AWS',
  'Vercel',
  'PostgreSQL',
  'Shopify',
  'Framer Motion',
  'GraphQL',
];

export default function MarqueeSection() {
  return (
    <div className="py-10 border-y border-border-subtle bg-elevated/40 overflow-hidden">
      <div className="text-center mb-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-3">
          Technologies & Platforms We Master
        </span>
      </div>
      <Marquee speed={25} pauseOnHover>
        {techLogos.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-2 rounded-xl bg-surface/50 border border-border-subtle/50 text-fg-2 hover:text-accent hover:border-accent/40 hover:bg-surface transition-all cursor-default select-none group"
          >
            <span className="w-2 h-2 rounded-full bg-accent-2/60 group-hover:bg-accent group-hover:scale-125 transition-all" />
            <span className="text-sm sm:text-base font-medium tracking-tight font-display">
              {tech}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
