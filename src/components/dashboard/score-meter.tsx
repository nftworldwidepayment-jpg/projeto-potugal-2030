import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Valor principal do painel (0–100) com barra de leitura. */
export function ScoreMeter({
  label,
  value,
  qualifier,
  caption,
  className,
  children,
}: {
  label: string;
  value: number;
  qualifier: string;
  caption?: string;
  className?: string;
  /** Conteúdo complementar apresentado por baixo da barra. */
  children?: ReactNode;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="text-xs font-medium text-muted">{label}</p>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-5xl leading-none font-semibold tracking-[-0.03em] text-navy">{clamped}</span>
        <span className="text-sm font-medium text-muted">/100</span>
      </div>
      <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-mist px-2 py-1 text-[11px] font-semibold text-navy">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-navy" />
        {qualifier}
      </p>
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
      <div aria-hidden="true" className="mt-1.5 flex justify-between text-[10px] text-muted tabular-nums">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      {children}
      {caption && <p className="mt-auto pt-4 text-[11px] leading-snug text-muted">{caption}</p>}
    </div>
  );
}
