import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export const uploadImage = async (fileBuffer) => {
  if (!env.CLOUDINARY_CLOUD_NAME) {
    const base64 = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    return {
      url: base64,
      publicId: `mock_${Date.now()}`,
      width: 800,
      height: 600,
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'agency/projects',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(new ApiError(500, error.message || 'Image upload failed', 'SERVER_ERROR'));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

export const deleteImage = async (publicId) => {
  if (!env.CLOUDINARY_CLOUD_NAME || !publicId || publicId.startsWith('mock_')) {
    return { result: 'ok' };
  }
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Failed to delete image from Cloudinary:', error.message);
    return null;
  }
};
