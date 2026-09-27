import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  projectType: { type: String, required: true, enum: ['New website', 'Redesign', 'Web app', 'E-commerce', 'Other'] },
  budget: { type: String, required: true, enum: ['Under $1k', '$1k-$3k', '$3k-$10k', '$10k+', 'Not sure'] },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  ip: String,
  userAgent: String
}, { timestamps: true });

inquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Inquiry', inquirySchema);
