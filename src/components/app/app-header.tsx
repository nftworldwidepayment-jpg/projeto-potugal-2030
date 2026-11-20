"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Info, LogOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { useAssessment } from "@/lib/assessment-store";
import { formatDate } from "@/lib/csv";
import { portfolioStats } from "@/lib/portfolio";
import { prefsActions, roleHome, usePrefs } from "@/lib/prefs-store";
import { roleFromPath, roleLabels, siteConfig } from "@/lib/site";
import { AboutDialog } from "./about-dialog";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const role = roleFromPath(pathname);
  const prefs = usePrefs();
  const { isDemo, profile, updatedAt } = useAssessment();
  const aboutRef = useRef<HTMLDialogElement>(null);

  // Quem entra diretamente por um endereço de um perfil fica nesse perfil.
  // Só sincroniza quando o endereço muda, para não anular "Mudar de perfil".
  const syncedPath = useRef<string | null>(null);
  useEffect(() => {
    if (!prefs || !role || syncedPath.current === pathname) return;
    syncedPath.current = pathname;
    if (prefs.role !== role) prefsActions.setRole(role);
  }, [prefs, role, pathname]);

  const switchProfile = () => {
    prefsActions.setRole(null);
    router.push("/");
  };

  let subtitle = "Diagnóstico de potencial empresarial";
  let status = "";
  if (role === "gestor") {
    subtitle = `${roleLabels.gestor} · Carteira de demonstração`;
    status = `${portfolioStats.companies} empresas fictícias · Último diagnóstico a ${formatDate(portfolioStats.lastAssessment)}`;
  } else if (role === "empresa") {
    subtitle = isDemo ? `${roleLabels.empresa} · Dados de demonstração` : profile.name || roleLabels.empresa;
    status = isDemo
      ? "Dados de demonstração"
      : updatedAt
        ? `Atualizado a ${new Date(updatedAt).toLocaleString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
        : "Diagnóstico por preencher";
  }

  return (
    <header className="pt-safe border-b border-line bg-white print:hidden">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px]">
        <Link href={role ? roleHome[role] : "/"} className="-m-1 flex min-w-0 items-center gap-3 rounded-md p-1">
          <LogoMark className="size-8 sm:size-9" />
          <span className="min-w-0">
            <span className="block truncate text-[15px] leading-tight font-semibold text-navy sm:text-base">
              {siteConfig.shortName}
            </span>
            <span className="block truncate text-xs leading-tight text-muted">{subtitle}</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          {status && (
            <span className="mr-2 hidden items-center gap-2 text-xs text-muted lg:flex">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-steel-soft" />
              {status}
            </span>
          )}
          <button
            type="button"
            onClick={() => aboutRef.current?.showModal()}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-navy sm:px-3 sm:ring-1 sm:ring-line sm:ring-inset"
          >
            <Info aria-hidden="true" className="size-4 sm:hidden" />
            <span className="sr-only sm:not-sr-only">Sobre</span>
          </button>
          {role && (
            <button
              type="button"
              onClick={switchProfile}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-navy sm:px-3 sm:ring-1 sm:ring-line sm:ring-inset"
            >
              <LogOut aria-hidden="true" className="size-4 sm:hidden" />
              <span className="sr-only sm:not-sr-only">Mudar de perfil</span>
            </button>
          )}
        </div>
      </Container>
      <AboutDialog ref={aboutRef} role={role} />
    </header>
  );
}
