import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { legalNav, mainNav, platformHref, siteConfig } from "@/lib/site";

const linkClass = "text-sm text-muted transition-colors duration-200 hover:text-navy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/#inicio" aria-label={`${siteConfig.name} — Início`} className="inline-flex rounded-md">
              <Logo />
            </Link>
            <p className="mt-5 text-base font-medium text-ink">{siteConfig.tagline}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Uma iniciativa dedicada ao diagnóstico integrado e ao crescimento das empresas portuguesas.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={platformHref} className={linkClass}>
                  Explorar a Plataforma
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Contactos</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Os contactos institucionais da iniciativa serão disponibilizados brevemente.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {siteConfig.copyrightYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
