"use client";

import { answerScale } from "@/lib/model";
import { cn } from "@/lib/utils";
import type { AnswerValue } from "@/types/diagnostic";

/**
 * Escala de 1 a 5 com botões de opção nativos (navegação por setas).
 * Telemóvel: lista vertical com áreas de toque largas. Tablet e desktop: 5 colunas.
 */
export function AnswerScale({
  name,
  labelledBy,
  value,
  onChange,
}: {
  name: string;
  labelledBy: string;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="grid gap-1.5 sm:grid-cols-5">
      {answerScale.map((option) => {
        const checked = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 text-sm transition-[background-color,border-color,color,scale] duration-150 select-none active:scale-[0.98]",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-steel",
              "sm:justify-center sm:px-2 sm:text-center",
              checked
                ? "border-navy bg-navy font-medium text-white"
                : "border-line bg-white text-ink hover:border-line-strong hover:bg-surface",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums sm:hidden",
                checked ? "bg-white/15 text-white" : "bg-surface text-muted",
              )}
            >
              {option.value}
            </span>
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
