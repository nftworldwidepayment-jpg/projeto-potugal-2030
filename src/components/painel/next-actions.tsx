"use client";

import { Check, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, Chip } from "@/components/ui/card";
import { assessmentActions } from "@/lib/assessment-store";
import { answerLabel } from "@/lib/model";
import type { PlanItem, Recommendation } from "@/types/diagnostic";

const INITIAL = 5;

export function NextActions({
  recommendations,
  plan,
}: {
  recommendations: Recommendation[];
  plan: readonly PlanItem[];
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? recommendations : recommendations.slice(0, INITIAL);
  const inPlan = new Set(plan.map((item) => item.areaId));

  return (
    <Card aria-labelledby="acoes-titulo">
      <CardHeader
        id="acoes-titulo"
        title="Próximas ações"
        description="Ordenadas da área mais fraca para a mais forte."
        action={<span className="text-xs text-muted tabular-nums">{recommendations.length} ações</span>}
      />

      {recommendations.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted sm:px-5">
          Não há ações recomendadas. Todas as áreas respondidas estão acima de &quot;Em parte&quot;.
        </p>
      ) : (
        <ol className="divide-y divide-line">
          {visible.map((rec, i) => {
            const added = inPlan.has(rec.area.id);
            return (
              <li key={rec.area.id} className="px-4 py-4 sm:px-5">
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug font-semibold text-ink">{rec.area.action}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Chip tone={rec.priority === "alta" ? "strong" : "soft"}>
                        Prioridade {rec.priority === "alta" ? "alta" : "média"}
                      </Chip>
                      <Chip>{rec.dimension.shortTitle}</Chip>
                      <Chip>{rec.timeframe}</Chip>
                    </div>

                    <details className="group mt-2.5">
                      <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1 text-xs font-medium text-steel hover:text-navy [&::-webkit-details-marker]:hidden">
                        Porquê?
                        <ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-1 rounded-lg bg-surface px-3 py-2.5 text-xs leading-relaxed text-muted">
                        Resposta <span className="font-semibold text-ink">{answerLabel(rec.answer)}</span> na área{" "}
                        <span className="font-medium text-ink">{rec.area.name}</span>: «{rec.area.statement}»
                      </p>
                    </details>
                  </div>

                  <div className="shrink-0 print:hidden">
                    {added ? (
                      <span className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-medium text-steel">
                        <Check aria-hidden="true" className="size-4" />
                        <span className="hidden sm:inline">No plano</span>
                        <span className="sr-only sm:hidden">No plano</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => assessmentActions.addToPlan(rec.area.id)}
                        className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-navy ring-1 ring-line transition-colors ring-inset hover:bg-surface active:scale-95"
                      >
                        <Plus aria-hidden="true" className="size-4" />
                        <span className="hidden sm:inline">Adicionar ao plano</span>
                        <span className="sr-only sm:hidden">Adicionar ao plano</span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {recommendations.length > INITIAL && (
        <div className="border-t border-line px-4 py-2 sm:px-5 print:hidden">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-steel hover:text-navy"
          >
            {showAll ? "Mostrar menos" : `Mostrar todas (${recommendations.length})`}
            <ChevronDown aria-hidden="true" className={showAll ? "size-4 rotate-180" : "size-4"} />
          </button>
        </div>
      )}
    </Card>
  );
}
