"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScoreBar } from "@/components/ui/card";
import { setStep } from "@/lib/assessment-store";
import { levelFor, type DimensionResult } from "@/lib/model";

export function DimensionCards({ results }: { results: DimensionResult[] }) {
  return (
    <section aria-labelledby="dimensoes-titulo">
      <h2 id="dimensoes-titulo" className="sr-only">
        Resultado por dimensão
      </h2>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {results.map(({ dimension, score, answered, weakest }) => (
          <li key={dimension.id}>
            <Link
              href="/diagnostico"
              onClick={() => setStep(dimension.id)}
              className="group flex h-full flex-col rounded-xl border border-line bg-white p-3.5 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-card sm:p-4 print:border-line-strong"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-semibold text-white">
                    {dimension.letter}
                  </span>
                  <span className="truncate text-sm font-semibold text-ink">{dimension.shortTitle}</span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className="hidden size-4 shrink-0 text-steel-soft transition-transform group-hover:translate-x-0.5 sm:block print:hidden"
                />
              </div>

              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl leading-none font-semibold text-navy tabular-nums">{score ?? "–"}</span>
                <span className="text-xs text-muted">/100</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                {score === null ? "Sem respostas" : levelFor(score)}
                {answered > 0 && answered < dimension.areas.length && ` · ${answered} de ${dimension.areas.length}`}
              </p>
              <ScoreBar value={score ?? 0} className="mt-3" />

              {weakest && (
                <p className="mt-3 border-t border-line pt-2.5 text-xs leading-snug text-muted">
                  Área mais fraca: <span className="font-medium text-ink">{weakest.name}</span>
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
