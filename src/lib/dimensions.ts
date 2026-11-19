import type { Dimension, DimensionId } from "@/types/diagnostic";

/** As quatro dimensões do diagnóstico, pela ordem de referência (A–D). */
export const dimensions: readonly Dimension[] = [
  {
    id: "colaboradores",
    letter: "A",
    title: "Potencial dos Colaboradores",
    shortTitle: "Colaboradores",
    question: "As competências da equipa estão a ser bem aproveitadas?",
    focusAreas: ["Competências", "Talento subaproveitado", "Organização", "Produtividade"],
  },
  {
    id: "operacional",
    letter: "B",
    title: "Potencial Operacional",
    shortTitle: "Operacional",
    question: "Os processos funcionam de forma eficiente e sem desperdício?",
    focusAreas: ["Processos", "Ineficiências", "Estrutura de custos", "Automatização"],
  },
  {
    id: "financeiro",
    letter: "C",
    title: "Potencial Financeiro",
    shortTitle: "Financeiro",
    question: "Os recursos financeiros estão a gerar todo o retorno possível?",
    focusAreas: [
      "Rentabilidade",
      "Capacidade de investimento",
      "Eficiência financeira",
      "Oportunidades de expansão",
    ],
  },
  {
    id: "estrategico",
    letter: "D",
    title: "Potencial Estratégico",
    shortTitle: "Estratégico",
    question: "A empresa está preparada para inovar e chegar a novos mercados?",
    focusAreas: ["Inovação", "Posicionamento", "Internacionalização", "Crescimento"],
  },
];

export function getDimension(id: DimensionId): Dimension {
  const dimension = dimensions.find((d) => d.id === id);
  if (!dimension) throw new Error(`Dimensão desconhecida: ${id}`);
  return dimension;
}

export function getDimensionIndex(id: DimensionId): number {
  return dimensions.findIndex((d) => d.id === id);
}

/** Número total de áreas de análise cobertas pelas quatro dimensões. */
export const totalFocusAreas = dimensions.reduce((sum, d) => sum + d.focusAreas.length, 0);
