"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Landmark, type LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { LogoMark } from "@/components/brand/logo";
import { prefsActions, roleHome, usePrefs } from "@/lib/prefs-store";
import { roleLabels, siteConfig } from "@/lib/site";
import type { Role } from "@/types/diagnostic";

const options: ReadonlyArray<{ role: Role; icon: LucideIcon; text: string }> = [
  {
    role: "gestor",
    icon: Landmark,
    text: "Acompanhar a carteira de empresas: resultados por setor, mapa de calor e o painel de cada empresa.",
  },
  {
    role: "empresa",
    icon: Building2,
    text: "Fazer o diagnóstico da empresa, ver os resultados e acompanhar o plano de ação.",
  },
];

/** Ecrã de entrada: escolha do perfil. O perfil fica guardado no navegador. */
export function RolePicker() {
  const router = useRouter();
  const prefs = usePrefs();
  const remembered = prefs?.role ?? null;

  useEffect(() => {
    if (remembered) router.replace(roleHome[remembered]);
  }, [remembered, router]);

  const choose = (role: Role) => {
    prefsActions.setRole(role);
    router.push(roleHome[role]);
  };

  return (
    <main className="pt-safe pb-safe flex flex-1 items-center justify-center px-4 py-10">
      <div className={remembered ? "invisible w-full max-w-2xl" : "w-full max-w-2xl"}>
        <div className="flex flex-col items-center text-center">
          <LogoMark className="size-12" />
          <h1 className="mt-3 text-xl font-semibold text-navy">{siteConfig.shortName}</h1>
          <p className="mt-1 text-sm text-muted">Diagnóstico de potencial empresarial</p>
        </div>

        <p className="mt-8 mb-5 text-center text-sm text-ink">Escolha como quer explorar a plataforma</p>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {options.map(({ role, icon: Icon, text }) => (
            <li key={role}>
              <button
                type="button"
                onClick={() => choose(role)}
                className="group flex h-full w-full flex-col rounded-xl border border-line bg-white p-5 text-left transition-[border-color,box-shadow,scale] hover:border-line-strong hover:shadow-card active:scale-[0.99] sm:p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-navy">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span className="mt-4 text-base font-semibold text-navy">{roleLabels[role]}</span>
                <span className="mt-1 text-sm leading-relaxed text-muted">{text}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel group-hover:text-navy">
                  Entrar
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-muted">Protótipo de demonstração · Dados fictícios</p>
      </div>
    </main>
  );
}
