import { cn } from "@/lib/utils";

const WIDTH = 120;
const HEIGHT = 28;
const PAD = 4;

/** Minitendência: linha discreta com o ponto mais recente em destaque. */
export function Sparkline({ values, className }: { values: readonly number[]; className?: string }) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (WIDTH - PAD * 2);
    const y = PAD + (1 - (v - min) / range) * (HEIGHT - PAD * 2);
    return [Number(x.toFixed(2)), Number(y.toFixed(2))] as const;
  });
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("h-auto w-full overflow-visible", className)}
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        className="stroke-steel-soft"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="4" className="fill-navy stroke-white" strokeWidth="2" />
    </svg>
  );
}
