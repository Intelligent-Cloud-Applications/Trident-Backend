/**
 * Upload Service for Trident
 * 
 * Uses pre-signed S3 URLs — files upload directly from browser to S3.
 * XMLHttpRequest provides real-time upload progress (byte-level accuracy).
 * 
 * Used by both Notice and News admin forms.
 */

import { apiRequest } from './apiClient';

/**
 * Upload a single file with real-time progress tracking.
 * 
 * Flow:
 * 1. Request pre-signed URL from backend (tiny JSON call)
 * 2. PUT file directly to S3 via XMLHttpRequest (supports onprogress)
 * 3. Return the final public S3 URL
 * 
 * @param {File} file - The file to upload
 * @param {(percent: number) => void} onProgress - Progress callback (0-100)
 * @returns {Promise<{url: string, name: string, type: string}>}
 */
export async function uploadFileWithProgress(file, onProgress = () => {}) {
  // Step 1: Get pre-signed URL from backend
  const { uploadUrl, fileUrl } = await apiRequest('/admin/upload/presign', {
    method: 'POST',
    body: {
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
    },
    auth: true,
  });

  // Step 2: Upload directly to S3 with XMLHttpRequest for progress
  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Real-time progress: fires continuously as bytes are sent
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`S3 upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.ontimeout = () => reject(new Error('Upload timed out'));

    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.send(file); // Send raw file — no base64 encoding needed
  });

  // Determine file category for UI icons
  const fileType = file.type.startsWith('image/') ? 'image'
    : file.type === 'application/pdf' ? 'pdf'
    : file.type.startsWith('video/') ? 'video'
    : 'file';

  return { url: fileUrl, name: file.name, type: fileType };
}

/**
 * Upload multiple files with individual progress tracking.
 * Files are uploaded sequentially to avoid overwhelming the connection.
 * 
 * @param {File[]} files - Array of files to upload
 * @param {(fileIndex: number, percent: number, fileName: string) => void} onFileProgress
 * @returns {Promise<Array<{url: string, name: string, type: string}>>}
 */
export async function uploadMultipleFiles(files, onFileProgress = () => {}) {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const result = await uploadFileWithProgress(files[i], (percent) => {
      onFileProgress(i, percent, files[i].name);
    });
    results.push(result);
  }

  return results;
}
