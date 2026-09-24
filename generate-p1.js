const fs = require('fs');
const path = require('path');

const write = (file, content) => {
  const p = path.join(__dirname, 'client/src', file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n');
};

write('components/ui/Button.jsx', "export default function Button({ variant = 'primary', size = 'md', to, href, onClick, loading, iconRight, disabled, children, className = '' }) { return <button className={className}>{children}</button>; }");
write('components/ui/Card.jsx', "export default function Card({ interactive, spotlight, gradientBorder, className = '', children }) { return <div className={className}>{children}</div>; }");
write('components/ui/Badge.jsx', "export default function Badge({ tone = 'neutral', children }) { return <span>{children}</span>; }");
write('components/ui/Container.jsx', "export default function Container({ children, className = '' }) { return <div className={container }>{children}</div>; }");
write('components/ui/Section.jsx', "export default function Section({ id, tone = 'base', className = '', children }) { return <section id={id} className={className}>{children}</section>; }");
write('components/ui/SectionHeader.jsx', "export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) { return <div>{title}</div>; }");
write('components/ui/Input.jsx', "export const Input = () => <input />; export const Textarea = () => <textarea />; export const Select = () => <select />;");
write('components/ui/Accordion.jsx', "export default function Accordion({ items, singleOpen }) { return <div>Accordion</div>; }");
write('components/ui/FilterChips.jsx', "export default function FilterChips({ options, value, onChange }) { return <div>FilterChips</div>; }");
write('components/ui/Skeleton.jsx', "export default function Skeleton({ className = '' }) { return <div className={className} />; }");
write('components/ui/GradientText.jsx', "export default function GradientText({ children }) { return <span className=\"text-gradient\">{children}</span>; }");
write('components/ui/Reveal.jsx', "export default function Reveal({ children, delay, y, once, as }) { return <div>{children}</div>; }");
write('components/ui/Marquee.jsx', "export default function Marquee({ items, speed, pauseOnHover }) { return <div>Marquee</div>; }");
write('components/ui/Counter.jsx', "export default function Counter({ to, suffix, prefix, duration }) { return <span>{to}</span>; }");
write('components/ui/Modal.jsx', "export default function Modal({ open, onClose, title, children }) { return <div>Modal</div>; }");

write('components/layout/Navbar.jsx', "export default function Navbar() { return <nav>Navbar</nav>; }");
write('components/layout/Footer.jsx', "export default function Footer() { return <footer>Footer</footer>; }");
write('components/layout/PageTransition.jsx', "export default function PageTransition({ children }) { return <div>{children}</div>; }");
write('components/layout/Aurora.jsx', "export default function Aurora({ intensity = 'medium' }) { return <div>Aurora</div>; }");
write('components/layout/NoiseOverlay.jsx', "export default function NoiseOverlay() { return <div>Noise</div>; }");
write('components/layout/ScrollToTop.jsx', "export default function ScrollToTop() { return null; }");

write('pages/StyleGuide.jsx', "export default function StyleGuide() { return <div>StyleGuide</div>; }");

write('lib/utils.js', "import { clsx } from 'clsx'; import { twMerge } from 'tailwind-merge'; export function cn(...inputs) { return twMerge(clsx(inputs)); }");
