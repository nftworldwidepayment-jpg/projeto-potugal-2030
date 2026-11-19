import { cn } from "@/lib/utils";

/** Anel de pontuação (0 a 100), com o valor ao centro. */
export function ScoreRing({
  value,
  size = 88,
  stroke = 8,
  label,
  className,
}: {
  value: number | null;
  size?: number;
  stroke?: number;
  label: string;
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = value ?? 0;

  return (
    <div
      role="img"
      aria-label={value === null ? `${label}: sem respostas` : `${label}: ${value} em 100`}
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-mist" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          className="stroke-navy transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center leading-none font-semibold text-navy"
      >
        <span style={{ fontSize: size * 0.3 }}>{value ?? "–"}</span>
        <span className="mt-0.5 text-[10px] font-medium text-muted" style={{ fontSize: Math.max(10, size * 0.11) }}>
          em 100
        </span>
      </span>
    </div>
  );
}
