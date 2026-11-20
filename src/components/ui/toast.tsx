"use client";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";

/**
 * Mensagens de confirmação ("toasts"), com ação opcional (p. ex. "Anular").
 * Estado fora do React, para poderem ser chamadas a partir de qualquer ação.
 */

interface ToastItem {
  id: number;
  message: string;
  action?: { label: string; onClick: () => void };
}

let toasts: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const empty: ToastItem[] = [];

function emit() {
  listeners.forEach((listener) => listener());
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function toast(message: string, action?: ToastItem["action"]) {
  const id = nextId++;
  // No máximo três mensagens visíveis; a mais antiga sai primeiro.
  toasts = [...toasts, { id, message, action }].slice(-3);
  emit();
  window.setTimeout(() => dismiss(id), action ? 6500 : 3500);
}

function useToasts() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => toasts,
    () => empty,
  );
}

export function Toaster() {
  const items = useToasts();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end print:hidden"
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm animate-sheet items-center gap-3 rounded-xl bg-navy py-2 pr-2 pl-4 text-sm text-white shadow-panel"
        >
          <p className="flex-1 py-1">{item.message}</p>
          {item.action && (
            <button
              type="button"
              onClick={() => {
                item.action?.onClick();
                dismiss(item.id);
              }}
              className="min-h-9 shrink-0 rounded-lg px-3 font-semibold text-steel-pale transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismiss(item.id)}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
            <span className="sr-only">Fechar mensagem</span>
          </button>
        </div>
      ))}
    </div>
  );
}
