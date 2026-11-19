import { ChevronDown } from "lucide-react";
import { ScoreBar } from "@/components/ui/card";
import { answerLabel, areaScore, dimensions } from "@/lib/model";
import type { Answers } from "@/types/diagnostic";

/** Tabela com as 16 áreas. Recolhida no ecrã; sempre visível no relatório impresso. */
export function AreaDetail({ answers }: { answers: Answers }) {
  const table = (
    <div className="divide-y divide-line">
      {dimensions.map((dimension) => (
        <div key={dimension.id} className="px-4 py-3 sm:px-5 print:break-inside-avoid">
          <p className="text-xs font-semibold text-steel">
            {dimension.letter} · {dimension.title}
          </p>
          <ul className="mt-2 space-y-2.5">
            {dimension.areas.map((area) => {
              const answer = answers[area.id];
              const score = answer ? areaScore(answer) : null;
              return (
                <li
                  key={area.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[minmax(0,14rem)_minmax(0,9rem)_1fr_3rem]"
                >
                  <span className="text-ink">{area.name}</span>
                  <span className="text-right text-xs text-muted sm:text-left">
                    {answer ? answerLabel(answer) : "Sem resposta"}
                  </span>
                  <ScoreBar value={score ?? 0} className="col-span-2 sm:col-span-1" />
                  <span className="hidden text-right text-xs font-medium text-ink tabular-nums sm:block">
                    {score ?? "–"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <details className="group rounded-xl border border-line bg-white print:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 sm:px-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-[15px] font-semibold text-navy">Detalhe por área</span>
            <span className="block text-xs text-muted">As 16 áreas avaliadas, com a resposta e a pontuação de cada uma.</span>
          </span>
          <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-line">{table}</div>
      </details>

      <section className="hidden rounded-xl border border-line-strong print:block">
        <h2 className="border-b border-line px-5 py-3 text-[15px] font-semibold text-navy">Detalhe por área</h2>
        {table}
      </section>
    </>
  );
}
