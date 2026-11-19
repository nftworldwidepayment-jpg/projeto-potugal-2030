"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { useSyncExternalStore } from "react";
import { buttonClasses } from "@/components/ui/button";
import { assessmentActions, setStep, useAssessment } from "@/lib/assessment-store";
import { recommendationsFor, summarize } from "@/lib/model";
import { siteConfig } from "@/lib/site";
import { ActionPlan } from "./action-plan";
import { AreaDetail } from "./area-detail";
import { CompanySummary } from "./company-summary";
import { DimensionCards } from "./dimension-cards";
import { NextActions } from "./next-actions";

export function PainelView() {
  const state = useAssessment();
  const router = useRouter();
  const summary = summarize(state.answers);
  const recommendations = recommendationsFor(state.answers);

  const startOwn = () => {
    assessmentActions.clear();
    setStep("perfil");
    router.push("/diagnostico");
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
          <Link href="/diagnostico" className={buttonClasses({ variant: "primary" })}>
            Começar o diagnóstico
          </Link>
          <button
            type="button"
            onClick={() => assessmentActions.resetDemo()}
            className={buttonClasses({ variant: "secondary" })}
          >
            Ver dados de demonstração
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Cabeçalho do relatório impresso */}
      <div className="hidden border-b border-line-strong pb-4 print:block">
        <p className="text-xs font-semibold text-steel">{siteConfig.name}</p>
        <p className="mt-1 text-lg font-semibold text-navy">Relatório de diagnóstico</p>
        <p className="text-xs text-muted">
          Emitido a <PrintDate />
          {state.isDemo && " · Dados de demonstração (empresa fictícia)"}
        </p>
      </div>

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

      <CompanySummary state={state} summary={summary} />
      <DimensionCards results={summary.dimensions} />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <NextActions recommendations={recommendations} plan={state.plan} />
        </div>
        <div className="lg:col-span-5">
          <ActionPlan plan={state.plan} answers={state.answers} />
        </div>
      </div>

      <AreaDetail answers={state.answers} />
    </div>
  );
}

const noopSubscribe = () => () => {};

/** Data de hoje, calculada só no navegador (no momento de imprimir). */
function PrintDate() {
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("pt-PT"),
    () => "",
  );
  return <>{today}</>;
}
