import { CompanyPicker } from "@/components/gestao/company-picker";

export default function EmpresasLayout({ children }: LayoutProps<"/gestao/empresas">) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
      <div className="min-w-0 print:hidden">
        <CompanyPicker />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
