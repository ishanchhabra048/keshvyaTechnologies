import Seo from '../components/ui/Seo.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import Aurora from '../components/layout/Aurora.jsx';
import GradientText from '../components/ui/GradientText.jsx';
import ContactForm from '../components/features/ContactForm.jsx';
import Card from '../components/ui/Card.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { brand } from '../config/site.js';
import { Mail, Phone, MapPin, Clock, MessageSquare, FileCode, Rocket } from 'lucide-react';

export default function Contact() {
  const steps = [
    {
      icon: MessageSquare,
      title: '1. Discovery & Review',
      description: 'We review your goals, brand assets, and timeline within 24 hours.',
    },
    {
      icon: FileCode,
      title: '2. Proposal & Sprint Plan',
      description: 'We provide a transparent fixed-price proposal and sprint milestone schedule.',
    },
    {
      icon: Rocket,
      title: '3. Build & Launch',
      description: 'We begin custom design and development with weekly progress demos.',
    },
  ];

  return (
    <>
      <Seo
        title="Start a Project"
        description={`Get in touch with ${brand.name}. Share your project objectives and receive a tailored roadmap within one business day.`}
        path="/contact"
      />

      <div className="relative pt-32 pb-12 overflow-hidden">
        <Aurora intensity="low" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal delay={0.05}>
            <span className="eyebrow mb-3 inline-block">LET&apos;S COLLABORATE</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-fg tracking-tight leading-tight">
              Start your next <GradientText>project.</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base sm:text-lg text-fg-2 leading-relaxed">
              Tell us about your brand vision, target timeline, and feature requirements. We reply within one business day.
            </p>
          </Reveal>
        </Container>
      </div>

      <Section tone="base" className="pt-0 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Right Column: Direct Contact & What Happens Next */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.25}>
              <Card spotlight className="p-8 space-y-6">
                <h3 className="text-xl font-bold text-fg tracking-tight pb-4 border-b border-border-subtle">
                  Direct Inquiries
                </h3>

                <div className="space-y-4">
                  <a
                    href={`mailto:${brand.email}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover/50 hover:bg-surface-hover hover:text-accent transition-colors text-fg-2 group"
                  >
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-fg-3">Email</p>
                      <p className="text-sm font-semibold text-fg">{brand.email}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover/50 text-fg-2">
                    <div className="p-2.5 rounded-lg bg-accent-2/10 text-accent-2">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-fg-3">Phone</p>
                      <p className="text-sm font-semibold text-fg">{brand.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover/50 text-fg-2">
                    <div className="p-2.5 rounded-lg bg-accent-3/10 text-accent-3">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-fg-3">Location</p>
                      <p className="text-sm font-semibold text-fg">{brand.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover/50 text-fg-2">
                    <div className="p-2.5 rounded-lg bg-success/10 text-success">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-fg-3">Response Promise</p>
                      <p className="text-sm font-semibold text-fg">Within 24 business hours</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* What Happens Next */}
            <Reveal delay={0.3}>
              <Card className="p-8">
                <h3 className="text-lg font-bold text-fg tracking-tight pb-4 border-b border-border-subtle mb-6">
                  What Happens Next?
                </h3>
                <div className="space-y-6">
                  {steps.map((st, i) => {
                    const Icon = st.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-surface-hover text-accent-2 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-fg">{st.title}</h4>
                          <p className="text-xs text-fg-2 mt-1 leading-relaxed">{st.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
