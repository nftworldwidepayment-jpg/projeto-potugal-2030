import type { Metadata } from "next";
import { OverviewView } from "@/components/gestao/overview-view";

export const metadata: Metadata = {
  title: "Visão Geral",
};

export default function GestaoPage() {
  return <OverviewView />;
}
