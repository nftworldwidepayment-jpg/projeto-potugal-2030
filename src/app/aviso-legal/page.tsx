import type { Metadata } from "next";
import { DocumentPlaceholder } from "@/components/layout/document-placeholder";

export const metadata: Metadata = {
  title: "Aviso Legal",
};

export default function AvisoLegalPage() {
  return (
    <DocumentPlaceholder
      title="Aviso Legal"
      description="Condições de utilização do website e informação legal sobre a iniciativa PORTUGAL POTENTIAL 2030."
    />
  );
}
