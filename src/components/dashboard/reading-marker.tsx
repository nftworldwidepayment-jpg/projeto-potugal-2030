/** Marcador numerado que liga uma zona do painel à respetiva explicação. */
export function ReadingMarker({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] leading-none font-semibold text-white"
    >
      {n}
    </span>
  );
}
