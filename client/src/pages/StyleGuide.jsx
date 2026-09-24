import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';
import SectionHeader from '../components/ui/SectionHeader';
import Marquee from '../components/ui/Marquee';
import GradientText from '../components/ui/GradientText';
import { Input, Textarea, Select } from '../components/ui/Input';
import FilterChips from '../components/ui/FilterChips';
import Accordion from '../components/ui/Accordion';
import Modal from '../components/ui/Modal';
import Skeleton from '../components/ui/Skeleton';
import Counter from '../components/ui/Counter';

export default function StyleGuide() {
  const [chip, setChip] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-24 space-y-12">
      <Container>
        <SectionHeader eyebrow="Style Guide" title={<span>Design <GradientText>System</GradientText></span>} subtitle="All components and tokens." />
        
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Buttons</h3>
          <div className="flex gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">Normal Card</Card>
            <Card interactive spotlight className="p-6">Interactive Spotlight Card</Card>
            <Card gradientBorder className="p-6">Gradient Border Card</Card>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Badges</h3>
          <div className="flex gap-4">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Inputs</h3>
          <div className="max-w-sm space-y-4">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" error="Invalid email address" />
            <Textarea label="Message" placeholder="How can we help?" />
            <Select label="Project Type">
              <option>Web Design</option>
              <option>Web App</option>
            </Select>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Interactive</h3>
          <FilterChips 
            options={[{label: 'All', value: 'all'}, {label: 'Websites', value: 'web'}]} 
            value={chip} onChange={setChip} 
          />
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
            <p className="text-fg-2">Modal content here.</p>
          </Modal>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Accordion</h3>
          <Accordion items={[{q: 'Question 1', a: 'Answer 1'}, {q: 'Question 2', a: 'Answer 2'}]} />
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Utils</h3>
          <div className="flex gap-4 items-center">
            <Counter to={100} prefix="$" suffix="k" />
            <Skeleton className="w-32 h-8" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-display">Marquee</h3>
          <Marquee items={[<span key="1">React</span>, <span key="2">Node.js</span>, <span key="3">Figma</span>]} />
        </div>
      </Container>
    </div>
  );
}
