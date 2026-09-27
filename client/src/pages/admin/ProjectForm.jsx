import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Upload,
  Trash2,
  Plus,
  Eye,
  Edit3,
  Check,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import Select from '../../components/ui/Select.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Seo from '../../components/ui/Seo.jsx';
import api from '../../lib/api.js';
import { cdn } from '../../lib/utils.js';

const projectFormSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(120),
  slug: z.string().trim().optional(),
  summary: z.string().trim().min(10, 'Summary must be at least 10 characters').max(240),
  description: z.string().default(''),
  category: z.enum(['website', 'web-app', 'ecommerce', 'branding']),
  industry: z.string().default(''),
  clientName: z.string().default(''),
  year: z.coerce.number().int().min(2000).max(2100).optional().or(z.literal(0)),
  liveUrl: z.string().url('Invalid URL format').or(z.literal('')).default(''),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
  testimonial: z
    .object({
      quote: z.string().default(''),
      author: z.string().default(''),
      role: z.string().default(''),
    })
    .optional(),
});

export default function ProjectForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('write'); // write | preview
  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Fetch project data if editing
  const { data: existingProject, isLoading: isFetching } = useQuery({
    queryKey: ['admin', 'project', id],
    queryFn: async () => {
      const res = await api.get(`/admin/projects/${id}`);
      return res.data.data;
    },
    enabled: isEditing,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      description: '',
      category: 'website',
      industry: '',
      clientName: '',
      year: new Date().getFullYear(),
      liveUrl: '',
      featured: false,
      order: 0,
      testimonial: { quote: '', author: '', role: '' },
    },
  });

  const { fields: resultsFields, append: appendResult, remove: removeResult } = useFieldArray({
    control,
    name: 'results',
  });

  // Populate form when existing project loads
  useEffect(() => {
    if (existingProject) {
      reset({
        title: existingProject.title || '',
        slug: existingProject.slug || '',
        summary: existingProject.summary || '',
        description: existingProject.description || '',
        category: existingProject.category || 'website',
        industry: existingProject.industry || '',
        clientName: existingProject.clientName || '',
        year: existingProject.year || new Date().getFullYear(),
        liveUrl: existingProject.liveUrl || '',
        featured: existingProject.featured || false,
        order: existingProject.order || 0,
        testimonial: existingProject.testimonial || { quote: '', author: '', role: '' },
      });
      setCoverImage(existingProject.coverImage || null);
      setGallery(existingProject.gallery || []);
      setTechStack(existingProject.techStack || []);

      if (Array.isArray(existingProject.results)) {
        setValue('results', existingProject.results);
      }
    }
  }, [existingProject, reset, setValue]);

  const watchedTitle = watch('title', '');
  const watchedDescription = watch('description', '');

  // Auto-slugify on title change if new project
  useEffect(() => {
    if (!isEditing && watchedTitle) {
      const slug = watchedTitle
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', slug);
    }
  }, [watchedTitle, isEditing, setValue]);

  // Upload cover image handler
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploadingCover(true);
      const res = await api.post('/admin/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCoverImage({
        url: res.data.data.url,
        publicId: res.data.data.publicId,
        alt: watchedTitle || 'Project Cover Image',
      });
      toast.success('Cover image uploaded');
    } catch (err) {
      toast.error(err.message || 'Failed to upload cover image');
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Upload gallery image handler
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (gallery.length + files.length > 12) {
      toast.error('Maximum 12 gallery images allowed');
      return;
    }

    try {
      setIsUploadingGallery(true);
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await api.post('/admin/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setGallery((prev) => [
          ...prev,
          {
            url: res.data.data.url,
            publicId: res.data.data.publicId,
            alt: `Screenshot ${prev.length + 1}`,
          },
        ]);
      }
      toast.success('Gallery images uploaded');
    } catch (err) {
      toast.error(err.message || 'Failed to upload gallery images');
    } finally {
      setIsUploadingGallery(false);
    }
  };

  // Tech stack chip handlers
  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !techStack.includes(val) && techStack.length < 12) {
        setTechStack([...techStack, val]);
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (item) => {
    setTechStack(techStack.filter((t) => t !== item));
  };

  // Save / Publish Mutation
  const saveProjectMutation = useMutation({
    mutationFn: async ({ data, status }) => {
      const payload = {
        ...data,
        coverImage,
        gallery,
        techStack,
        status,
      };

      if (isEditing) {
        const res = await api.put(`/admin/projects/${id}`, payload);
        return res.data;
      } else {
        const res = await api.post('/admin/projects', payload);
        return res.data;
      }
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.status === 'published'
          ? 'Project published live!'
          : 'Project saved as draft.'
      );
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/admin/projects');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to save project');
    },
  });

  const onSubmit = (data, status) => {
    if (status === 'published' && !coverImage?.url) {
      toast.error('A cover image is required to publish a project live');
      return;
    }
    saveProjectMutation.mutate({ data, status });
  };

  if (isFetching) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  const canPublish = Boolean(coverImage?.url);

  return (
    <>
      <Seo title={isEditing ? 'Edit Project' : 'New Project'} noindex={true} />

      <div className="space-y-8 pb-20">
        {/* Back Link Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 text-sm text-fg-2 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to projects</span>
          </Link>
          <span className="font-mono text-xs text-fg-3">
            {isEditing ? `Editing ID: ${id}` : 'Draft Mode'}
          </span>
        </div>

        <form className="space-y-8" noValidate>
          {/* Section 1: Basics */}
          <Card className="p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-fg tracking-tight pb-3 border-b border-border-subtle">
              1. Project Basics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Project Title *"
                placeholder="e.g. Lumen Coffee Roasters"
                error={errors.title?.message}
                {...register('title')}
              />
              <Input
                label="URL Slug *"
                placeholder="lumen-coffee-roasters"
                error={errors.slug?.message}
                {...register('slug')}
              />
            </div>

            <Textarea
              label="Summary (One-line excerpt for cards & search) *"
              placeholder="A brief overview of the project scope and achievements..."
              rows={2}
              error={errors.summary?.message}
              {...register('summary')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Select
                label="Category *"
                error={errors.category?.message}
                {...register('category')}
              >
                <option value="website">Website</option>
                <option value="web-app">Web App</option>
                <option value="ecommerce">E-commerce</option>
                <option value="branding">Branding</option>
              </Select>

              <Input
                label="Client Name"
                placeholder="e.g. Acme Corp"
                error={errors.clientName?.message}
                {...register('clientName')}
              />

              <Input
                label="Industry"
                placeholder="e.g. FinTech / Retail"
                error={errors.industry?.message}
                {...register('industry')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="Year"
                type="number"
                placeholder="2025"
                error={errors.year?.message}
                {...register('year')}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Live Project URL"
                  placeholder="https://example.com"
                  error={errors.liveUrl?.message}
                  {...register('liveUrl')}
                />
              </div>
            </div>
          </Card>

          {/* Section 2: Media */}
          <Card className="p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-fg tracking-tight pb-3 border-b border-border-subtle">
              2. Cover & Gallery Media
            </h3>

            {/* Cover Image */}
            <div>
              <span className="block text-sm font-medium text-fg-2 mb-2">
                Cover Image * (16:10 ratio recommended)
              </span>
              {coverImage?.url ? (
                <div className="relative aspect-[16/10] max-w-md rounded-xl overflow-hidden bg-surface-hover border border-border-subtle group">
                  <img
                    src={cdn(coverImage.url, 800)}
                    alt={coverImage.alt || 'Cover'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="p-2 rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border-subtle hover:border-accent rounded-xl p-8 text-center max-w-md bg-surface-hover/30 transition-colors">
                  <ImageIcon className="w-8 h-8 text-fg-3 mx-auto mb-2" />
                  <p className="text-sm font-medium text-fg">Upload Cover Image</p>
                  <p className="text-xs text-fg-3 mt-1">JPEG, PNG, WebP up to 5MB</p>
                  <label htmlFor="cover-upload-input" className="mt-4 inline-block">
                    <span className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-accent/90 transition-colors inline-flex items-center gap-2">
                      {isUploadingCover ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      Choose File
                    </span>
                    <input
                      id="cover-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      disabled={isUploadingCover}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Gallery Upload */}
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-fg-2">
                  Gallery Screenshots ({gallery.length}/12)
                </span>
                <label htmlFor="gallery-upload-input" className="cursor-pointer">
                  <span className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    Add Screenshots
                  </span>
                  <input
                    id="gallery-upload-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                    disabled={isUploadingGallery}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface-hover border border-border-subtle group"
                  >
                    <img
                      src={cdn(img.url, 400)}
                      alt={img.alt || `Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white hover:bg-danger transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 3: Markdown Case Study */}
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="text-lg font-bold text-fg tracking-tight">
                3. Case Study Content (Markdown)
              </h3>
              <div className="flex rounded-lg bg-surface-hover p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'write' ? 'bg-surface text-accent' : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'preview' ? 'bg-surface text-accent' : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
              </div>
            </div>

            {activeTab === 'write' ? (
              <Textarea
                placeholder="### The Challenge&#10;Describe the client situation...&#10;&#10;### The Solution&#10;Describe what we built...&#10;&#10;### The Outcome&#10;Metrics and results..."
                rows={12}
                error={errors.description?.message}
                {...register('description')}
              />
            ) : (
              <div className="prose prose-invert max-w-none p-6 rounded-xl bg-surface border border-border-subtle min-h-[240px]">
                {watchedDescription ? (
                  <ReactMarkdown>{watchedDescription}</ReactMarkdown>
                ) : (
                  <p className="text-fg-3 italic">Nothing to preview yet.</p>
                )}
              </div>
            )}
          </Card>

          {/* Section 4: Details & Metrics */}
          <Card className="p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-fg tracking-tight pb-3 border-b border-border-subtle">
              4. Details, Results & Testimonial
            </h3>

            {/* Tech Stack Chips */}
            <div>
              <label htmlFor="tech-input-field" className="block text-sm font-medium text-fg-2 mb-2">
                Tech Stack Tags (max 12)
              </label>
              <div className="flex gap-2">
                <input
                  id="tech-input-field"
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  placeholder="Type tech name and press Enter (e.g. React, Stripe)"
                  className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-2 text-sm text-fg outline-none focus:border-accent"
                />
                <Button type="button" variant="secondary" size="sm" onClick={handleAddTech}>
                  Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-surface-hover text-fg border border-border-subtle"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-fg-3 hover:text-danger"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Results Repeater */}
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-fg-2">
                  Results & Metrics (Up to 4)
                </span>
                {resultsFields.length < 4 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => appendResult({ label: '', value: '' })}
                    iconRight={Plus}
                  >
                    Add Result
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {resultsFields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <Input
                      placeholder="e.g. Conversion Rate"
                      {...register(`results.${idx}.label`)}
                    />
                    <Input
                      placeholder="e.g. +140%"
                      {...register(`results.${idx}.value`)}
                    />
                    <button
                      type="button"
                      onClick={() => removeResult(idx)}
                      className="p-2.5 rounded-lg text-fg-3 hover:text-danger hover:bg-surface transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="pt-4 border-t border-border-subtle space-y-4">
              <span className="block text-sm font-medium text-fg-2">
                Client Testimonial (Optional)
              </span>
              <Textarea
                placeholder="Client quote..."
                rows={3}
                {...register('testimonial.quote')}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Author Name (e.g. Jane Doe)"
                  {...register('testimonial.author')}
                />
                <Input
                  placeholder="Author Role (e.g. CEO, Acme Inc.)"
                  {...register('testimonial.role')}
                />
              </div>
            </div>

            {/* Settings & Switches */}
            <div className="pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  {...register('featured')}
                  className="w-5 h-5 rounded border-border-subtle text-accent focus:ring-accent bg-surface cursor-pointer"
                />
                <label htmlFor="featured" className="text-sm font-medium text-fg cursor-pointer">
                  Featured Project (Spans 2 columns on homepage grid)
                </label>
              </div>

              <Input
                label="Sort Order (Lower appears first)"
                type="number"
                {...register('order')}
              />
            </div>
          </Card>

          {/* Sticky Bottom Actions Bar */}
          <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-[#0D0D14]/90 backdrop-blur-xl border border-border-subtle shadow-2xl flex items-center justify-between">
            <Button to="/admin/projects" variant="ghost" size="md">
              Cancel
            </Button>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                loading={isSubmitting || saveProjectMutation.isPending}
                onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
              >
                Save as Draft
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                disabled={!canPublish}
                loading={isSubmitting || saveProjectMutation.isPending}
                onClick={handleSubmit((data) => onSubmit(data, 'published'))}
                iconRight={Check}
              >
                Publish Live
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
