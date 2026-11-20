import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "./card";

/** Página de documento simples, dentro da aplicação. */
export function DocumentPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-steel hover:text-navy">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar
      </Link>
      <Card className="mt-2 px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-xl font-semibold text-navy sm:text-2xl">{title}</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
      </Card>
    </div>
  );
}
