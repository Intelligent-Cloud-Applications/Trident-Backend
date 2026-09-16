/**
 * Validation utilities for incoming request payloads
 */

function validateNoticePayload(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }
  if (data.attachments && !Array.isArray(data.attachments)) {
    errors.push('Attachments must be an array.');
  }
  return errors;
}

function validateNewsPayload(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }
  if (data.images && !Array.isArray(data.images)) {
    errors.push('Images must be an array of URLs.');
  }
  if (data.pdfs && !Array.isArray(data.pdfs)) {
    errors.push('PDFs must be an array of {name, url} objects.');
  }
  if (data.pdfs && Array.isArray(data.pdfs)) {
    data.pdfs.forEach((pdf, i) => {
      if (!pdf.name || !pdf.url) {
        errors.push(`PDF at index ${i} must have both "name" and "url".`);
      }
    });
  }
  return errors;
}

module.exports = {
  validateNoticePayload,
  validateNewsPayload,
};
