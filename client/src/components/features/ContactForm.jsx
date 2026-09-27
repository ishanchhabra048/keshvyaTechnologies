import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckCircle2, Send, RotateCcw } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Select from '../ui/Select.jsx';
import { useSubmitInquiry } from '../../hooks/useSubmitInquiry.js';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(120, 'Email is too long'),
  company: z.string().trim().max(120, 'Company name is too long').optional().or(z.literal('')),
  projectType: z.enum(['New website', 'Redesign', 'Web app', 'E-commerce', 'Other'], {
    errorMap: () => ({ message: 'Please select a project type' }),
  }),
  budget: z.enum(['Under $1k', '$1k-$3k', '$3k-$10k', '$10k+', 'Not sure'], {
    errorMap: () => ({ message: 'Please select an estimated budget' }),
  }),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  website: z.string().optional(), // Honeypot
});

export default function ContactForm({ className = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const submitInquiryMutation = useSubmitInquiry();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: 'New website',
      budget: '$1k-$3k',
      message: '',
      website: '',
    },
  });

  const messageVal = watch('message', '');

  const onSubmit = async (data) => {
    try {
      await submitInquiryMutation.mutateAsync(data);
      setSubmitted(true);
      toast.success('Inquiry received! We will be in touch within one business day.');
      reset();
    } catch (err) {
      toast.error(err.message || 'Failed to submit inquiry. Please try again or email us directly.');
    }
  };

  if (submitted) {
    return (
      <Card gradientBorder className={`p-8 sm:p-12 text-center flex flex-col items-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-fg font-display tracking-tight">
          Inquiry Received
        </h3>
        <p className="mt-3 text-fg-2 max-w-md text-base leading-relaxed">
          Thanks for reaching out! We have received your project details and will review them carefully. You can expect a personalized reply from our lead engineer within one business day.
        </p>
        <div className="mt-8">
          <Button
            variant="secondary"
            size="md"
            iconRight={RotateCcw}
            onClick={() => setSubmitted(false)}
          >
            Send Another Inquiry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 sm:p-10 ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hp_website">Leave this field blank</label>
          <input
            id="hp_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Your Name *"
            placeholder="Jane Doe"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="jane@company.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input
            label="Company / Brand"
            placeholder="Acme Inc. (optional)"
            error={errors.company?.message}
            {...register('company')}
          />
          <Select
            label="Project Type *"
            error={errors.projectType?.message}
            {...register('projectType')}
          >
            <option value="New website" className="bg-surface text-fg">New website</option>
            <option value="Redesign" className="bg-surface text-fg">Redesign</option>
            <option value="Web app" className="bg-surface text-fg">Web app</option>
            <option value="E-commerce" className="bg-surface text-fg">E-commerce</option>
            <option value="Other" className="bg-surface text-fg">Other</option>
          </Select>
          <Select
            label="Estimated Budget *"
            error={errors.budget?.message}
            {...register('budget')}
          >
            <option value="Under $1k" className="bg-surface text-fg">Under $1k</option>
            <option value="$1k-$3k" className="bg-surface text-fg">$1k–$3k</option>
            <option value="$3k-$10k" className="bg-surface text-fg">$3k–$10k</option>
            <option value="$10k+" className="bg-surface text-fg">$10k+</option>
            <option value="Not sure" className="bg-surface text-fg">Not sure</option>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="message" className="text-sm font-medium text-fg-2">
              Project Details & Goals *
            </label>
            <span className="text-xs font-mono text-fg-3">
              {messageVal?.length || 0} / 2000
            </span>
          </div>
          <Textarea
            id="message"
            placeholder="Tell us about your brand, key objectives, must-have features, and target launch date..."
            rows={5}
            error={errors.message?.message}
            {...register('message')}
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            loading={isSubmitting || submitInquiryMutation.isPending}
            iconRight={Send}
          >
            Send Project Inquiry
          </Button>
          <p className="mt-3 text-xs text-center text-fg-3">
            By submitting this form you agree to be contacted regarding your project inquiry. We never spam.
          </p>
        </div>
      </form>
    </Card>
  );
}
