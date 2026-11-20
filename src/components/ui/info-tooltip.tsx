"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Ícone "i" com uma explicação curta. Abre ao passar o rato (desktop) ou ao
 * tocar (telemóvel); fecha com Escape ou ao tocar fora. A bolha só existe no
 * ecrã quando está aberta, para não criar scroll horizontal invisível.
 */
export function InfoTooltip({ label, text, className }: { label: string; text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Mantém a bolha dentro do ecrã, deslocando-a na horizontal se for preciso.
  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    if (!open || !bubble) return;
    bubble.style.marginLeft = "0px";
    const rect = bubble.getBoundingClientRect();
    const margin = 12;
    let shift = 0;
    if (rect.left < margin) shift = margin - rect.left;
    else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right;
    bubble.style.marginLeft = `${shift}px`;
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      className={cn("relative inline-flex align-middle", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        className="-m-1 inline-flex size-6 items-center justify-center rounded-full text-muted transition-colors hover:text-navy print:hidden"
      >
        <span
          aria-hidden="true"
          className="flex size-4 items-center justify-center rounded-full border border-current text-[10px] leading-none font-semibold"
        >
          i
        </span>
        <span className="sr-only">Mais informação: {label}</span>
      </button>
      {open && (
        <span
          ref={bubbleRef}
          id={id}
          role="tooltip"
          className="absolute top-full left-1/2 z-50 mt-1.5 w-64 -translate-x-1/2 animate-sheet rounded-lg bg-navy px-3 py-2 text-left text-xs leading-relaxed font-normal tracking-normal text-white normal-case shadow-panel"
        >
          {text}
        </span>
      )}
    </span>
  );
}
