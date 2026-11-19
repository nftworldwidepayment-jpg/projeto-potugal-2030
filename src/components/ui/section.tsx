import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "white" | "surface";

const tones: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
};

export function Section({
  tone = "white",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-steel uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-steel/50" />
      {children}
    </p>
  );
}

export function SectionTitle({
  as: Heading = "h2",
  id,
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Heading
      id={id}
      className={cn(
        "text-3xl leading-[1.12] font-semibold tracking-[-0.025em] text-navy sm:text-4xl lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </Heading>
  );
}

export function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-base leading-relaxed text-muted sm:text-lg", className)}>{children}</p>;
}
