/**
 * UploadProgress — Reusable upload progress UI component
 * 
 * Shows individual progress bars per file with:
 * - File type icon (🖼️ image, 📄 PDF, 🎬 video, 📎 file)
 * - Filename
 * - Animated progress bar (0-100%)
 * - Status: uploading / complete / failed
 * - Overall progress summary
 * 
 * Used by both NoticeForm and NewsForm in AdminDashboard.
 */

import { CheckCircle, AlertCircle, Loader2, Image, FileText, Film, Paperclip, X } from 'lucide-react';

const FILE_ICONS = {
  image: Image,
  pdf: FileText,
  video: Film,
  file: Paperclip,
};

/**
 * Single file progress bar
 */
function FileProgressBar({ fileName, percent, status, fileType, onRemove }) {
  const Icon = FILE_ICONS[fileType] || Paperclip;
  const isComplete = status === 'complete' || percent === 100;
  const isFailed = status === 'failed';
  const isUploading = status === 'uploading' && percent < 100;

  const barColor = isFailed
    ? 'bg-red-500'
    : isComplete
    ? 'bg-emerald-500'
    : 'bg-[#E8BD63]';

  const barBg = isFailed
    ? 'bg-red-500/10'
    : isComplete
    ? 'bg-emerald-500/10'
    : 'bg-white/5';

  return (
    <div className="flex items-center gap-3 py-2">
      {/* File icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isComplete ? 'bg-emerald-500/10' : isFailed ? 'bg-red-500/10' : 'bg-[#E8BD63]/10'
      }`}>
        <Icon size={14} className={
          isComplete ? 'text-emerald-400' : isFailed ? 'text-red-400' : 'text-[#E8BD63]'
        } />
      </div>

      {/* Progress area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-white/60 truncate max-w-[200px]">
            {fileName}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isUploading && (
              <span className="text-[11px] font-bold text-[#E8BD63]">{percent}%</span>
            )}
            {isComplete && <CheckCircle size={13} className="text-emerald-400" />}
            {isFailed && <AlertCircle size={13} className="text-red-400" />}
            {isUploading && <Loader2 size={13} className="text-[#E8BD63] animate-spin" />}
          </div>
        </div>

        {/* Progress bar */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${barBg}`}>
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${barColor}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>

      {/* Remove button (only when not uploading) */}
      {!isUploading && onRemove && (
        <button
          onClick={onRemove}
          className="w-6 h-6 rounded-md flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors flex-shrink-0"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

/**
 * Main UploadProgress component
 * 
 * @param {Array<{fileName, percent, status, fileType}>} files - File progress data
 * @param {(index: number) => void} onRemoveFile - Remove a completed/failed file
 */
export default function UploadProgress({ files = [], onRemoveFile }) {
  if (files.length === 0) return null;

  const completed = files.filter(f => f.status === 'complete' || f.percent === 100).length;
  const failed = files.filter(f => f.status === 'failed').length;
  const uploading = files.some(f => f.status === 'uploading' && f.percent < 100);

  return (
    <div className="rounded-xl p-4 space-y-1" style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* File list */}
      {files.map((file, i) => (
        <FileProgressBar
          key={file.fileName + i}
          fileName={file.fileName}
          percent={file.percent}
          status={file.status}
          fileType={file.fileType}
          onRemove={onRemoveFile ? () => onRemoveFile(i) : undefined}
        />
      ))}

      {/* Summary bar */}
      <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="text-[10px] font-medium text-white/30">
          {completed} of {files.length} file{files.length !== 1 ? 's' : ''} complete
          {failed > 0 && <span className="text-red-400 ml-1">• {failed} failed</span>}
        </span>
        {uploading && (
          <span className="text-[10px] font-medium text-[#E8BD63] flex items-center gap-1">
            <Loader2 size={10} className="animate-spin" /> Uploading...
          </span>
        )}
      </div>
    </div>
  );
}

export { FileProgressBar };
