import { Plus } from "lucide-react";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";

const questions: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: "O que é o PORTUGAL POTENTIAL 2030?",
    answer:
      "É uma iniciativa que pretende ajudar as empresas portuguesas a identificar o seu potencial de crescimento, através de um diagnóstico integrado em quatro dimensões: colaboradores, operações, finanças e estratégia.",
  },
  {
    question: "O que é um diagnóstico empresarial?",
    answer:
      "É uma análise estruturada da situação atual de uma empresa. Ajuda a perceber o que funciona bem, onde existem dificuldades e onde há margem para crescer.",
  },
  {
    question: "Porquê quatro dimensões?",
    answer:
      "Porque o potencial de uma empresa raramente está numa única área. Analisar as pessoas, as operações, as finanças e a estratégia em conjunto permite ver ligações que uma análise isolada não mostra.",
  },
  {
    question: "O que vai receber a empresa no final?",
    answer:
      "Está previsto que cada empresa receba uma leitura do seu potencial nas quatro dimensões, recomendações ordenadas por prioridade e um plano de ação, que poderá exportar em formato de relatório.",
  },
  {
    question: "A plataforma já está disponível?",
    answer:
      "Ainda não. A plataforma está em desenvolvimento. Nesta fase, o website apresenta a iniciativa e explica como o diagnóstico irá funcionar.",
  },
  {
    question: "Os valores apresentados no painel são reais?",
    answer:
      "Não. O painel apresentado neste website é um exemplo demonstrativo, com dados fictícios. Não representa nenhuma empresa real nem resultados da plataforma.",
  },
];

export function Faq() {
  return (
    <Section id="perguntas" aria-labelledby="perguntas-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <SectionTitle id="perguntas-title" className="mt-6 lg:text-4xl">
            Em poucas palavras.
          </SectionTitle>
          <Lead className="mt-6">As respostas às dúvidas mais comuns sobre a iniciativa.</Lead>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {questions.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-navy transition-colors hover:text-steel [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-transform duration-200 ring-inset group-open:rotate-45"
                >
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
