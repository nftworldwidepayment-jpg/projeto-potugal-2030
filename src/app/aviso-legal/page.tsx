import type { Metadata } from "next";
import { DocumentPage } from "@/components/ui/document-page";

export const metadata: Metadata = {
  title: "Aviso legal",
};

export default function AvisoLegalPage() {
  return (
    <DocumentPage title="Aviso legal">
      <p>Documento em preparação. O texto definitivo será publicado antes do lançamento da plataforma.</p>
      <p>
        Esta aplicação é um protótipo de demonstração. Os resultados resultam de um modelo de cálculo simples,
        descrito na janela Sobre, e não substituem uma análise profissional. Os dados de demonstração são fictícios.
      </p>
    </DocumentPage>
  );
}
