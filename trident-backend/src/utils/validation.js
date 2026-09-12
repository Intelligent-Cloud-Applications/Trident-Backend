/**
 * Validation utilities for incoming request payloads
 */

function validateNoticePayload(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }
  return errors;
}

function validateEventPayload(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }
  return errors;
}

module.exports = {
  validateNoticePayload,
  validateEventPayload,
};
