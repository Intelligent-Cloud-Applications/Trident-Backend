/**
 * Trident Configuration
 * 
 * All values come from .env file — single source of truth.
 * To change any credential, edit .env and restart dev server.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hf37rb1vik.execute-api.us-east-1.amazonaws.com/prod';
export const S3_BUCKET = import.meta.env.VITE_S3_BUCKET || 'trident-notice';
export const S3_REGION = 'us-east-1';
