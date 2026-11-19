import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Etiqueta obrigatória em qualquer visualização com dados fictícios. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-[11px] leading-none font-semibold whitespace-nowrap text-steel ring-1 ring-steel-pale ring-inset",
        className,
      )}
    >
      <Info aria-hidden="true" className="size-3" strokeWidth={2.25} />
      Exemplo demonstrativo
    </span>
  );
}
