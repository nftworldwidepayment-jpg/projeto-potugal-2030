import { getDimension } from "@/lib/dimensions";
import { cn } from "@/lib/utils";
import type { DimensionScore } from "@/types/diagnostic";

/**
 * Para cada dimensão: nível atual (azul-marinho) e potencial por explorar
 * (azul suave) até ao nível alcançável identificado. Escala 0–100.
 */
export function DimensionGapChart({
  scores,
  className,
}: {
  scores: readonly DimensionScore[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs font-medium text-muted">Potencial por dimensão</p>
        <ul className="flex items-center gap-3 text-[11px] text-muted" aria-label="Legenda">
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-3 rounded-[2px] bg-navy" />
            Nível atual
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-3 rounded-[2px] bg-steel-soft" />
            Potencial por explorar
          </li>
        </ul>
      </div>

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
                <span className="text-[13px] font-medium text-ink">{dimension.shortTitle}</span>
                <span className="text-[11px] whitespace-nowrap text-muted tabular-nums">
                  <span className="font-semibold text-ink">{score.current}</span>
                  <span aria-hidden="true"> → </span>
                  <span className="sr-only"> nível atual; potencial </span>
                  {score.potential}
                  <span className="ml-2 font-semibold text-steel">+{gap}</span>
                </span>
              </div>
              <div
                role="img"
                aria-label={`${dimension.shortTitle}: nível atual ${score.current}, potencial ${score.potential}, em 100`}
                className="mt-2 flex h-2 w-full gap-[2px] overflow-hidden rounded-full bg-surface"
              >
                <span
                  className={cn("h-full origin-left animate-grow rounded-l-full bg-navy")}
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
