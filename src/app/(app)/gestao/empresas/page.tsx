import { redirect } from "next/navigation";
import { portfolio } from "@/lib/portfolio";

/** "Visão Empresa" abre na primeira empresa da carteira. */
export default function EmpresasIndexPage() {
  redirect(`/gestao/empresas/${portfolio[0].id}`);
}
