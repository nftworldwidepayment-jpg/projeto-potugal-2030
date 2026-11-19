import { LogoMark } from "@/components/brand/logo";
import { DemoBadge } from "@/components/ui/demo-badge";
import { cn } from "@/lib/utils";
import type { Assessment } from "@/types/diagnostic";
import { DimensionGapChart } from "./dimension-gap-chart";
import { PriorityRecommendation } from "./priority-recommendation";
import { ReadingMarker } from "./reading-marker";
import { ScoreMeter } from "./score-meter";

/**
 * Pré-visualização simplificada do painel de potencial: apenas o essencial
 * (índice, dimensões e recomendação prioritária). Responsivo pelo tamanho do
 * próprio contentor (container queries).
 *
 * Com `annotated`, mostra marcadores numerados (1–3) que correspondem à
 * explicação "Como ler o painel".
 */
export function DashboardPreview({
  assessment,
  annotated = false,
  className,
}: {
  assessment: Assessment;
  annotated?: boolean;
  className?: string;
}) {
  const marker = (n: number) => (annotated ? <ReadingMarker n={n} /> : undefined);
  const [topRecommendation] = assessment.recommendations;

  const initials = assessment.company.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <figure
      aria-label="Exemplo demonstrativo do painel de potencial empresarial"
      className={cn(
        "@container overflow-hidden rounded-2xl border border-line bg-white shadow-panel",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 @md:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoMark className="size-5" />
          <span className="truncate text-[13px] font-semibold text-ink">
            Painel<span className="hidden @sm:inline"> de Potencial</span>
          </span>
        </div>
        {assessment.isDemo && <DemoBadge />}
      </div>

      <div className="space-y-3 bg-surface/60 p-3 @md:p-4">
        <div className="flex min-w-0 items-center gap-3 px-1 py-1">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-semibold text-white"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{assessment.company.name}</p>
            <p className="truncate text-xs text-muted">
              {assessment.company.sector} · {assessment.company.size}
            </p>
          </div>
        </div>

        <div className="grid gap-3 @lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-white p-4 @lg:col-span-2">
            <ScoreMeter
              label="Índice de oportunidade"
              value={assessment.opportunityIndex}
              qualifier={assessment.opportunityLabel}
              explanation="Quanto mais alto, maior a margem de crescimento por explorar."
              marker={marker(1)}
              className="h-full"
            />
          </div>
          <div className="rounded-xl border border-line bg-white p-4 @lg:col-span-3">
            <DimensionGapChart scores={assessment.scores} marker={marker(2)} />
          </div>
        </div>

        {topRecommendation && (
          <div className="rounded-xl border border-line bg-white p-4">
            <PriorityRecommendation
              recommendation={topRecommendation}
              scores={assessment.scores}
              marker={marker(3)}
            />
          </div>
        )}
      </div>

      {assessment.isDemo && (
        <figcaption className="border-t border-line px-4 py-2.5 text-xs leading-snug text-muted @md:px-5">
          Dados fictícios, apenas para fins ilustrativos. Não representam uma empresa real nem resultados da
          plataforma.
        </figcaption>
      )}
    </figure>
  );
}
