interface AIProbabilityBarProps {
  homeLabel: string;
  homePercent: number;
  drawPercent: number;
  awayLabel: string;
  awayPercent: number;
  insight?: string;
}

export default function AIProbabilityBar({
  homeLabel,
  homePercent,
  drawPercent,
  awayLabel,
  awayPercent,
  insight,
}: AIProbabilityBarProps) {
  // Parse inline <highlight> tags from insight text
  const renderInsight = (text: string) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>)/g);
    return parts.map((part, i) => {
      const match = part.match(/^<highlight>(.*?)<\/highlight>$/);
      if (match) {
        return (
          <span key={i} className="text-[var(--color-secondary)] font-bold">
            {match[1]}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-4">
      {/* Labels */}
      <div className="flex justify-between font-label text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]">
        <span>
          {homeLabel} {homePercent}%
        </span>
        <span>Empate {drawPercent}%</span>
        <span>
          {awayLabel} {awayPercent}%
        </span>
      </div>

      {/* Bar */}
      <div className="h-3 w-full bg-[var(--color-surface-container-lowest)] rounded-full overflow-hidden flex shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] transition-all duration-700"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="h-full bg-[var(--color-surface-container-highest)] transition-all duration-700"
          style={{ width: `${drawPercent}%` }}
        />
        <div
          className="h-full bg-gradient-to-r from-[var(--color-secondary-container)] to-[var(--color-secondary)] transition-all duration-700"
          style={{ width: `${awayPercent}%` }}
        />
      </div>

      {/* Insight text */}
      {insight && (
        <p className="font-body text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
          {renderInsight(insight)}
        </p>
      )}
    </div>
  );
}
