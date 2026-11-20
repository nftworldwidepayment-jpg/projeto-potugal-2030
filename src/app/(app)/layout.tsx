import Link from "next/link";
import { AppHeader } from "@/components/app/app-header";
import { AppTabBar, AppTabs } from "@/components/app/app-tabs";
import { OnboardingGuide } from "@/components/app/onboarding-guide";
import { Container } from "@/components/ui/container";
import { legalNav, siteConfig } from "@/lib/site";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-lg bg-navy text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-3"
      >
        Saltar para o conteúdo
      </a>
      <AppHeader />
      <AppTabs />
      <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
        <Container className="py-4 sm:py-6 print:max-w-none print:px-0 print:py-0">{children}</Container>
      </main>
      <footer className="print:hidden">
        <Container className="flex flex-col gap-1 pt-2 pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. {siteConfig.tagline}
          </p>
          <ul className="flex gap-4">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-9 items-center hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </footer>
      <AppTabBar />
      <OnboardingGuide />
    </>
  );
}
