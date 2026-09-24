import { Link } from 'react-router-dom';
import { brand, nav, socials } from '../../config/site';
import Container from '../ui/Container';

export default function Footer() {
  return (
    <footer className="relative bg-base pt-24 overflow-hidden border-t border-border-subtle">
      <Container className="relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="font-display font-semibold text-lg flex items-center gap-1 mb-4">
              {brand.name}<span className="w-1.5 h-1.5 rounded-full bg-gradient-brand mb-1" />
            </Link>
            <p className="text-fg-2 mb-6">{brand.tagline}</p>
            <div className="flex gap-4">
              {socials.map(s => <a key={s.name} href={s.href} className="text-fg-2 hover:text-fg">{s.name}</a>)}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-medium text-fg mb-4">Navigate</h4>
            <ul className="space-y-3">
              {nav.map(n => <li key={n.label}><Link to={n.to} className="text-fg-2 hover:text-accent">{n.label}</Link></li>)}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-medium text-fg mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/#work" className="text-fg-2 hover:text-accent">Web Design</Link></li>
              <li><Link to="/#work" className="text-fg-2 hover:text-accent">Web Development</Link></li>
              <li><Link to="/#work" className="text-fg-2 hover:text-accent">E-commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-fg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`mailto:${brand.email}`} className="text-fg-2 hover:text-accent">{brand.email}</a></li>
              <li className="text-fg-2">{brand.phone}</li>
              <li className="text-fg-2">{brand.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-fg-3">
          <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-fg">Back to top</button>
        </div>
      </Container>
      
      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none text-center font-display font-bold text-[15vw] leading-none text-fg/[0.03] -mb-[4vw] whitespace-nowrap">
        {brand.name.toUpperCase()}
      </div>
    </footer>
  );
}
