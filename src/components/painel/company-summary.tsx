"use client";

import { useId, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { levelFor, levelHelp, totalQuestions, type Summary } from "@/lib/model";
import type { CompanyProfile } from "@/types/diagnostic";
import { ScoreRing } from "./score-ring";

export const helpText = {
  realized:
    "Média das quatro dimensões, de 0 a 100. Mostra quanto do potencial da empresa já está a ser aproveitado.",
  margin: "O que falta para 100 pontos. Quanto maior, mais espaço há para crescer.",
  answered: "Questões do diagnóstico já respondidas. Os resultados usam apenas as respostas dadas.",
  plan: "Ações que a empresa decidiu executar, com responsável, data limite e estado.",
};

export function CompanySummary({
  profile,
  summary,
  planCount,
  meta,
  actions,
  badge,
}: {
  profile: CompanyProfile;
  summary: Summary;
  planCount: number;
  /** Informação adicional por baixo do setor (p. ex. região e data do diagnóstico). */
  meta?: ReactNode;
  actions?: ReactNode;
  badge?: ReactNode;
}) {
  const sectorLine = [profile.sector, profile.size].filter(Boolean).join(" · ");
  const titleId = useId();

  const stats = [
    { label: "Margem de crescimento", help: helpText.margin, value: summary.margin === null ? "–" : `${summary.margin} pts` },
    { label: "Questões respondidas", help: helpText.answered, value: `${summary.answered} de ${totalQuestions}` },
    { label: "Ações no plano", help: helpText.plan, value: String(planCount) },
  ];

  return (
    <Card aria-labelledby={titleId} className="p-4 sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <ScoreRing value={summary.realized} label="Potencial realizado" size={112} stroke={9} className="sm:hidden" />
          <ScoreRing value={summary.realized} label="Potencial realizado" className="hidden sm:block" />
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-steel">
              Potencial realizado{summary.realized !== null && ` · ${levelFor(summary.realized)}`}
              <InfoTooltip label="Potencial realizado" text={`${helpText.realized} ${levelHelp}`} />
            </p>
            <h1 id={titleId} data-company-name className="mt-1 text-xl leading-tight font-semibold text-navy sm:text-2xl">
              {profile.name || "Empresa sem nome"}
              {badge && <span className="ml-2 inline-block align-middle">{badge}</span>}
            </h1>
            {sectorLine && <p className="mt-1 text-sm text-muted">{sectorLine}</p>}
            {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
          </div>
        </div>

        <dl className="grid grid-cols-3 rounded-lg border border-line text-center lg:min-w-[440px]">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-line px-2 py-3 first:border-l-0 sm:px-4">
              <dt className="flex items-start justify-center gap-1 text-[11px] leading-tight text-muted sm:text-xs">
                <span>{stat.label}</span>
                <InfoTooltip label={stat.label} text={stat.help} />
              </dt>
              <dd className="mt-1 text-base font-semibold text-navy tabular-nums sm:text-lg">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {actions && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4 sm:justify-end print:hidden">{actions}</div>
      )}
    </Card>
  );
}
