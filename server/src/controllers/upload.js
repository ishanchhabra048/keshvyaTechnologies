import { uploadImage, deleteImage } from '../services/upload.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const handleUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Image file is required', 'BAD_REQUEST');
  }

  const result = await uploadImage(req.file.buffer);
  sendSuccess(res, result, undefined, 201);
});

export const handleDelete = asyncHandler(async (req, res) => {
  const publicId = decodeURIComponent(req.params.publicId);
  const result = await deleteImage(publicId);
  sendSuccess(res, result || { result: 'ok' });
});
