import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Button from '../src/components/ui/Button.jsx';
import Accordion from '../src/components/ui/Accordion.jsx';
import FilterChips from '../src/components/ui/FilterChips.jsx';
import PricingCard from '../src/components/features/PricingCard.jsx';

describe('UI Primitives', () => {
  it('renders Button with primary variant and reacts to clicks', () => {
    const handleClick = vi.fn();
    render(
      <Button variant="primary" onClick={handleClick}>
        Click Me
      </Button>
    );

    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeDefined();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders Accordion items and toggles content on click', () => {
    const items = [
      { q: 'What is included?', a: 'Everything you need.' },
      { q: 'How long does it take?', a: 'About 2 weeks.' },
    ];

    render(<Accordion items={items} />);

    expect(screen.getByText('What is included?')).toBeDefined();
    expect(screen.getByText('How long does it take?')).toBeDefined();

    const firstBtn = screen.getByRole('button', { name: /what is included/i });
    fireEvent.click(firstBtn);
    expect(screen.getByText('Everything you need.')).toBeDefined();
  });

  it('renders FilterChips and handles selection', () => {
    const handleChange = vi.fn();
    const options = [
      { label: 'All', value: 'all' },
      { label: 'Websites', value: 'website' },
    ];

    render(
      <FilterChips options={options} value="all" onChange={handleChange} />
    );

    const webBtn = screen.getByText('Websites');
    fireEvent.click(webBtn);
    expect(handleChange).toHaveBeenCalledWith('website');
  });

  it('renders PricingCard with popular badge and custom features', () => {
    const samplePlan = {
      id: 'biz',
      name: 'Business',
      price: '1499',
      period: 'one-time',
      description: 'Our top tier for scaling brands',
      popular: true,
      features: ['Full custom design', 'CMS included'],
      ctaText: 'Get started',
    };

    render(
      <BrowserRouter>
        <PricingCard plan={samplePlan} />
      </BrowserRouter>
    );

    expect(screen.getByText('Business')).toBeDefined();
    expect(screen.getByText('Most popular')).toBeDefined();
    expect(screen.getByText('$1499')).toBeDefined();
    expect(screen.getByText('Full custom design')).toBeDefined();
  });
});
