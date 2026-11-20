/**
 * Exportação para CSV compatível com o Excel em português: separador ";"
 * e BOM UTF-8 para os acentos abrirem corretamente.
 */

// Neutraliza fórmulas: uma célula que comece por =, +, -, @, tab ou CR é lida como texto.
const FORMULA_TRIGGER = /^[=+\-@\t\r]/;

function escapeCell(value: string | number): string {
  let text = String(value ?? "");
  if (FORMULA_TRIGGER.test(text)) text = `'${text}`;
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number>>) {
  const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(";"));
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Nome de ficheiro seguro, p. ex. "plano-de-acao-moldes-atlantida-lda". */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Data de AAAA-MM-DD para DD/MM/AAAA. */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}
