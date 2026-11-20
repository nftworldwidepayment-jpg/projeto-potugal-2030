import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioCompanyView } from "@/components/gestao/portfolio-company-view";
import { getCompany, portfolio } from "@/lib/portfolio";

export function generateStaticParams() {
  return portfolio.map((company) => ({ id: company.id }));
}

export async function generateMetadata({ params }: PageProps<"/gestao/empresas/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getCompany(id)?.profile.name ?? "Empresa" };
}

export default async function EmpresaPage({ params }: PageProps<"/gestao/empresas/[id]">) {
  const { id } = await params;
  const company = getCompany(id);
  if (!company) notFound();
  return <PortfolioCompanyView company={company} />;
}
