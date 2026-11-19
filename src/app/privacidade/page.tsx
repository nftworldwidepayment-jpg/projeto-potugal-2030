import type { Metadata } from "next";
import { DocumentPlaceholder } from "@/components/layout/document-placeholder";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacidadePage() {
  return (
    <DocumentPlaceholder
      title="Política de Privacidade"
      description="Informação sobre o tratamento de dados pessoais no âmbito do PORTUGAL POTENTIAL 2030."
    />
  );
}
