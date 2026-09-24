import { cn } from '../../lib/utils';
export default function GradientText({ children, className }) {
  return <span className={cn("text-gradient", className)}>{children}</span>;
}
