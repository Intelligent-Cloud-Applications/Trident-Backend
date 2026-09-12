/**
 * Upload Service for Trident
 * 
 * Uploads files to S3 via the trident-backend
 * POST /admin/upload endpoint (JWT protected).
 * Supports images (compressed), PDFs, documents, and any other file type.
 */

import { compressImage } from '../utils/imageUtils';
import { apiRequest } from './apiClient';

/**
 * Read a file as base64 data URL (no compression).
 */
const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Upload a file to S3 via the backend API.
 * Images are compressed; other files are uploaded as-is.
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The public S3 URL of the uploaded file
 */
export const uploadFile = async (file) => {
  const isImage = file.type.startsWith('image/');

  let fileData;
  let contentType = file.type || 'application/octet-stream';

  if (isImage) {
    console.log('[UPLOAD] Compressing image...');
    fileData = await compressImage(file);
    contentType = 'image/jpeg';
  } else {
    console.log('[UPLOAD] Reading file as base64...');
    fileData = await readFileAsDataUrl(file);
  }

  console.log('[UPLOAD] Uploading to Backend API...');
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const data = await apiRequest('/admin/upload', {
    method: 'POST',
    body: { fileName, fileData, contentType },
    auth: true,
  });

  if (data?.url) {
    console.log('[UPLOAD] ✅ Success! S3 URL:', data.url);
    return data.url;
  }

  throw new Error('S3 upload returned no URL');
};
