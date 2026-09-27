import Counter from '../ui/Counter.jsx';

export default function StatCard({ value, suffix = '', prefix = '', label, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-fg tracking-tight">
        <Counter to={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm sm:text-base font-medium text-fg-2">
        {label}
      </p>
    </div>
  );
}
