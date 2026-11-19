import type { Dimension, DimensionId } from "@/types/diagnostic";

/** As quatro dimensões do diagnóstico, pela ordem de referência (A–D). */
export const dimensions: readonly Dimension[] = [
  {
    id: "colaboradores",
    letter: "A",
    title: "Potencial dos Colaboradores",
    shortTitle: "Colaboradores",
    summary: "As pessoas, as suas competências e a forma como o trabalho está organizado.",
    focusAreas: ["Competências", "Talento subaproveitado", "Organização", "Produtividade"],
  },
  {
    id: "operacional",
    letter: "B",
    title: "Potencial Operacional",
    shortTitle: "Operacional",
    summary: "Os processos, os recursos e a eficiência com que a empresa opera.",
    focusAreas: ["Processos", "Ineficiências", "Estrutura de custos", "Automatização"],
  },
  {
    id: "financeiro",
    letter: "C",
    title: "Potencial Financeiro",
    shortTitle: "Financeiro",
    summary: "A rentabilidade, a solidez financeira e a capacidade de investir.",
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
    summary: "O posicionamento, a capacidade de inovar e as opções de crescimento.",
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
