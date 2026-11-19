import type { Metadata } from "next";
import { DiagnosticoView } from "@/components/diagnostico/diagnostico-view";

export const metadata: Metadata = {
  title: "Diagnóstico",
};

export default function DiagnosticoPage() {
  return <DiagnosticoView />;
}
