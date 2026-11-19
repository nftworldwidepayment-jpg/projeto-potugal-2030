import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { getDimension } from "@/lib/dimensions";
import type { DimensionScore, Recommendation } from "@/types/diagnostic";

/** A recomendação com maior prioridade, apresentada em destaque. */
export function PriorityRecommendation({
  recommendation,
  scores,
  marker,
}: {
  recommendation: Recommendation;
  scores: readonly DimensionScore[];
  marker?: ReactNode;
}) {
  const dimension = getDimension(recommendation.dimension);
  const score = scores.find((s) => s.dimension === recommendation.dimension);
  const gap = score ? score.potential - score.current : null;

  return (
    <div>
      <div className="flex items-center gap-2">
        {marker}
        <p className="text-[13px] font-medium text-muted">Recomendação prioritária</p>
      </div>
      <div className="mt-3 flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mist text-navy">
          <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="text-sm leading-snug font-semibold text-ink">{recommendation.title}</p>
          <p className="mt-1 text-xs text-muted">
            {dimension.title}
            {gap !== null && <span className="tabular-nums"> · margem de crescimento +{gap}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
