import Inquiry from '../models/Inquiry.js';
import { sendInquiryNotification } from './mail.js';
import { ApiError } from '../utils/ApiError.js';

export const createInquiry = async (data, ip, userAgent) => {
  const inquiry = await Inquiry.create({ ...data, ip, userAgent });
  sendInquiryNotification(inquiry); // non-blocking
  return inquiry;
};

export const getAdminInquiries = async (filter = {}, page = 1, limit = 50) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (p - 1) * l;

  const [data, total] = await Promise.all([
    Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(l).lean(),
    Inquiry.countDocuments(filter)
  ]);

  return { data, meta: { page: p, limit: l, total, totalPages: Math.ceil(total / l) } };
};

export const updateInquiryStatus = async (id, status) => {
  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found', 'NOT_FOUND');
  }

  inquiry.status = status;
  await inquiry.save();
  return inquiry.toJSON();
};

export const deleteInquiry = async (id) => {
  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found', 'NOT_FOUND');
  }

  await Inquiry.findByIdAndDelete(id);
  return { id };
};
