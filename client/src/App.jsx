import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import PageTransition from './components/layout/PageTransition';
import StyleGuide from './pages/StyleGuide';
import NoiseOverlay from './components/layout/NoiseOverlay';

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <NoiseOverlay />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/styleguide" element={<PageTransition><StyleGuide /></PageTransition>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
