import { BadgeEuro, Compass, Users, Workflow, type LucideIcon } from "lucide-react";
import type { DimensionId } from "@/types/diagnostic";

export const dimensionIcons: Record<DimensionId, LucideIcon> = {
  colaboradores: Users,
  operacional: Workflow,
  financeiro: BadgeEuro,
  estrategico: Compass,
};
