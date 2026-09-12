/**
 * Admin Dashboard — /admin/dashboard
 * 
 * Protected page — requires admin login.
 * Uses tridentService (REST API → DynamoDB) for all data operations.
 * Tab-based layout: Notices | Events | News
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getNotices, getAllNotices, createNotice, updateNotice, archiveNotice,
  getEvents, getAllEvents, createEvent, updateEvent, archiveEvent,
  getNews, createNews, updateNews, archiveNews,
} from '../../services/tridentService';
import { uploadFile } from '../../services/uploadService';
import {
  Bell, Calendar, Plus, Pencil, Trash2, LogOut, ArrowLeft,
  Save, X, Loader2, CheckCircle, AlertCircle, Upload,
  FileText, ToggleLeft, ToggleRight,
  RefreshCw, Archive, Newspaper,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Category & Type Config
   ═══════════════════════════════════════════════════════════ */

const NOTICE_CATEGORIES = [
  'Academic', 'Placement', 'Event', 'General', 'Administration',
  'Examination', 'Admissions', 'Innovation', 'Research', 'Workshop',
];

const EVENT_TYPES = [
  'Seminar', 'Workshop', 'Academic', 'Cultural', 'Sports',
  'Research', 'Reunion', 'Publication', 'Ceremony', 'Conference',
  'Networking', 'Hackathon', 'Webinar', 'Competition',
];

const CAT_COLORS = {
  Academic: '#2C3A8C', Placement: '#006738', Event: '#C41E3A',
  General: '#A59381', Administration: '#E8BD63', Examination: '#7C3AED',
  Admissions: '#0891B2', Innovation: '#EA580C', Research: '#4338CA', Workshop: '#059669',
};

