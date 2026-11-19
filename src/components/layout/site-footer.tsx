import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { legalNav, mainNav, platformHref, siteConfig } from "@/lib/site";

/*
 * Em ecrãs táteis, cada link tem uma área de toque de 44 px de altura,
 * qualquer que seja a largura. Com rato, a partir de 768 px, a lista é compacta.
 */
const linkClass =
  "inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-navy md:pointer-fine:min-h-0";

const footerNav = [
  ...mainNav,
  { label: "Perguntas frequentes", href: "/#perguntas" },
  { label: "Explorar a Plataforma", href: platformHref },
];

export function SiteFooter() {
  return (
    <footer data-page-end className="border-t border-line bg-white">
      <Container className="pt-14 pb-[max(3.5rem,env(safe-area-inset-bottom))] sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Link
              href="/#inicio"
              aria-label={`${siteConfig.name} — Início`}
              className="-m-2 inline-flex rounded-md p-2"
            >
              <Logo />
            </Link>
            <p className="mt-5 text-base font-medium text-ink">{siteConfig.tagline}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Uma iniciativa dedicada ao diagnóstico integrado e ao crescimento das empresas portuguesas.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Navegação</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 md:mt-5 md:block md:pointer-fine:space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Contactos</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted md:mt-5">
              Os contactos institucionais da iniciativa serão disponibilizados brevemente.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-2 border-t border-line pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-8">
          <p className="text-sm text-muted">
            © {siteConfig.copyrightYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6">
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
