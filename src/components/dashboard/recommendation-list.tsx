import { getDimension } from "@/lib/dimensions";
import { cn } from "@/lib/utils";
import type { DimensionScore, Priority, Recommendation } from "@/types/diagnostic";

const priorityLabels: Record<Priority, string> = {
  alta: "Prioridade alta",
  media: "Prioridade média",
  baixa: "Prioridade baixa",
};

const priorityStyles: Record<Priority, string> = {
  alta: "bg-navy text-white",
  media: "bg-mist text-navy",
  baixa: "bg-surface text-muted",
};

export function RecommendationList({
  recommendations,
  scores,
  className,
}: {
  recommendations: readonly Recommendation[];
  scores: readonly DimensionScore[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-medium text-muted">Recomendações estratégicas</p>
      <ol className="mt-3 divide-y divide-line">
        {recommendations.map((rec, i) => {
          const dimension = getDimension(rec.dimension);
          const score = scores.find((s) => s.dimension === rec.dimension);
          const gap = score ? score.potential - score.current : null;
          return (
            <li key={rec.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              <span
                aria-hidden="true"
                className="mt-px flex size-5 shrink-0 items-center justify-center rounded-md border border-line text-[10px] font-semibold text-steel tabular-nums"
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-snug font-medium text-ink">{rec.title}</p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {dimension.title}
                  {gap !== null && <span className="tabular-nums"> · +{gap} pontos</span>}
                </p>
              </div>
              <span
                className={cn(
                  "hidden shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold @md:inline",
                  priorityStyles[rec.priority],
                )}
              >
                {priorityLabels[rec.priority]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
