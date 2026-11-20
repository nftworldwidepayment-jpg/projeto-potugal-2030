"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Card, ScoreBar } from "@/components/ui/card";
import { ScoreRing } from "@/components/painel/score-ring";
import { toast } from "@/components/ui/toast";
import {
  assessmentActions,
  currentAssessment,
  setStep,
  useAssessment,
  useStep,
  type StepId,
} from "@/lib/assessment-store";
import { companySizes, dimensions, levelFor, sectors, summarize, totalQuestions } from "@/lib/model";
import { cn } from "@/lib/utils";
import type { AssessmentState } from "@/types/diagnostic";
import { AnswerScale } from "./answer-scale";

interface StepInfo {
  id: StepId;
  short: string;
  label: string;
  done: number;
  total: number;
}

function stepsFor(state: AssessmentState): StepInfo[] {
  const p = state.profile;
  return [
    {
      id: "perfil",
      short: "Perfil",
      label: "Perfil da empresa",
      done: [p.name, p.sector, p.size].filter(Boolean).length,
      total: 3,
    },
    ...dimensions.map((d) => ({
      id: d.id,
      short: `${d.letter} · ${d.shortTitle}`,
      label: `${d.letter} · ${d.shortTitle}`,
      done: d.areas.filter((a) => state.answers[a.id]).length,
      total: d.areas.length,
    })),
  ];
}

