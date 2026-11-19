"use client";

import Link from "next/link";
import { FileDown, PencilLine } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { levelFor, totalQuestions, type Summary } from "@/lib/model";
import type { AssessmentState } from "@/types/diagnostic";
import { ScoreRing } from "./score-ring";

export function CompanySummary({ state, summary }: { state: AssessmentState; summary: Summary }) {
  const { profile, plan } = state;
  const meta = [profile.sector, profile.size].filter(Boolean).join(" · ");

  const stats = [
    { label: "Margem de crescimento", value: summary.margin === null ? "–" : `${summary.margin} pts` },
    { label: "Questões respondidas", value: `${summary.answered} de ${totalQuestions}` },
    { label: "Ações no plano", value: String(plan.length) },
  ];

  return (
    <Card aria-labelledby="empresa-nome" className="p-4 sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <ScoreRing value={summary.realized} label="Potencial realizado" size={112} stroke={9} className="sm:hidden" />
          <ScoreRing value={summary.realized} label="Potencial realizado" className="hidden sm:block" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-steel">
              Potencial realizado{summary.realized !== null && ` · ${levelFor(summary.realized)}`}
            </p>
            <h1 id="empresa-nome" className="mt-1 text-xl leading-tight font-semibold text-navy sm:text-2xl">
              {profile.name || "Empresa sem nome"}
            </h1>
            {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
          </div>
        </div>

        <dl className="grid grid-cols-3 overflow-hidden rounded-lg border border-line text-center lg:min-w-[420px]">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-line px-2 py-3 first:border-l-0 sm:px-4">
              <dt className="text-[11px] leading-tight text-muted sm:text-xs">{stat.label}</dt>
              <dd className="mt-1 text-base font-semibold text-navy tabular-nums sm:text-lg">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 sm:flex sm:justify-end print:hidden">
        <Link href="/diagnostico" className={buttonClasses({ variant: "secondary", className: "w-full sm:w-auto" })}>
          <PencilLine aria-hidden="true" className="size-4" />
          Rever respostas
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className={buttonClasses({ variant: "primary", className: "w-full sm:w-auto" })}
        >
          <FileDown aria-hidden="true" className="size-4" />
          Exportar relatório
        </button>
      </div>
    </Card>
  );
}
