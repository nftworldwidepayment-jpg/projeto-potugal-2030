import { cn } from "@/lib/utils";
import type { Indicator } from "@/types/diagnostic";
import { Sparkline } from "./sparkline";

/**
 * Indicador do painel. Em larguras reduzidas apresenta-se numa linha
 * (etiqueta e valor); a partir de @sm mostra também a minitendência.
 */
export function StatTile({ indicator, className }: { indicator: Indicator; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2.5",
        "@sm:flex-col @sm:items-stretch @sm:justify-start @sm:gap-0 @sm:py-3",
        className,
      )}
    >
      <p className="text-[11px] leading-snug text-muted @sm:min-h-[2lh]">{indicator.label}</p>
      <p className="text-sm font-semibold whitespace-nowrap text-ink @sm:mt-1.5 @sm:text-base">{indicator.value}</p>
      {indicator.trend && (
        <div className="hidden @sm:mt-2 @sm:block">
          <Sparkline values={indicator.trend} />
          <p className="sr-only">Tendência dos últimos 12 meses</p>
        </div>
      )}
    </div>
  );
}
