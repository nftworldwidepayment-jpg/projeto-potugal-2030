import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Valor principal do painel (0–100), com barra de leitura e explicação curta. */
export function ScoreMeter({
  label,
  value,
  qualifier,
  explanation,
  marker,
  className,
}: {
  label: string;
  value: number;
  qualifier: string;
  explanation: string;
  marker?: ReactNode;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        {marker}
        <p className="text-[13px] font-medium text-muted">{label}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-3 gap-y-3 @lg:flex-col @lg:items-start @lg:justify-start">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl leading-none font-semibold tracking-[-0.03em] text-navy">{clamped}</span>
          <span className="text-sm font-medium text-muted">em 100</span>
        </div>
        <p className="inline-flex w-fit items-center gap-1.5 rounded-md bg-mist px-2 py-1 text-xs font-semibold text-navy">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-navy" />
          {qualifier}
        </p>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="mt-5 h-2 w-full overflow-hidden rounded-full bg-mist"
      >
        <div
          className="h-full origin-left animate-grow rounded-full bg-navy [animation-delay:300ms]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{explanation}</p>
    </div>
  );
}
