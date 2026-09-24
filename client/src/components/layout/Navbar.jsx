import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { brand, nav } from '../../config/site';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    
    const handleEscape = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'h-16 bg-[rgba(7,7,11,0.7)] backdrop-blur-xl border-border-subtle' : 'h-[72px] bg-transparent border-transparent'}`}>
      <Container className="h-full flex items-center justify-between">
        <Link to="/" className="font-display font-semibold text-lg flex items-center gap-1 z-50 relative">
          {brand.name}<span className="w-1.5 h-1.5 rounded-full bg-gradient-brand mb-1" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(item => {
            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <Link key={item.label} to={item.to} className={`text-sm font-medium transition-colors relative ${isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}>
                {item.label}
                {isActive && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
              </Link>
            )
          })}
        </nav>
        
        <div className="hidden md:block">
          <Button to="/contact" size="sm">Start a project</Button>
        </div>

        <button className="md:hidden z-50 relative p-2 -mr-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 h-screen w-screen bg-base pt-24 px-6 flex flex-col"
            >
              <div className="flex flex-col gap-6 text-2xl font-display">
                {nav.map(item => (
                  <Link key={item.label} to={item.to} className="text-fg-2 hover:text-fg" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                ))}
                <div className="mt-4">
                  <Button to="/contact" className="w-full" onClick={() => setMobileOpen(false)}>Start a project</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