export function DiagnosticoView() {
  const state = useAssessment();
  const step = useStep();
  const topRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLOListElement>(null);

  // Na faixa horizontal (telemóvel e tablet), mantém o passo atual visível.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return;
    const left = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [step]);

  const steps = stepsFor(state);
  const index = steps.findIndex((s) => s.id === step);
  const summary = summarize(state.answers);

  const goTo = (id: StepId) => {
    setStep(id);
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-4 grid gap-4 sm:gap-5 lg:grid-cols-[17rem_1fr] lg:items-start">
      {/* Passos: barra lateral em desktop, faixa horizontal em telemóvel e tablet */}
      <aside className="min-w-0 space-y-4 lg:sticky lg:top-6">
        <Card aria-labelledby="passos-titulo" className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-3">
            <h2 id="passos-titulo" className="text-sm font-semibold text-navy">
              Diagnóstico
            </h2>
            <span className="text-xs text-muted tabular-nums">
              {summary.answered} de {totalQuestions} respondidas
            </span>
          </div>
          <div className="px-4 pb-3">
            <ScoreBar value={(summary.answered / totalQuestions) * 100} />
          </div>
          <ol
            ref={stripRef}
            className="scrollbar-none flex gap-1.5 overflow-x-auto border-t border-line px-3 py-2.5 lg:flex-col lg:gap-0.5 lg:px-2 lg:py-2">
            {steps.map((s) => {
              const active = s.id === step;
              const complete = s.done === s.total;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 text-left text-sm whitespace-nowrap transition-colors lg:w-full",
                      active ? "bg-navy text-white" : "text-ink hover:bg-surface",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                        complete
                          ? active
                            ? "bg-white text-navy"
                            : "bg-navy text-white"
                          : active
                            ? "ring-1 ring-white/60"
                            : "ring-1 ring-line-strong",
                      )}
                    >
                      {complete && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <span className="lg:flex-1">
                      <span className="lg:hidden">{s.short}</span>
                      <span className="hidden lg:inline">{s.label}</span>
                    </span>
                    <span className={cn("text-xs tabular-nums", active ? "text-white/70" : "text-muted")}>
                      {s.done}/{s.total}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>

        {/* Resultado provisório (desktop) */}
        <Card aria-labelledby="provisorio-titulo" className="hidden p-4 lg:block">
          <h2 id="provisorio-titulo" className="text-sm font-semibold text-navy">
            Resultado provisório
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <ScoreRing value={summary.realized} label="Potencial realizado" size={64} stroke={6} />
            <div className="text-xs text-muted">
              <p className="font-medium text-ink">Potencial realizado</p>
              <p>{summary.realized === null ? "Sem respostas" : levelFor(summary.realized)}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5">
            {summary.dimensions.map((r) => (
              <li key={r.dimension.id}>
                <div className="flex justify-between text-xs">
                  <span className="text-ink">{r.dimension.shortTitle}</span>
                  <span className="font-medium text-ink tabular-nums">{r.score ?? "–"}</span>
                </div>
                <ScoreBar value={r.score ?? 0} className="mt-1" />
              </li>
            ))}
          </ul>
          <Link
            href="/empresa"
            className="mt-4 inline-flex min-h-9 items-center gap-1 text-sm font-medium text-steel hover:text-navy"
          >
            Abrir o painel
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Card>
      </aside>

      <div className="min-w-0 space-y-4">
        <Card aria-labelledby="passo-titulo">
          {step === "perfil" ? <ProfileStep state={state} /> : <DimensionStep state={state} step={step} />}

          <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={() => index > 0 && goTo(steps[index - 1].id)}
              disabled={index === 0}
              className={buttonClasses({ variant: "secondary", className: "disabled:pointer-events-none disabled:opacity-40" })}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Anterior
            </button>
            {index < steps.length - 1 ? (
              <button type="button" onClick={() => goTo(steps[index + 1].id)} className={buttonClasses({})}>
                Seguinte
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            ) : (
              <Link href="/empresa" className={buttonClasses({})}>
                Ver resultados
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            )}
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-muted">
          <p>As respostas ficam guardadas apenas neste navegador.</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const previous = currentAssessment();
                assessmentActions.clear();
                goTo("perfil");
                toast("Respostas apagadas.", { label: "Anular", onClick: () => assessmentActions.restore(previous) });
              }}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 font-medium hover:bg-white hover:text-navy"
            >
              <Trash2 aria-hidden="true" className="size-3.5" />
              Limpar respostas
            </button>
            {!state.isDemo && (
              <button
                type="button"
                onClick={() => {
                  const previous = currentAssessment();
                  assessmentActions.resetDemo();
                  toast("Dados de demonstração repostos.", {
                    label: "Anular",
                    onClick: () => assessmentActions.restore(previous),
                  });
                }}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 font-medium hover:bg-white hover:text-navy"
              >
                <RotateCcw aria-hidden="true" className="size-3.5" />
                Repor demonstração
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div className="border-b border-line px-4 py-4 sm:px-5">
      <p className="text-xs font-semibold text-steel">{kicker}</p>
      <h1 id="passo-titulo" className="mt-1 text-lg leading-snug font-semibold text-navy sm:text-xl">
        {title}
      </h1>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}

const fieldClass =
  "mt-1.5 block min-h-11 w-full rounded-lg border border-line bg-white px-3 text-[16px] text-ink transition-colors placeholder:text-muted/70 focus:border-steel focus:outline-none sm:text-sm";

function ProfileStep({ state }: { state: AssessmentState }) {
  const { profile } = state;
  return (
    <>
      <StepHeader
        kicker="Passo 1 de 5"
        title="Perfil da empresa"
        description="Identificação básica, usada no painel e no relatório."
      />
      <div className="grid gap-4 px-4 py-5 sm:grid-cols-2 sm:px-5">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-ink">Nome da empresa</span>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => assessmentActions.setProfile({ name: e.target.value })}
            autoComplete="organization"
            placeholder="Ex.: Nome da empresa, Lda."
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Setor de atividade</span>
          <select
            value={profile.sector}
            onChange={(e) => assessmentActions.setProfile({ sector: e.target.value })}
            className={fieldClass}
          >
            <option value="">Selecionar</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Dimensão</span>
          <select
            value={profile.size}
            onChange={(e) => assessmentActions.setProfile({ size: e.target.value })}
            className={fieldClass}
          >
            <option value="">Selecionar</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}

function DimensionStep({ state, step }: { state: AssessmentState; step: StepId }) {
  const dimensionIndex = dimensions.findIndex((d) => d.id === step);
  const dimension = dimensions[dimensionIndex];
  if (!dimension) return null;

  return (
    <>
      <StepHeader
        kicker={`Passo ${dimensionIndex + 2} de 5 · Dimensão ${dimension.letter}`}
        title={dimension.title}
        description={`Em que medida cada afirmação descreve a empresa hoje? ${dimension.question}`}
      />
      <ol className="divide-y divide-line">
        {dimension.areas.map((area, i) => {
          const id = `q-${area.id}`;
          return (
            <li key={area.id} className="px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex gap-3">
                <span className="w-6 shrink-0 pt-0.5 text-xs font-semibold text-steel tabular-nums">
                  {dimension.letter}
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted">{area.name}</p>
                  <p id={id} className="mt-0.5 text-[15px] leading-snug font-medium text-ink">
                    {area.statement}
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:pl-9">
                <AnswerScale
                  name={area.id}
                  labelledBy={id}
                  value={state.answers[area.id]}
                  onChange={(value) => assessmentActions.setAnswer(area.id, value)}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
