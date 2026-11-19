import type { ReactNode } from "react";
import { getDimension } from "@/lib/dimensions";
import type { DimensionScore } from "@/types/diagnostic";

/**
 * Para cada dimensão, numa escala de 0 a 100: a situação atual (azul-marinho)
 * e a margem de crescimento identificada (azul suave).
 */
export function DimensionGapChart({
  scores,
  marker,
  className,
}: {
  scores: readonly DimensionScore[];
  marker?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {marker}
        <p className="text-[13px] font-medium text-muted">Potencial por dimensão</p>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legenda">
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-3 rounded-[2px] bg-navy" />
          Situação atual
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-3 rounded-[2px] bg-steel-soft" />
          Margem de crescimento
        </li>
      </ul>

      <ul className="mt-4 space-y-1">
        {scores.map((score, i) => {
          const dimension = getDimension(score.dimension);
          const gap = score.potential - score.current;
          return (
            <li
              key={score.dimension}
              className="-mx-2 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-surface"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-ink">{dimension.shortTitle}</span>
                <span className="text-xs whitespace-nowrap text-muted tabular-nums">
                  <span className="sr-only">Situação atual </span>
                  <span className="font-semibold text-ink">{score.current}</span>
                  <span className="sr-only">, margem de crescimento</span>
                  <span className="ml-1.5 font-semibold text-steel">+{gap}</span>
                </span>
              </div>
              <div
                role="img"
                aria-label={`${dimension.shortTitle}: situação atual ${score.current} em 100, com margem de crescimento até ${score.potential}`}
                className="mt-2 flex h-2 w-full gap-[2px] overflow-hidden rounded-full bg-surface"
              >
                <span
                  className="h-full origin-left animate-grow rounded-l-full bg-navy"
                  style={{ width: `${score.current}%`, animationDelay: `${350 + i * 90}ms` }}
                />
                <span
                  className="h-full origin-left animate-grow rounded-r-full bg-steel-soft"
                  style={{ width: `${gap}%`, animationDelay: `${550 + i * 90}ms` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
