import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "./page-header";

/** Página provisória para documentos institucionais ainda em preparação. */
export function DocumentPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <>
      <PageHeader eyebrow="Documento em preparação" title={title} description={<p>{description}</p>} />
      <Container className="py-16 lg:py-20">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            O conteúdo definitivo deste documento será publicado antes do lançamento da plataforma de
            diagnóstico.
          </p>
          <p>
            Nesta fase, o website tem caráter exclusivamente informativo: não disponibiliza formulários, não
            recolhe dados empresariais e não utiliza cookies de análise ou de publicidade.
          </p>
        </div>
        <ButtonLink href="/#inicio" variant="secondary" className="mt-10">
          Voltar ao início
        </ButtonLink>
      </Container>
    </>
  );
}
