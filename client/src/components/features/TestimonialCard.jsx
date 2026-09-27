import { Quote } from 'lucide-react';
import Card from '../ui/Card.jsx';

export default function TestimonialCard({ testimonial, className = '' }) {
  return (
    <Card spotlight className={`flex flex-col justify-between p-6 sm:p-8 h-full ${className}`}>
      <div>
        <div className="p-2.5 w-fit rounded-lg bg-accent/10 text-accent mb-6">
          <Quote className="w-5 h-5" />
        </div>

        <p className="text-base sm:text-lg text-fg-2 leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-border-subtle flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-accent to-accent-2 p-0.5 shrink-0">
          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-xs font-bold text-fg">
            {testimonial.initials || testimonial.author?.slice(0, 2).toUpperCase()}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-fg tracking-tight">{testimonial.author}</h4>
          <p className="text-xs text-fg-3">
            {testimonial.role} &bull; <span className="text-accent-2">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
