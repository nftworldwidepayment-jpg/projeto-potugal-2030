import type { Role } from "@/types/diagnostic";

export const siteConfig = {
  name: "PORTUGAL POTENTIAL 2030",
  shortName: "Portugal Potential 2030",
  tagline: "Transformar potencial em crescimento.",
  description:
    "Diagnóstico do potencial de crescimento das empresas portuguesas em quatro dimensões: colaboradores, operações, finanças e estratégia.",
  copyrightYear: 2026,
} as const;

export interface AppTab {
  href: string;
  label: string;
  description: string;
  icon: "geral" | "empresa" | "painel" | "diagnostico";
}

export const roleLabels: Record<Role, string> = {
  gestor: "Entidade gestora",
  empresa: "Empresa",
};

/** Os dois separadores de cada perfil. */
export const roleTabs: Record<Role, readonly AppTab[]> = {
  gestor: [
    { href: "/gestao", label: "Visão Geral", description: "Carteira, setores e mapa de calor", icon: "geral" },
    { href: "/gestao/empresas", label: "Visão Empresa", description: "Painel de cada empresa", icon: "empresa" },
  ],
  empresa: [
    { href: "/empresa", label: "Painel", description: "Resultados, prioridades e plano de ação", icon: "painel" },
    { href: "/empresa/diagnostico", label: "Diagnóstico", description: "Perfil da empresa e questionário", icon: "diagnostico" },
  ],
};

/** Perfil da área em que o utilizador está, a partir do endereço. */
export function roleFromPath(pathname: string): Role | null {
  if (pathname === "/gestao" || pathname.startsWith("/gestao/")) return "gestor";
  if (pathname === "/empresa" || pathname.startsWith("/empresa/")) return "empresa";
  return null;
}

/** Separador ativo: o mais específico que corresponde ao endereço. */
export function isTabActive(tab: AppTab, pathname: string, tabs: readonly AppTab[]): boolean {
  const matches = tabs.filter((t) => pathname === t.href || pathname.startsWith(`${t.href}/`));
  const best = matches.sort((a, b) => b.href.length - a.href.length)[0];
  return best?.href === tab.href;
}

export const legalNav = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Aviso legal", href: "/aviso-legal" },
] as const;
