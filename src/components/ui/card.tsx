import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("rounded-xl border border-line bg-white print:break-inside-avoid print:border-line-strong", className)}
      {...props}
    />
  );
}

export function CardHeader({
  id,
  title,
  description,
  action,
  className,
}: {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-line px-4 py-3.5 sm:px-5", className)}>
      <div className="min-w-0">
        <h2 id={id} className="text-[15px] leading-snug font-semibold text-navy">
          {title}
        </h2>
        {description && <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "strong" | "soft" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] leading-4 font-semibold whitespace-nowrap",
        tone === "strong" && "bg-navy text-white",
        tone === "soft" && "bg-mist text-navy",
        tone === "neutral" && "bg-surface text-muted ring-1 ring-line ring-inset",
      )}
    >
      {children}
    </span>
  );
}

/** Barra horizontal simples (0 a 100). */
export function ScoreBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-mist", className)}>
      <div className="h-full rounded-full bg-navy print:bg-navy" style={{ width: `${Math.max(2, value)}%` }} />
    </div>
  );
}
