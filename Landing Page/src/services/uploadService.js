/**
 * Upload Service for Trident
 * 
 * Uses pre-signed S3 URLs — files upload directly from browser to S3.
 * XMLHttpRequest provides real-time upload progress (byte-level accuracy).
 * 
 * Used by both Notice and News admin forms.
 */

import { API_BASE_URL } from '../config/api';
import { getToken } from './apiClient';

/**
 * Upload a single file with real-time progress tracking.
 * 
 * Flow:
 * 1. Read file as base64 using FileReader
 * 2. POST base64 directly to backend via XMLHttpRequest (supports onprogress)
 * 3. Return the final public S3 URL
 * 
 * @param {File} file - The file to upload
 * @param {(percent: number) => void} onProgress - Progress callback (0-100)
 * @returns {Promise<{url: string, name: string, type: string}>}
 */
export async function uploadFileWithProgress(file, onProgress = () => {}) {
  // Step 1: Read file as base64
  const base64Data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  // Step 2: Upload base64 to backend via XMLHttpRequest
  const data = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const token = getToken();

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
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response); // Resolves with { fileUrl, key } from backend
        } catch (e) {
          reject(new Error('Invalid JSON response from server'));
        }
      } else {
        reject(new Error(`Backend upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.ontimeout = () => reject(new Error('Upload timed out'));

    xhr.open('POST', `${API_BASE_URL}/admin/upload/base64`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    const payload = JSON.stringify({
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
      base64Data: base64Data
    });

    xhr.send(payload);
  });

  // Determine file category for UI icons
  const fileType = file.type.startsWith('image/') ? 'image'
    : file.type === 'application/pdf' ? 'pdf'
    : file.type.startsWith('video/') ? 'video'
    : 'file';

  return { url: data.fileUrl, name: file.name, type: fileType };
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
