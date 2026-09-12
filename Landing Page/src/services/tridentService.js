/**
 * Trident Institution Service
 * 
 * Handles all data operations via the trident-backend REST API.
 * 
 * Public endpoints:  GET /notices, GET /events
 * Admin endpoints:   POST/PUT/DELETE with JWT auth
 */

import { apiRequest } from './apiClient';

// ═══════════════════════════════════════════════════════════
//  PUBLIC — No authentication required
// ═══════════════════════════════════════════════════════════

/**
 * Get active notices from the backend.
 * Backend already filters out archived notices.
 */
export async function getNotices() {
  try {
    return await apiRequest('/notices');
  } catch (error) {
    console.warn('[Trident Service] Failed to fetch notices:', error.message);
    return [];
  }
}

/**
 * Get ALL notices (including archived) — for admin dashboard only.
 * NOTE: Current backend returns only active notices. If admin needs
 * archived ones, a dedicated admin endpoint would be needed.
 * For now, reuses the public endpoint.
 */
export async function getAllNotices() {
  try {
    return await apiRequest('/notices');
  } catch (error) {
    console.error('[Trident Service] Failed to fetch all notices:', error);
    return [];
  }
}

/**
 * Get active events from the backend.
 * Backend already filters out archived events.
 */
export async function getEvents() {
  try {
    return await apiRequest('/events');
  } catch (error) {
    console.warn('[Trident Service] Failed to fetch events:', error.message);
    return [];
  }
}

/**
 * Get ALL events (including archived) — for admin dashboard only.
 */
export async function getAllEvents() {
  try {
    return await apiRequest('/events');
  } catch (error) {
    console.error('[Trident Service] Failed to fetch all events:', error);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════
//  ADMIN — Requires JWT authentication
// ═══════════════════════════════════════════════════════════

/**
 * Create a new notice.
 */
export async function createNotice(noticeData) {
  const result = await apiRequest('/admin/notices', {
    method: 'POST',
    body: noticeData,
    auth: true,
  });
  console.log('[Trident Service] ✅ Notice created:', result.id);
  return result;
}

/**
 * Update an existing notice (partial update).
 */
export async function updateNotice(noticeId, updates) {
  const result = await apiRequest(`/admin/notices/${noticeId}`, {
    method: 'PUT',
    body: updates,
    auth: true,
  });
  console.log('[Trident Service] ✅ Notice updated:', noticeId);
  return result;
}

/**
 * Archive (soft-delete) a notice.
 * The backend sets isArchived = true and hides it from public GET.
 */
export async function archiveNotice(noticeId) {
  const result = await apiRequest(`/admin/notices/${noticeId}`, {
    method: 'DELETE',
    auth: true,
  });
  console.log('[Trident Service] ✅ Notice archived:', noticeId);
  return result;
}

/**
 * Create a new event.
 */
export async function createEvent(eventData) {
  const result = await apiRequest('/admin/events', {
    method: 'POST',
    body: eventData,
    auth: true,
  });
  console.log('[Trident Service] ✅ Event created:', result.id);
  return result;
}

/**
 * Update an existing event.
 */
export async function updateEvent(eventId, updates) {
  const result = await apiRequest(`/admin/events/${eventId}`, {
    method: 'PUT',
    body: updates,
    auth: true,
  });
  console.log('[Trident Service] ✅ Event updated:', eventId);
  return result;
}

/**
 * Archive (soft-delete) an event.
 */
export async function archiveEvent(eventId) {
  const result = await apiRequest(`/admin/events/${eventId}`, {
    method: 'DELETE',
    auth: true,
  });
  console.log('[Trident Service] ✅ Event archived:', eventId);
  return result;
}

// ═══════════════════════════════════════════════════════════
//  NEWS — Public + Admin endpoints
// ═══════════════════════════════════════════════════════════

/**
 * Get active news from the backend.
 * Backend already filters out archived news.
 */
export async function getNews() {
  try {
    return await apiRequest('/news');
  } catch (error) {
    console.warn('[Trident Service] Failed to fetch news:', error.message);
    return [];
  }
}

/**
 * Get ALL news (including archived) — for admin dashboard only.
 */
export async function getAllNews() {
  try {
    return await apiRequest('/news');
  } catch (error) {
    console.error('[Trident Service] Failed to fetch all news:', error);
    return [];
  }
}

/**
 * Create a new news item.
 */
export async function createNews(newsData) {
  const result = await apiRequest('/admin/news', {
    method: 'POST',
    body: newsData,
    auth: true,
  });
  console.log('[Trident Service] ✅ News created:', result.id);
  return result;
}

/**
 * Update an existing news item.
 */
export async function updateNews(newsId, updates) {
  const result = await apiRequest(`/admin/news/${newsId}`, {
    method: 'PUT',
    body: updates,
    auth: true,
  });
  console.log('[Trident Service] ✅ News updated:', newsId);
  return result;
}

/**
 * Archive (soft-delete) a news item.
 */
export async function archiveNews(newsId) {
  const result = await apiRequest(`/admin/news/${newsId}`, {
    method: 'DELETE',
    auth: true,
  });
  console.log('[Trident Service] ✅ News archived:', newsId);
  return result;
}

