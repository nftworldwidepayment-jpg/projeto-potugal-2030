import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="py-28 lg:py-36">
      <div className="max-w-xl">
        <Eyebrow>Erro 404</Eyebrow>
        <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-navy sm:text-5xl">
          Página não encontrada.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          A página que procura não existe ou foi movida. Pode regressar ao início ou explorar a plataforma.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#inicio">Voltar ao início</ButtonLink>
          <ButtonLink href="/plataforma" variant="secondary">
            Explorar a Plataforma
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
