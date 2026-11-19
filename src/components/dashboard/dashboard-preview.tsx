import { LogoMark } from "@/components/brand/logo";
import { DemoBadge } from "@/components/ui/demo-badge";
import { cn } from "@/lib/utils";
import type { Assessment } from "@/types/diagnostic";
import { DimensionGapChart } from "./dimension-gap-chart";
import { RecommendationList } from "./recommendation-list";
import { ScoreMeter } from "./score-meter";
import { StatTile } from "./stat-tile";

const tabs = ["Visão geral", "Dimensões", "Recomendações"];

/**
 * Pré-visualização do painel de potencial. Responsivo pelo tamanho do
 * próprio contentor (container queries), para funcionar no hero, em
 * páginas internas ou em colunas estreitas.
 */
export function DashboardPreview({
  assessment,
  className,
}: {
  assessment: Assessment;
  className?: string;
}) {
  const average = (key: "current" | "potential") =>
    Math.round(assessment.scores.reduce((sum, s) => sum + s[key], 0) / assessment.scores.length);
  const summary = [
    { label: "Nível atual médio", value: average("current") },
    { label: "Potencial identificado", value: average("potential") },
  ];

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
      {/* Barra superior da aplicação */}
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
        {/* Empresa e navegação interna */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-semibold text-white"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{assessment.company.name}</p>
              <p className="truncate text-[11px] text-muted">
                {assessment.company.sector} · {assessment.company.size}
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="hidden rounded-lg bg-white p-0.5 ring-1 ring-line @lg:flex">
            {tabs.map((tab, i) => (
              <span
                key={tab}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium",
                  i === 0 ? "bg-navy text-white" : "text-muted",
                )}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Índice e dimensões */}
        <div className="grid gap-3 @lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-white p-4 @lg:col-span-2">
            <ScoreMeter
              label="Índice de oportunidade"
              value={assessment.opportunityIndex}
              qualifier={assessment.opportunityLabel}
              caption="Síntese do potencial por explorar nas quatro dimensões."
              className="h-full"
            >
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                {summary.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11px] leading-snug text-muted">{item.label}</dt>
                    <dd className="mt-1 text-lg leading-none font-semibold text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </ScoreMeter>
          </div>
          <div className="rounded-xl border border-line bg-white p-4 @lg:col-span-3">
            <DimensionGapChart scores={assessment.scores} />
          </div>
        </div>

        {/* Indicadores */}
        <div className="grid gap-2 @sm:grid-cols-3 @sm:gap-3">
          {assessment.indicators.map((indicator) => (
            <StatTile key={indicator.id} indicator={indicator} />
          ))}
        </div>

        {/* Recomendações */}
        <div className="rounded-xl border border-line bg-white p-4">
          <RecommendationList recommendations={assessment.recommendations} scores={assessment.scores} />
        </div>
      </div>

      {assessment.isDemo && (
        <figcaption className="border-t border-line px-4 py-2.5 text-[11px] leading-snug text-muted @md:px-5">
          Dados fictícios, apenas para fins ilustrativos. Não representam uma empresa real nem resultados da
          plataforma.
        </figcaption>
      )}
    </figure>
  );
}
