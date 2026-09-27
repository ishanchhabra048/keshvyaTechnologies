import { createInquiry } from '../services/inquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const handleInquiry = asyncHandler(async (req, res) => {
  if (req.body.website) return res.status(201).json({ success: true }); // honeypot
  
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  
  const inquiry = await createInquiry(req.body, ip, userAgent);
  res.status(201).json({ success: true, data: { id: inquiry._id } });
});
