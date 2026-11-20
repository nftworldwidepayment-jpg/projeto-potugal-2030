"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, FileDown, FileSpreadsheet, PencilLine } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { assessmentActions, currentAssessment, setStep, useAssessment } from "@/lib/assessment-store";
import { recommendationsFor, summarize } from "@/lib/model";
import { ActionPlan, exportPlanCsv } from "./action-plan";
import { AreaDetail } from "./area-detail";
import { CompanySummary } from "./company-summary";
import { DimensionCards } from "./dimension-cards";
import { NextActions } from "./next-actions";
import { PrintHeader } from "./print-header";

/** Separador Painel do perfil Empresa. */
export function PainelView() {
  const state = useAssessment();
  const router = useRouter();
  const summary = summarize(state.answers);
  const recommendations = recommendationsFor(state.answers);

  const startOwn = () => {
    const previous = currentAssessment();
    assessmentActions.clear();
    setStep("perfil");
    router.push("/empresa/diagnostico");
    toast("Dados de demonstração apagados. Comece pelo perfil da empresa.", {
      label: "Anular",
      onClick: () => assessmentActions.restore(previous),
    });
  };

  if (summary.answered === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-line bg-white px-6 py-12 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-mist text-navy">
          <ClipboardList aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-navy">Ainda não há respostas</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Responda às 16 questões do diagnóstico. O painel é calculado à medida que responde.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/empresa/diagnostico" className={buttonClasses({ variant: "primary" })}>
            Começar o diagnóstico
          </Link>
          <button
            type="button"
            onClick={() => {
              assessmentActions.resetDemo();
              toast("Dados de demonstração repostos.");
            }}
            className={buttonClasses({ variant: "secondary" })}
          >
            Ver dados de demonstração
          </button>
        </div>
      </div>
    );
  }

  const companyName = state.profile.name || "empresa";

  return (
    <div className="space-y-4 sm:space-y-5">
      <PrintHeader note={state.isDemo ? "Dados de demonstração (empresa fictícia)" : undefined} />

      {state.isDemo && (
        <div className="flex flex-col gap-3 rounded-xl border border-steel-pale bg-mist px-4 py-3 text-sm text-navy sm:flex-row sm:items-center sm:justify-between print:hidden">
          <p>
            <span className="font-semibold">Dados de demonstração.</span> Uma empresa fictícia, para explorar o
            painel.
          </p>
          <button
            type="button"
            onClick={startOwn}
            className={buttonClasses({ variant: "primary", className: "shrink-0" })}
          >
            Fazer o diagnóstico da minha empresa
          </button>
        </div>
      )}

      <CompanySummary
        profile={state.profile}
        summary={summary}
        planCount={state.plan.length}
        actions={
          <>
            <Link
              href="/empresa/diagnostico"
              className={buttonClasses({ variant: "secondary", className: "flex-1 sm:flex-none" })}
            >
              <PencilLine aria-hidden="true" className="size-4" />
              Rever respostas
            </Link>
            <button
              type="button"
              onClick={() => exportPlanCsv(companyName, state.plan, state.answers)}
              disabled={state.plan.length === 0}
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
              className={buttonClasses({ variant: "primary", className: "w-full sm:w-auto" })}
            >
              <FileDown aria-hidden="true" className="size-4" />
              Exportar relatório
            </button>
          </>
        }
      />

      <DimensionCards results={summary.dimensions} editable />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <NextActions recommendations={recommendations} plan={state.plan} />
        </div>
        <div className="lg:col-span-5">
          <ActionPlan plan={state.plan} answers={state.answers} companyName={companyName} />
        </div>
      </div>

      <AreaDetail answers={state.answers} />
    </div>
  );
}
