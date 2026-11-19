import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-line bg-white px-6 py-12 text-center">
      <p className="text-sm font-semibold text-steel">Erro 404</p>
      <h1 className="mt-2 text-lg font-semibold text-navy">Página não encontrada</h1>
      <p className="mt-2 text-sm text-muted">O endereço não existe ou foi alterado.</p>
      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <Link href="/" className={buttonClasses({})}>
          Ir para o painel
        </Link>
        <Link href="/diagnostico" className={buttonClasses({ variant: "secondary" })}>
          Abrir o diagnóstico
        </Link>
      </div>
    </div>
  );
}
