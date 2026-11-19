import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

/** Cabeçalho das páginas interiores. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_90%_at_80%_0%,black_10%,transparent_70%)] opacity-60"
      />
      <Container className="pt-16 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
            {title}
          </h1>
          {description && <div className="mt-6 text-lg leading-relaxed text-muted">{description}</div>}
          {children}
        </div>
      </Container>
    </section>
  );
}
