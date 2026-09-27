import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import NoiseOverlay from './components/layout/NoiseOverlay.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Skeleton from './components/ui/Skeleton.jsx';
import Container from './components/ui/Container.jsx';

// Eager public routes
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// Lazy public routes
const About = lazy(() => import('./pages/About.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const StyleGuide = lazy(() => import('./pages/StyleGuide.jsx'));

// Lazy admin routes
const Login = lazy(() => import('./pages/admin/Login.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const Projects = lazy(() => import('./pages/admin/Projects.jsx'));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm.jsx'));
const Inquiries = lazy(() => import('./pages/admin/Inquiries.jsx'));

function PublicLayout() {
  const location = useLocation();

  return (
    <>
      <NoiseOverlay />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

function PageFallback() {
  return (
    <div className="pt-36 pb-24 min-h-[70vh]">
      <Container className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </Container>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-xl focus:outline-none shadow-xl"
      >
        Skip to main content
      </a>

      <Routes>
        {/* Admin Login (Standalone) */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageFallback />}>
              <Login />
            </Suspense>
          }
        />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Suspense fallback={<PageFallback />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              path="/admin"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/admin/projects/new"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ProjectForm />
                </Suspense>
              }
            />
            <Route
              path="/admin/projects/:id/edit"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ProjectForm />
                </Suspense>
              }
            />
            <Route
              path="/admin/inquiries"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Inquiries />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="pricing"
            element={
              <Suspense fallback={<PageFallback />}>
                <Pricing />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="projects/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route
            path="styleguide"
            element={
              <Suspense fallback={<PageFallback />}>
                <StyleGuide />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
