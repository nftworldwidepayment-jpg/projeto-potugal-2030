import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-line bg-white px-6 py-12 text-center">
        <LogoMark className="mx-auto size-10" />
        <p className="mt-5 text-sm font-semibold text-steel">Erro 404</p>
        <h1 className="mt-1 text-lg font-semibold text-navy">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted">O endereço não existe ou foi alterado.</p>
        <Link href="/" className={buttonClasses({ className: "mt-6" })}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
