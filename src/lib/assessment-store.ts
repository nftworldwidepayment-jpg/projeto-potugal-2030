"use client";

import { useSyncExternalStore } from "react";
import type {
  ActionStatus,
  AnswerValue,
  AssessmentState,
  CompanyProfile,
  DimensionId,
  PlanItem,
} from "@/types/diagnostic";
import { demoState, emptyState } from "./model";

/**
 * Estado do diagnóstico, partilhado pelos dois separadores e guardado
 * apenas no navegador (localStorage). Não há envio de dados para servidores.
 */

const STORAGE_KEY = "pp2030:diagnostico:v1";

let state: AssessmentState = demoState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...emptyState, ...(JSON.parse(raw) as AssessmentState) };
  } catch {
    // Dados corrompidos ou armazenamento indisponível: mantém a demonstração.
  }
}

function commit(next: AssessmentState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Armazenamento indisponível (p. ex. navegação privada): mantém em memória.
  }
  listeners.forEach((listener) => listener());
}

function edit(update: (current: AssessmentState) => Partial<AssessmentState>) {
  load();
  commit({ ...state, ...update(state), isDemo: false, updatedAt: new Date().toISOString() });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

/** Estado atual, fora do React (para guardar antes de uma ação a anular). */
export function currentAssessment(): AssessmentState {
  load();
  return state;
}

function getServerSnapshot() {
  return demoState;
}

export function useAssessment(): AssessmentState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const assessmentActions = {
  setProfile(profile: Partial<CompanyProfile>) {
    edit((s) => ({ profile: { ...s.profile, ...profile } }));
  },
  setAnswer(areaId: string, value: AnswerValue) {
    edit((s) => ({ answers: { ...s.answers, [areaId]: value } }));
  },
  addToPlan(areaId: string) {
    edit((s) =>
      s.plan.some((item) => item.areaId === areaId)
        ? {}
        : { plan: [...s.plan, { areaId, status: "por-iniciar" as ActionStatus }] },
    );
  },
  removeFromPlan(areaId: string) {
    edit((s) => ({ plan: s.plan.filter((item) => item.areaId !== areaId) }));
  },
  /** Repõe uma ação removida na posição original (para "Anular"). */
  insertPlanItem(item: PlanItem, index: number) {
    edit((s) => {
      if (s.plan.some((p) => p.areaId === item.areaId)) return {};
      const plan = [...s.plan];
      plan.splice(Math.min(index, plan.length), 0, item);
      return { plan };
    });
  },
  updatePlanItem(areaId: string, patch: Partial<Omit<PlanItem, "areaId">>) {
    edit((s) => ({ plan: s.plan.map((item) => (item.areaId === areaId ? { ...item, ...patch } : item)) }));
  },
  setPlanStatus(areaId: string, status: ActionStatus) {
    edit((s) => ({ plan: s.plan.map((item) => (item.areaId === areaId ? { ...item, status } : item)) }));
  },
  clear() {
    load();
    commit({ ...emptyState, updatedAt: new Date().toISOString() });
  },
  resetDemo() {
    load();
    commit(demoState);
  },
  /** Repõe um estado anterior completo (para "Anular"). */
  restore(previous: AssessmentState) {
    load();
    commit(previous);
  },
};

/* ------------------------------------------------------------------ */
/* Passo atual do diagnóstico (estado de interface, não guardado)      */
/* ------------------------------------------------------------------ */

export type StepId = "perfil" | DimensionId;

let step: StepId = "perfil";
const stepListeners = new Set<() => void>();

export function setStep(next: StepId) {
  step = next;
  stepListeners.forEach((listener) => listener());
}

export function useStep(): StepId {
  return useSyncExternalStore(
    (listener) => {
      stepListeners.add(listener);
      return () => stepListeners.delete(listener);
    },
    () => step,
    () => "perfil" as StepId,
  );
}
