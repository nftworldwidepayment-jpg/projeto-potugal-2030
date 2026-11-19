import { cn } from "@/lib/utils";

/**
 * Símbolo da marca: quatro quadrantes — as quatro dimensões — com uma
 * progressão tonal na diagonal ascendente, que sugere crescimento.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true" focusable="false">
      <rect x="2" y="17" width="13" height="13" rx="3" className="fill-steel-pale" />
      <rect x="2" y="2" width="13" height="13" rx="3" className="fill-steel" />
      <rect x="17" y="17" width="13" height="13" rx="3" className="fill-steel" />
      <path
        d="M20 2h1a9 9 0 0 1 9 9v1a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"
        className="fill-navy"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="text-[12px] leading-none font-semibold tracking-[0.1em] whitespace-nowrap text-navy min-[400px]:text-[13px] min-[400px]:tracking-[0.14em]">
        PORTUGAL POTENTIAL <span className="text-steel">2030</span>
      </span>
    </span>
  );
}

/**
 * Versão reduzida do símbolo que destaca um quadrante, usada para
 * identificar visualmente cada uma das quatro dimensões.
 */
export function QuadrantGlyph({ active, className }: { active: number; className?: string }) {
  const cells = [
    { x: 2, y: 2 },
    { x: 17, y: 2 },
    { x: 2, y: 17 },
    { x: 17, y: 17 },
  ];
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true" focusable="false">
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width="13"
          height="13"
          rx="3"
          className={i === active ? "fill-navy" : "fill-line-strong"}
        />
      ))}
    </svg>
  );
}
