/**
 * Skeleton Loading Components
 * 
 * Premium shimmer-based skeleton loaders for the admin dashboard.
 * Provides visual feedback while data loads from the API.
 */

/* ── Base Skeleton Pulse ── */
function SkeletonPulse({ className = '', style = {} }) {
  return (
    <div className={`skeleton-pulse rounded-xl ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)', ...style }} />
  );
}

/* ── Dashboard Header Skeleton ── */
export function DashboardHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
      style={{ background: 'rgba(7,11,26,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-6">
        <SkeletonPulse className="w-10 h-10 rounded-xl" />
        <div className="flex items-center gap-3">
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <SkeletonPulse className="w-32 h-5 rounded-lg" />
            <SkeletonPulse className="w-24 h-3 rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <SkeletonPulse className="w-10 h-10 rounded-xl" />
        <SkeletonPulse className="w-24 h-10 rounded-xl" />
      </div>
    </header>
  );
}

/* ── Tab Switcher Skeleton ── */
export function TabSwitcherSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
      <div className="flex items-center gap-2 p-1.5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <SkeletonPulse className="w-36 h-12 rounded-xl" />
        <SkeletonPulse className="w-36 h-12 rounded-xl" />
      </div>
      <SkeletonPulse className="w-40 h-14 rounded-2xl" />
    </div>
  );
}

/* ── Notice/Event Card Skeleton ── */
export function CardSkeleton({ index = 0 }) {
  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.06)',
        animationDelay: `${index * 80}ms`,
      }}>
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1">
        <SkeletonPulse className="w-full h-full rounded-none" />
      </div>

      {/* Icon placeholder */}
      <SkeletonPulse className="flex-shrink-0 w-12 h-12 rounded-xl" />

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-3">
        <SkeletonPulse className="h-5 rounded-lg" style={{ width: `${55 + Math.random() * 30}%` }} />
        <div className="flex items-center gap-3">
          <SkeletonPulse className="w-16 h-4 rounded-md" />
          <SkeletonPulse className="w-20 h-4 rounded-md" />
        </div>
      </div>

      {/* Action buttons placeholder */}
      <div className="flex items-center gap-2">
        <SkeletonPulse className="w-10 h-10 rounded-xl" />
        <SkeletonPulse className="w-10 h-10 rounded-xl" />
      </div>
    </div>
  );
}

/* ── Full Dashboard Loading Skeleton ── */
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #070B1A 0%, #0f172a 30%, #1A2660 60%, #0f172a 100%)' }}>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] bg-[#2C3A8C]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] bg-[#E8BD63]/10 rounded-full blur-[80px]" />
      </div>

      <DashboardHeaderSkeleton />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <TabSwitcherSkeleton />

        {/* Card skeletons */}
        <div className="space-y-4">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <CardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-pulse {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.07) 40%,
            rgba(255,255,255,0.03) 80%
          ) !important;
          background-size: 200% 100% !important;
          animation: skeletonShimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ── Inline Loading Spinner (for inside the dashboard) ── */
export function InlineLoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      {/* Orbiting dots */}
      <div className="relative w-20 h-20 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#E8BD63]/10" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E8BD63] animate-spin"
          style={{ animationDuration: '1.2s' }} />
        {/* Inner spinning arc (opposite direction) */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#4F5FD5] animate-spin"
          style={{ animationDuration: '1.8s', animationDirection: 'reverse' }} />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#E8BD63] animate-pulse shadow-[0_0_12px_rgba(232,189,99,0.4)]" />
        </div>
      </div>
      <span className="text-white/30 text-xs font-semibold uppercase tracking-[0.3em]">{text}</span>
    </div>
  );
}

export default DashboardSkeleton;
