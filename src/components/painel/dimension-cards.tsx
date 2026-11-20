"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useId, type ReactNode } from "react";
import { ScoreBar } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { setStep } from "@/lib/assessment-store";
import { levelFor, levelHelp, type DimensionResult } from "@/lib/model";
import { cn } from "@/lib/utils";
import type { DimensionId } from "@/types/diagnostic";

export function DimensionCards({
  results,
  editable = false,
  benchmark,
}: {
  results: DimensionResult[];
  /** Cada cartão abre o diagnóstico nessa dimensão (perfil Empresa). */
  editable?: boolean;
  /** Média da carteira por dimensão, para comparação (perfil Entidade gestora). */
  benchmark?: Record<DimensionId, number>;
}) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="mb-2 flex items-center gap-1.5 px-1 text-sm font-semibold text-navy">
        Resultado por dimensão
        <InfoTooltip
          label="Resultado por dimensão"
          text={`Média das quatro áreas de cada dimensão, de 0 a 100. ${levelHelp}`}
        />
      </h2>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {results.map(({ dimension, score, answered, weakest }) => {
          const diff = benchmark && score !== null ? score - benchmark[dimension.id] : null;
          const content: ReactNode = (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-semibold text-white">
                    {dimension.letter}
                  </span>
                  <span className="truncate text-sm font-semibold text-ink">{dimension.shortTitle}</span>
                </span>
                {editable && (
                  <ChevronRight
                    aria-hidden="true"
                    className="hidden size-4 shrink-0 text-steel-soft transition-transform group-hover:translate-x-0.5 sm:block print:hidden"
                  />
                )}
              </div>

              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl leading-none font-semibold text-navy tabular-nums">{score ?? "–"}</span>
                <span className="text-xs text-muted">/100</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                {score === null ? "Sem respostas" : levelFor(score)}
                {answered > 0 && answered < dimension.areas.length && ` · ${answered} de ${dimension.areas.length}`}
              </p>

              <div className="relative mt-3">
                <ScoreBar value={score ?? 0} />
                {benchmark && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 h-3.5 w-0.5 rounded-full bg-steel-soft ring-2 ring-white"
                    style={{ left: `calc(${benchmark[dimension.id]}% - 1px)` }}
                  />
                )}
              </div>
              {benchmark && diff !== null && (
                <p className="mt-2 text-xs text-muted tabular-nums">
                  Média da carteira {benchmark[dimension.id]}
                  <span className={cn("ml-1 font-semibold", diff >= 0 ? "text-navy" : "text-steel")}>
                    ({diff > 0 ? "+" : ""}
                    {diff})
                  </span>
                </p>
              )}

              {weakest && (
                <p className="mt-3 border-t border-line pt-2.5 text-xs leading-snug text-muted">
                  Área mais fraca: <span className="font-medium text-ink">{weakest.name}</span>
                </p>
              )}
            </>
          );

          const cardClass =
            "flex h-full flex-col rounded-xl border border-line bg-white p-3.5 sm:p-4 print:border-line-strong";

          return (
            <li key={dimension.id}>
              {editable ? (
                <Link
                  href="/empresa/diagnostico"
                  onClick={() => setStep(dimension.id)}
                  className={cn("group transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-card", cardClass)}
                >
                  {content}
                </Link>
              ) : (
                <div className={cardClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
