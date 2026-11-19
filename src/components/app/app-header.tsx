"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { useRef } from "react";
import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { useAssessment } from "@/lib/assessment-store";
import { siteConfig } from "@/lib/site";
import { AboutDialog } from "./about-dialog";

export function AppHeader() {
  const { isDemo, profile, updatedAt } = useAssessment();
  const aboutRef = useRef<HTMLDialogElement>(null);

  const status = isDemo
    ? "Dados de demonstração"
    : updatedAt
      ? `Atualizado a ${new Date(updatedAt).toLocaleString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
      : "Diagnóstico por preencher";

  return (
    <header className="pt-safe border-b border-line bg-white print:hidden">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" className="-m-1 flex min-w-0 items-center gap-3 rounded-md p-1">
          <LogoMark className="size-8 sm:size-9" />
          <span className="min-w-0">
            <span className="block truncate text-[15px] leading-tight font-semibold text-navy sm:text-base">
              {siteConfig.shortName}
            </span>
            <span className="block truncate text-xs leading-tight text-muted">
              {isDemo ? "Diagnóstico de potencial empresarial" : profile.name || "Diagnóstico de potencial empresarial"}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <span className="hidden items-center gap-2 text-xs text-muted md:flex" suppressHydrationWarning>
            {isDemo && <span aria-hidden="true" className="size-1.5 rounded-full bg-steel-soft" />}
            {status}
          </span>
          <button
            type="button"
            onClick={() => aboutRef.current?.showModal()}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-navy sm:px-3 sm:ring-1 sm:ring-line sm:ring-inset"
          >
            <Info aria-hidden="true" className="size-4 sm:hidden" />
            <span className="sr-only sm:not-sr-only">Sobre</span>
          </button>
        </div>
      </Container>
      <AboutDialog ref={aboutRef} />
    </header>
  );
}
