import { levelIndex } from "@/lib/model";

/**
 * Escala sequencial de um só tom (do claro ao azul-marinho), um passo por
 * nível. Validada: tons monótonos e distinguíveis; o texto em cada célula
 * tem contraste de pelo menos 4,5:1.
 */
export const heatColors = [
  { bg: "#9ab2ce", text: "#1d2939" },
  { bg: "#7895b8", text: "#1d2939" },
  { bg: "#41668f", text: "#ffffff" },
  { bg: "#172c48", text: "#ffffff" },
] as const;

export function heatFor(score: number) {
  return heatColors[levelIndex(score)];
}
