import type { Metadata } from "next";
import { DocumentPage } from "@/components/ui/document-page";

export const metadata: Metadata = {
  title: "Privacidade",
};

export default function PrivacidadePage() {
  return (
    <DocumentPage title="Política de Privacidade">
      <p>Documento em preparação. O texto definitivo será publicado antes do lançamento da plataforma.</p>
      <p>
        Nesta versão de demonstração, as respostas ao diagnóstico ficam guardadas apenas no armazenamento local deste
        navegador. Não são enviadas para nenhum servidor e podem ser apagadas a qualquer momento no separador
        Diagnóstico, com a opção Limpar respostas.
      </p>
      <p>Esta aplicação não utiliza cookies de análise nem de publicidade.</p>
    </DocumentPage>
  );
}
