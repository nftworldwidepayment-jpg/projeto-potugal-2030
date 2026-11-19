import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícone do ecrã principal (iOS): o símbolo dos quatro quadrantes. */
export default function AppleIcon() {
  const cell = 52;
  const gap = 8;
  const base = { position: "absolute" as const, width: cell, height: cell, borderRadius: 12 };
  const origin = (180 - (cell * 2 + gap)) / 2;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#ffffff" }}>
        <div style={{ ...base, left: origin, top: origin, background: "#345779" }} />
        <div
          style={{
            ...base,
            left: origin + cell + gap,
            top: origin,
            background: "#172c48",
            borderTopRightRadius: 34,
          }}
        />
        <div style={{ ...base, left: origin, top: origin + cell + gap, background: "#c9d6e5" }} />
        <div style={{ ...base, left: origin + cell + gap, top: origin + cell + gap, background: "#345779" }} />
      </div>
    ),
    { ...size },
  );
}
