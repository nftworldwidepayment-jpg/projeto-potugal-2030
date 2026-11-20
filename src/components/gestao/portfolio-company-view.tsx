"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, FileDown, FileSpreadsheet } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { Chip } from "@/components/ui/card";
import { ActionPlan, exportPlanCsv } from "@/components/painel/action-plan";
import { AreaDetail } from "@/components/painel/area-detail";
import { CompanySummary } from "@/components/painel/company-summary";
import { DimensionCards } from "@/components/painel/dimension-cards";
import { NextActions } from "@/components/painel/next-actions";
import { PrintHeader } from "@/components/painel/print-header";
import { formatDate } from "@/lib/csv";
import { recommendationsFor, summarize } from "@/lib/model";
import { dimensionAverages, portfolio } from "@/lib/portfolio";
import type { PortfolioCompany } from "@/types/diagnostic";

const ordered = [...portfolio].sort((a, b) => a.profile.name.localeCompare(b.profile.name, "pt"));

/** Painel de uma empresa da carteira, só de leitura, comparado com a média. */
export function PortfolioCompanyView({ company }: { company: PortfolioCompany }) {
  const summary = summarize(company.answers);
  const recommendations = recommendationsFor(company.answers);
  const index = ordered.findIndex((c) => c.id === company.id);
  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];

  return (
    <div className="space-y-4 sm:space-y-5">
      <PrintHeader note="Empresa fictícia da carteira de demonstração" />

      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link
          href="/gestao"
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-steel hover:text-navy"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Visão Geral
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted">
          <span className="mr-1 tabular-nums">
            {index + 1} de {ordered.length}
          </span>
          <Link
            href={`/gestao/empresas/${prev.id}`}
            className="inline-flex size-10 items-center justify-center rounded-lg ring-1 ring-line ring-inset hover:bg-white hover:text-navy"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
            <span className="sr-only">Empresa anterior: {prev.profile.name}</span>
          </Link>
          <Link
            href={`/gestao/empresas/${next.id}`}
            className="inline-flex size-10 items-center justify-center rounded-lg ring-1 ring-line ring-inset hover:bg-white hover:text-navy"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
            <span className="sr-only">Empresa seguinte: {next.profile.name}</span>
          </Link>
        </div>
      </div>

      <CompanySummary
        profile={company.profile}
        summary={summary}
        planCount={company.plan.length}
        badge={<Chip>Fictícia</Chip>}
        meta={`${company.region} · Diagnóstico a ${formatDate(company.assessedOn)}`}
        actions={
          <>
            <button
              type="button"
              onClick={() => exportPlanCsv(company.profile.name, company.plan, company.answers)}
              disabled={company.plan.length === 0}
              className={buttonClasses({
                variant: "secondary",
                className: "flex-1 disabled:pointer-events-none disabled:opacity-40 sm:flex-none",
              })}
            >
              <FileSpreadsheet aria-hidden="true" className="size-4" />
              Plano em Excel
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className={buttonClasses({ variant: "primary", className: "flex-1 sm:flex-none" })}
            >
              <FileDown aria-hidden="true" className="size-4" />
              Exportar relatório
            </button>
          </>
        }
      />

      <DimensionCards results={summary.dimensions} benchmark={dimensionAverages} />

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <NextActions recommendations={recommendations} plan={company.plan} readOnly />
        </div>
        <div className="xl:col-span-5">
          <ActionPlan plan={company.plan} answers={company.answers} companyName={company.profile.name} readOnly />
        </div>
      </div>

      <AreaDetail answers={company.answers} />
    </div>
  );
}
