interface SkeletonBlockProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonBlock({
  width = 'w-full',
  height = 'h-4',
  className = '',
}: SkeletonBlockProps) {
  return (
    <div
      className={`skeleton ${width} ${height} ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── Pre-built skeleton compositions ─────────────────────────────────────────

export function MatchRowSkeleton() {
  return (
    <div className="py-3 px-4 flex items-center justify-between gap-4 animate-pulse">
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock width="w-20" height="h-2.5" />
        <SkeletonBlock width="w-16" height="h-3" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <SkeletonBlock width="w-12" height="h-6" />
        <SkeletonBlock width="w-16" height="h-3" />
      </div>
      <SkeletonBlock width="w-20" height="h-8" className="rounded-xl" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-[var(--color-surface-container-high)] rounded-2xl p-4 space-y-3 animate-pulse">
      <SkeletonBlock width="w-24" height="h-3" />
      <SkeletonBlock width="w-16" height="h-8" />
      <SkeletonBlock width="w-full" height="h-2" />
      <SkeletonBlock width="w-3/4" height="h-2" />
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="flex-1 bg-[var(--color-surface-container-high)] rounded-2xl p-4 flex flex-col items-center gap-2 animate-pulse">
      <div className="w-12 h-12 rounded-full skeleton" />
      <SkeletonBlock width="w-20" height="h-3" />
    </div>
  );
}
