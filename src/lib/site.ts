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
}

/** Os dois separadores da aplicação. */
export const appTabs: readonly AppTab[] = [
  { href: "/", label: "Painel", description: "Resultados, prioridades e plano de ação" },
  { href: "/diagnostico", label: "Diagnóstico", description: "Perfil da empresa e questionário" },
];

export const legalNav = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Aviso legal", href: "/aviso-legal" },
] as const;
