export const siteConfig = {
  name: "PORTUGAL POTENTIAL 2030",
  tagline: "Transformar potencial em crescimento.",
  description:
    "Uma iniciativa para ajudar as empresas portuguesas a descobrir oportunidades escondidas, transformar informação em decisões e converter potencial em crescimento.",
  copyrightYear: 2026,
} as const;

/** Destino da plataforma (página de apresentação, em desenvolvimento). */
export const platformHref = "/plataforma";

export interface NavItem {
  label: string;
  href: string;
  /** Identificador da secção na página inicial, para o realce de navegação. */
  sectionId: string;
}

export const mainNav: readonly NavItem[] = [
  { label: "Início", href: "/#inicio", sectionId: "inicio" },
  { label: "A Plataforma", href: "/#plataforma", sectionId: "plataforma" },
  { label: "As Quatro Dimensões", href: "/#dimensoes", sectionId: "dimensoes" },
  { label: "Como Funciona", href: "/#como-funciona", sectionId: "como-funciona" },
  { label: "Impacto", href: "/#impacto", sectionId: "impacto" },
];

export const legalNav = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Aviso Legal", href: "/aviso-legal" },
] as const;
