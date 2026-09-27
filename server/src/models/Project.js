import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  summary: { type: String, required: true, maxlength: 240 },
  description: { type: String, default: '' },
  category: { type: String, enum: ['website', 'web-app', 'ecommerce', 'branding'], required: true },
  industry: { type: String, default: '' },
  clientName: { type: String, default: '' },
  year: { type: Number, min: 2000, max: 2100 },
  techStack: { type: [String], default: [] },
  coverImage: { url: String, publicId: String, alt: String },
  gallery: [{ url: String, publicId: String, alt: String }],
  liveUrl: { type: String, default: '' },
  results: [{ label: String, value: String }],
  testimonial: { quote: String, author: String, role: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  publishedAt: Date,
  order: { type: Number, default: 0 },
}, { timestamps: true });

projectSchema.index({ status: 1, order: 1, publishedAt: -1 });

export default mongoose.model('Project', projectSchema);
