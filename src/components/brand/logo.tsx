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
