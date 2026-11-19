"use client";

import { useEffect, useRef, useState } from "react";
import { QuadrantGlyph } from "@/components/brand/logo";
import { dimensionIcons } from "@/components/dashboard/dimension-icons";
import { dimensions } from "@/lib/dimensions";
import { cn } from "@/lib/utils";

/**
 * As quatro dimensões. No telemóvel: carrossel com deslize e paragem em
 * cada cartão, mais um seletor A–D para saltar diretamente. A partir de
 * 640 px: grelha de 2 ou 4 colunas, sem carrossel.
 */
export function DimensionsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target));
        }
      },
      { root: track, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const item = trackRef.current?.children[index];
    if (!item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    item.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div className="mt-10 sm:mt-14">
      <div className="sm:hidden">
        <div role="group" aria-label="Escolher dimensão" className="grid grid-cols-4 gap-1 rounded-2xl bg-white p-1 ring-1 ring-line">
          {dimensions.map((dimension, i) => {
            const Icon = dimensionIcons[dimension.id];
            const selected = active === i;
            return (
              <button
                key={dimension.id}
                type="button"
                onClick={() => goTo(i)}
                aria-pressed={selected}
                aria-label={`Dimensão ${dimension.letter}: ${dimension.title}`}
                className={cn(
                  "flex min-h-12 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition-[background-color,color,scale] duration-200 active:scale-95",
                  selected ? "bg-navy text-white" : "text-steel",
                )}
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
                {dimension.letter}
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-center justify-between px-1 text-xs text-muted">
          <span>Deslize para ver as quatro dimensões</span>
          <span className="font-medium tabular-nums text-ink">
            {active + 1} de {dimensions.length}
          </span>
        </p>
      </div>

      <ul
        ref={trackRef}
        className="scrollbar-none max-sm:carousel-bleed mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:mt-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4"
      >
        {dimensions.map((dimension, i) => {
          const Icon = dimensionIcons[dimension.id];
          return (
            <li key={dimension.id} className="w-[86%] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none">
              <article
                aria-label={`Dimensão ${dimension.letter}: ${dimension.title}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.75} />
                  </span>
                  <QuadrantGlyph active={i} className="size-6" />
                </div>

                <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-steel uppercase sm:mt-8">
                  Dimensão {dimension.letter}
                </p>
                <h3 className="mt-2 text-xl leading-snug font-semibold tracking-[-0.015em] text-navy">
                  {dimension.title}
                </h3>
                <p className="mt-4 mb-6 border-l-2 border-steel-soft pl-4 text-base leading-relaxed text-ink sm:mb-8">
                  {dimension.question}
                </p>

                <div className="mt-auto border-t border-line pt-5 sm:pt-6">
                  <p className="text-xs font-semibold text-muted">O que é analisado</p>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5">
                    {dimension.focusAreas.map((area) => (
                      <li key={area} className="flex items-center gap-3 text-sm text-ink">
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-steel-soft" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
