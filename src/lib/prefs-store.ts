"use client";

import { useSyncExternalStore } from "react";
import type { Role } from "@/types/diagnostic";

/**
 * Preferências guardadas no navegador: perfil escolhido no ecrã de entrada
 * e guias de primeira visita já vistos.
 */

const KEY = "pp2030:preferencias:v1";

interface Prefs {
  role: Role | null;
  guidesSeen: Role[];
}

const initial: Prefs = { role: null, guidesSeen: [] };

let prefs: Prefs = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) prefs = { ...initial, ...(JSON.parse(raw) as Prefs) };
  } catch {
    // Mantém os valores iniciais.
  }
}

function commit(next: Prefs) {
  prefs = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Armazenamento indisponível: mantém em memória.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** `undefined` enquanto o navegador ainda não foi lido (render no servidor). */
export function usePrefs(): Prefs | undefined {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return prefs;
    },
    () => undefined,
  );
}

export const prefsActions = {
  setRole(role: Role | null) {
    load();
    commit({ ...prefs, role });
  },
  markGuideSeen(role: Role) {
    load();
    if (!prefs.guidesSeen.includes(role)) commit({ ...prefs, guidesSeen: [...prefs.guidesSeen, role] });
  },
  resetGuide(role: Role) {
    load();
    commit({ ...prefs, guidesSeen: prefs.guidesSeen.filter((r) => r !== role) });
  },
};

export const roleHome: Record<Role, string> = {
  gestor: "/gestao",
  empresa: "/empresa",
};
