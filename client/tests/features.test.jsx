import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectGrid from '../src/components/features/ProjectGrid.jsx';
import ContactForm from '../src/components/features/ContactForm.jsx';

const queryClient = new QueryClient();

describe('Feature Components', () => {
  it('renders ProjectGrid loading state', () => {
    const { container } = render(<ProjectGrid isLoading={true} />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('renders ProjectGrid empty state when no projects are available', () => {
    render(<ProjectGrid projects={[]} isLoading={false} />);
    expect(screen.getByText(/new work coming soon/i)).toBeDefined();
  });

  it('renders ProjectGrid with populated projects', () => {
    const sampleProjects = [
      {
        _id: '1',
        title: 'Alpha Storefront',
        slug: 'alpha-storefront',
        summary: 'Custom e-commerce experience',
        category: 'ecommerce',
        featured: false,
        techStack: ['React', 'Stripe'],
      },
    ];

    render(
      <BrowserRouter>
        <ProjectGrid projects={sampleProjects} isLoading={false} />
      </BrowserRouter>
    );

    expect(screen.getByText('Alpha Storefront')).toBeDefined();
    expect(screen.getByText('Custom e-commerce experience')).toBeDefined();
  });

  it('renders ContactForm with all inputs and submit button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactForm />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText(/your name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/project type/i)).toBeDefined();
    expect(screen.getByLabelText(/estimated budget/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /send project inquiry/i })).toBeDefined();
  });
});
