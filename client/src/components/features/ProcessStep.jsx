import Card from '../ui/Card.jsx';

export default function ProcessStep({ step, isLast = false, className = '' }) {
  return (
    <div className={`relative flex items-start gap-6 group ${className}`}>
      {/* Step Number Badge & Line Connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center font-mono text-sm font-bold text-accent-2 group-hover:border-accent group-hover:bg-accent/10 transition-all shadow-md">
          {step.step}
        </div>
        {!isLast && (
          <div className="w-[2px] h-full min-h-[48px] bg-gradient-to-b from-border to-transparent mt-3 group-hover:from-accent/40 transition-colors" />
        )}
      </div>

      {/* Content Card */}
      <Card spotlight className="flex-grow p-6 sm:p-8 mb-6">
        <h3 className="text-xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
          {step.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-fg-2 leading-relaxed">
          {step.description}
        </p>
      </Card>
    </div>
  );
}