/* ═══════════════════════════════════════════════════════════
   Toast Notification
   ═══════════════════════════════════════════════════════════ */

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium animate-slide-in ${
      type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Notice Form
   ═══════════════════════════════════════════════════════════ */

function NoticeForm({ initialData, onSubmit, onCancel, onUpload }) {
  const isCustomCategory = initialData?.category && !NOTICE_CATEGORIES.includes(initialData.category);
  const [selectedCategory, setSelectedCategory] = useState(isCustomCategory ? 'Other' : (initialData?.category || 'Academic'));

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Academic',
    customCategory: isCustomCategory ? initialData.category : '',
    date: initialData?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    isNew: initialData?.isNew ?? true,
    isPinned: initialData?.isPinned || false,
    linkUrl: initialData?.linkUrl || '',
    imageUrl: initialData?.imageUrl || '',
    fileUrl: initialData?.fileUrl || '',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUpload(file);
      handleChange('fileUrl', url);
      // Also set imageUrl if it's an image (for display purposes)
      if (file.type.startsWith('image/')) {
        handleChange('imageUrl', url);
      }
    } catch (err) {
      alert('File upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <div className="rounded-3xl p-8 space-y-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
      <h3 className="text-xl font-bold text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#E8BD63]/10 flex items-center justify-center">
          <FileText size={20} className="text-[#E8BD63]" />
        </div>
        {initialData ? 'Edit Notice' : 'Create New Notice'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
            maxLength={200} placeholder="Enter notice title..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Description *</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)}
            maxLength={2000} rows={3} placeholder="Enter notice description..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none resize-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Category *</label>
          <select value={selectedCategory} onChange={(e) => {
            setSelectedCategory(e.target.value);
            if (e.target.value !== 'Other') {
              handleChange('category', e.target.value);
              handleChange('customCategory', '');
            } else {
              handleChange('category', form.customCategory || '');
            }
          }}
            className="w-full px-4 py-3 rounded-xl text-sm text-white font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40 appearance-none"
            style={inputStyle}>
            {NOTICE_CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-[#1a1f36]">{cat}</option>)}
            <option value="Other" className="bg-[#1a1f36]">Other (Custom)</option>
          </select>
          {selectedCategory === 'Other' && (
            <input type="text" value={form.customCategory}
              onChange={(e) => { handleChange('customCategory', e.target.value); handleChange('category', e.target.value); }}
              maxLength={100} placeholder="Enter custom category..."
              className="w-full px-4 py-3 mt-2 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
              style={inputStyle} />
          )}
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Date *</label>
          <input type="text" value={form.date} onChange={(e) => handleChange('date', e.target.value)}
            placeholder="e.g., 15 Jul 2026"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Link URL (optional)</label>
          <input type="url" value={form.linkUrl} onChange={(e) => handleChange('linkUrl', e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">📎 Attach File (optional)</label>
          <label className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${uploading ? 'text-[#E8BD63]' : form.fileUrl ? 'text-emerald-400/80' : 'text-white/40 hover:text-white/60'}`}
            style={inputStyle}>
            <Upload size={14} className={uploading ? 'animate-spin' : ''} />
            {uploading ? 'Uploading...' : form.fileUrl ? 'File attached ✓' : 'Image, PDF, DOC, etc.'}
            <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv" onChange={handleFileUpload} className="hidden" disabled={uploading} />
          </label>
          {form.fileUrl && (
            <p className="text-[10px] text-emerald-400/60 mt-1 truncate px-1">
              ✓ File will be available for download
            </p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button type="button" onClick={() => handleChange('isNew', !form.isNew)}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {form.isNew ? <ToggleRight size={20} className="text-emerald-400" /> : <ToggleLeft size={20} />}
            Mark as New
          </button>
          <button type="button" onClick={() => handleChange('isPinned', !form.isPinned)}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {form.isPinned ? <ToggleRight size={20} className="text-[#E8BD63]" /> : <ToggleLeft size={20} />}
            Pin to Top
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onSubmit(form)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', color: '#1A2660' }}>
          <Save size={14} /> {initialData ? 'Update Notice' : 'Publish Notice'}
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Event Form
   ═══════════════════════════════════════════════════════════ */

function EventForm({ initialData, onSubmit, onCancel, onUpload }) {
  const isCustomType = initialData?.type && !EVENT_TYPES.includes(initialData.type);
  const [selectedType, setSelectedType] = useState(isCustomType ? 'Other' : (initialData?.type || 'Seminar'));

  const [form, setForm] = useState({
    title: initialData?.title || '',
    type: initialData?.type || 'Seminar',
    customType: isCustomType ? initialData.type : '',
    date: initialData?.date || '',
    venue: initialData?.venue || '',
    time: initialData?.time || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    fileUrl: initialData?.fileUrl || '',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUpload(file);
      handleChange('fileUrl', url);
      if (file.type.startsWith('image/')) {
        handleChange('imageUrl', url);
      }
    } catch (err) {
      alert('File upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <div className="rounded-3xl p-8 space-y-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
      <h3 className="text-xl font-bold text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#E8BD63]/10 flex items-center justify-center">
          <Calendar size={20} className="text-[#E8BD63]" />
        </div>
        {initialData ? 'Edit Event' : 'Create New Event'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
            maxLength={200} placeholder="Enter event title..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Type *</label>
          <select value={selectedType} onChange={(e) => {
            setSelectedType(e.target.value);
            if (e.target.value !== 'Other') {
              handleChange('type', e.target.value);
              handleChange('customType', '');
            } else {
              handleChange('type', form.customType || '');
            }
          }}
            className="w-full px-4 py-3 rounded-xl text-sm text-white font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40 appearance-none"
            style={inputStyle}>
            {EVENT_TYPES.map(t => <option key={t} value={t} className="bg-[#1a1f36]">{t}</option>)}
            <option value="Other" className="bg-[#1a1f36]">Other (Custom)</option>
          </select>
          {selectedType === 'Other' && (
            <input type="text" value={form.customType}
              onChange={(e) => { handleChange('customType', e.target.value); handleChange('type', e.target.value); }}
              maxLength={100} placeholder="Enter custom event type..."
              className="w-full px-4 py-3 mt-2 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
              style={inputStyle} />
          )}
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Date *</label>
          <input type="text" value={form.date} onChange={(e) => handleChange('date', e.target.value)}
            placeholder="e.g., Jul 15"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Venue (optional)</label>
          <input type="text" value={form.venue} onChange={(e) => handleChange('venue', e.target.value)}
            maxLength={200} placeholder="e.g., Main Auditorium"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Time (optional)</label>
          <input type="text" value={form.time} onChange={(e) => handleChange('time', e.target.value)}
            placeholder="e.g., 09:00 AM"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Description (optional)</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)}
            maxLength={1000} rows={3} placeholder="Event description..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none resize-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">📎 Attach File (optional)</label>
          <label className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${uploading ? 'text-[#E8BD63]' : form.fileUrl ? 'text-emerald-400/80' : 'text-white/40 hover:text-white/60'}`}
            style={inputStyle}>
            <Upload size={14} className={uploading ? 'animate-spin' : ''} />
            {uploading ? 'Uploading...' : form.fileUrl ? 'File attached ✓' : 'Image, Video, PDF, DOC, etc.'}
            <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.csv" onChange={handleFileUpload} className="hidden" disabled={uploading} />
          </label>
          {form.fileUrl && (
            <p className="text-[10px] text-emerald-400/60 mt-1 truncate px-1">
              ✓ File will be available for download
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onSubmit(form)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', color: '#1A2660' }}>
          <Save size={14} /> {initialData ? 'Update Event' : 'Publish Event'}
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   News Form
   ═══════════════════════════════════════════════════════════ */

function NewsForm({ initialData, onSubmit, onCancel, onUpload }) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    imageUrl: initialData?.imageUrl || '',
    linkUrl: initialData?.linkUrl || '',
    featured: initialData?.featured || false,
    isNew: initialData?.isNew ?? true,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await onUpload(file);
      handleChange('imageUrl', url);
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <div className="rounded-3xl p-8 space-y-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
      <h3 className="text-xl font-bold text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#E8BD63]/10 flex items-center justify-center">
          <Newspaper size={20} className="text-[#E8BD63]" />
        </div>
        {initialData ? 'Edit News' : 'Create New News'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
            maxLength={200} placeholder="Enter news headline..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Description *</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)}
            maxLength={2000} rows={3} placeholder="Enter news description..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none resize-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Category *</label>
          <input type="text" value={form.category} onChange={(e) => handleChange('category', e.target.value)}
            maxLength={100} placeholder="e.g., Accreditation, Placement, Achievement..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Date *</label>
          <input type="text" value={form.date} onChange={(e) => handleChange('date', e.target.value)}
            placeholder="e.g., Mar 10, 2026"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">Link URL (optional)</label>
          <input type="url" value={form.linkUrl} onChange={(e) => handleChange('linkUrl', e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40"
            style={inputStyle} />
        </div>

        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-1.5">🖼️ Upload Image (optional)</label>
          <label className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${uploading ? 'text-[#E8BD63]' : form.imageUrl ? 'text-emerald-400/80' : 'text-white/40 hover:text-white/60'}`}
            style={inputStyle}>
            <Upload size={14} className={uploading ? 'animate-spin' : ''} />
            {uploading ? 'Uploading...' : form.imageUrl ? 'Image attached ✓' : 'Choose image file'}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
          {form.imageUrl && (
            <p className="text-[10px] text-emerald-400/60 mt-1 truncate px-1">
              ✓ Image will be displayed on the news card
            </p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button type="button" onClick={() => handleChange('featured', !form.featured)}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {form.featured ? <ToggleRight size={20} className="text-[#E8BD63]" /> : <ToggleLeft size={20} />}
            Featured Article
          </button>
          <button type="button" onClick={() => handleChange('isNew', !form.isNew)}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
            {form.isNew ? <ToggleRight size={20} className="text-emerald-400" /> : <ToggleLeft size={20} />}
            Mark as New
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onSubmit(form)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', color: '#1A2660' }}>
          <Save size={14} /> {initialData ? 'Update News' : 'Publish News'}
        </button>
        <button onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Dashboard
   ═══════════════════════════════════════════════════════════ */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, admin, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('notices');
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [archiveConfirm, setArchiveConfirm] = useState(null);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  // Fetch data from backend API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [n, e, nw] = await Promise.all([getNotices(), getEvents(), getNews()]);
      setNotices(n);
      setEvents(e);
      setNews(nw);
    } catch (err) {
      showToast('Failed to fetch data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  // ── Notice CRUD (calls tridentService → REST API → DynamoDB) ──

  const handleCreateNotice = async (formData) => {
    setSaving(true);
    try {
      await createNotice(formData);
      showToast('Notice published to DynamoDB ✅');
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleUpdateNotice = async (formData) => {
    setSaving(true);
    try {
      await updateNotice(editingItem.id, formData);
      showToast('Notice updated in DynamoDB ✅');
      setEditingItem(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleArchiveNotice = async (id) => {
    try {
      await archiveNotice(id);
      showToast('Notice archived (soft delete) ✅');
      setArchiveConfirm(null);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    }
  };

  // ── Event CRUD ──

  const handleCreateEvent = async (formData) => {
    setSaving(true);
    try {
      await createEvent(formData);
      showToast('Event published to DynamoDB ✅');
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleUpdateEvent = async (formData) => {
    setSaving(true);
    try {
      await updateEvent(editingItem.id, formData);
      showToast('Event updated in DynamoDB ✅');
      setEditingItem(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleArchiveEvent = async (id) => {
    try {
      await archiveEvent(id);
      showToast('Event archived (soft delete) ✅');
      setArchiveConfirm(null);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    }
  };

  // ── News CRUD ──

  const handleCreateNews = async (formData) => {
    setSaving(true);
    try {
      await createNews(formData);
      showToast('News published to DynamoDB ✅');
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleUpdateNews = async (formData) => {
    setSaving(true);
    try {
      await updateNews(editingItem.id, formData);
      showToast('News updated in DynamoDB ✅');
      setEditingItem(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    } finally { setSaving(false); }
  };

  const handleArchiveNews = async (id) => {
    try {
      await archiveNews(id);
      showToast('News archived (soft delete) ✅');
      setArchiveConfirm(null);
      fetchData();
    } catch (err) {
      showToast('Failed: ' + err.message, 'error');
    }
  };

  const handleLogout = () => { logout(); navigate('/admin', { replace: true }); };

  if (!isAuthenticated) return null;

  const currentItems = activeTab === 'notices' ? notices : activeTab === 'events' ? events : news;

  return (
    <div className="min-h-screen relative overflow-hidden pt-[100px]" style={{ background: 'linear-gradient(135deg, #070B1A 0%, #0f172a 30%, #1A2660 60%, #0f172a 100%)' }}>
      
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] bg-[#2C3A8C]/20 rounded-full blur-[80px] animate-float-slow" />
        <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] bg-[#E8BD63]/10 rounded-full blur-[80px] animate-float-delayed" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Archive Confirmation Modal */}
      {archiveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B1A]/80 backdrop-blur-md">
          <div className="rounded-3xl p-8 max-w-sm mx-4 space-y-5 shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                <Archive size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg text-white font-bold mb-1">Archive Item?</h3>
                <p className="text-white/40 text-sm leading-relaxed">It will be hidden from the public site, but preserved in the database.</p>
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <p className="text-white/70 text-sm font-medium line-clamp-2">"{archiveConfirm.title}"</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => {
                if (activeTab === 'notices') handleArchiveNotice(archiveConfirm.id);
                else if (activeTab === 'events') handleArchiveEvent(archiveConfirm.id);
                else handleArchiveNews(archiveConfirm.id);
              }} className="flex-1 py-3 rounded-xl text-sm font-bold bg-amber-500 text-[#1A2660] hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                Archive It
              </button>
              <button onClick={() => setArchiveConfirm(null)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/50 hover:text-white transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(7,11,26,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-6">
          <a href="/" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/5">
            <ArrowLeft size={18} />
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8BD63] to-[#C99E47] flex items-center justify-center shadow-lg shadow-[#E8BD63]/20">
              <span className="text-[#1A2660] font-bold serif text-lg">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Trident <span className="text-[#E8BD63]">Admin</span>
              </h1>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Logged in as <span className="text-[#E8BD63] ml-1 font-bold">{admin?.name || 'Admin'}</span>
                <span className="text-white/20 mx-1">•</span>
                <span className="text-white/40">{admin?.role?.toUpperCase()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/5" title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-red-500/20">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          {/* Tab Switcher */}
          <div className="flex items-center p-1.5 rounded-2xl flex-wrap gap-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <button onClick={() => { setActiveTab('notices'); setShowForm(false); setEditingItem(null); }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'notices' ? 'bg-[#E8BD63] text-[#1A2660] shadow-lg shadow-[#E8BD63]/20' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}>
              <Bell size={16} /> Notices ({notices.length})
            </button>
            <button onClick={() => { setActiveTab('events'); setShowForm(false); setEditingItem(null); }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'events' ? 'bg-[#E8BD63] text-[#1A2660] shadow-lg shadow-[#E8BD63]/20' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}>
              <Calendar size={16} /> Events ({events.length})
            </button>
            <button onClick={() => { setActiveTab('news'); setShowForm(false); setEditingItem(null); }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'news' ? 'bg-[#E8BD63] text-[#1A2660] shadow-lg shadow-[#E8BD63]/20' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}>
              <Newspaper size={16} /> News ({news.length})
            </button>
          </div>

          {/* Add New Button */}
          {!showForm && !editingItem && (
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(232,189,99,0.3)] group"
              style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', color: '#1A2660' }}>
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              Add {activeTab === 'notices' ? 'Notice' : activeTab === 'events' ? 'Event' : 'News'}
            </button>
          )}
        </div>

        {/* Form Area */}
        {(showForm || editingItem) && (
          <div className="mb-10 animate-slide-up">
            {activeTab === 'notices' ? (
              <NoticeForm initialData={editingItem}
                onSubmit={editingItem ? handleUpdateNotice : handleCreateNotice}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
                onUpload={uploadFile} />
            ) : activeTab === 'events' ? (
              <EventForm initialData={editingItem}
                onSubmit={editingItem ? handleUpdateEvent : handleCreateEvent}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
                onUpload={uploadFile} />
            ) : (
              <NewsForm initialData={editingItem}
                onSubmit={editingItem ? handleUpdateNews : handleCreateNews}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
                onUpload={uploadFile} />
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 relative flex items-center justify-center mb-4">
              <div className="absolute inset-0 border-4 border-[#E8BD63]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-[#E8BD63] rounded-full border-t-transparent animate-spin" />
              <div className="w-6 h-6 bg-[#E8BD63] rounded-full animate-pulse" />
            </div>
            <span className="text-white/40 text-sm font-medium uppercase tracking-widest">Loading...</span>
          </div>
        )}

        {/* Items List */}
        {!loading && (
          <div className="space-y-4">
            {currentItems.length === 0 ? (
              <div className="text-center py-24 rounded-3xl border border-dashed border-white/10" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-5">
                  {activeTab === 'notices' ? <Bell size={32} className="text-white/20" /> : activeTab === 'events' ? <Calendar size={32} className="text-white/20" /> : <Newspaper size={32} className="text-white/20" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No {activeTab} yet</h3>
                <p className="text-white/30 text-sm font-medium">Click the "Add New" button to create your first entry.</p>
              </div>
            ) : (
              currentItems.map((item, idx) => (
                <div key={item.id}
                  className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.08)',
                    animationDelay: `${idx * 40}ms`
                  }}>
                  {/* Category Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ background: CAT_COLORS[item.category] || CAT_COLORS[item.type] || '#E8BD63' }} />

                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `${CAT_COLORS[item.category] || CAT_COLORS[item.type] || '#A59381'}15`,
                      color: CAT_COLORS[item.category] || CAT_COLORS[item.type] || '#A59381',
                    }}>
                    {activeTab === 'notices' ? <Bell size={20} /> : activeTab === 'events' ? <Calendar size={20} /> : <Newspaper size={20} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-white truncate mb-1 group-hover:text-[#E8BD63] transition-colors">{item.title}</h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{ background: `${CAT_COLORS[item.category] || CAT_COLORS[item.type] || '#A59381'}20`, color: CAT_COLORS[item.category] || CAT_COLORS[item.type] || '#A59381' }}>
                        {item.category || item.type}
                      </span>
                      <span className="text-[12px] text-white/30 font-medium">{item.date}</span>
                      {item.isNew && <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-500 to-orange-500 px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.3)]">New</span>}
                    </div>
                    {/* Audit trail — shows which admin created/updated this item */}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {item.createdByName && (
                        <span className="text-[10px] text-white/25 font-medium flex items-center gap-1">
                          Created by <span className="text-emerald-400/60 font-semibold">{item.createdByName}</span>
                        </span>
                      )}
                      {item.updatedByName && (
                        <span className="text-[10px] text-white/25 font-medium flex items-center gap-1">
                          • Updated by <span className="text-sky-400/60 font-semibold">{item.updatedByName}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button onClick={() => { setEditingItem(item); setShowForm(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/20" title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => setArchiveConfirm(item)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-amber-400 hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/20" title="Archive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes float-slow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, 30px); } }
        @keyframes float-delayed { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 20px); } }
        
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 12s ease-in-out infinite reverse; }
        
        /* Staggered list animation */
        .space-y-4 > div {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}
