export type RGB = [number, number, number];

// Sequential ramp for leakage data, built from the site's single accent so the data
// and the UI speak one colour: panel-dark (no signal) -> accent amber -> pale (strongest).
// Hot still means "leaks"; nothing else on the page is amber except findings and focus.
export const HEAT_STOPS: RGB[] = [
  [22, 23, 28], // #16171C panel
  [92, 60, 22], // #5C3C16
  [245, 165, 36], // #F5A524 accent
  [255, 226, 168], // #FFE2A8
];

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

// t in [0,1] -> "rgb(r, g, b)" along the heat ramp.
export function heatColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = HEAT_STOPS.length - 1;
  const scaled = clamped * segments;
  const i = Math.min(Math.floor(scaled), segments - 1);
  const local = scaled - i;
  const c0 = HEAT_STOPS[i];
  const c1 = HEAT_STOPS[i + 1];
  const r = lerp(c0[0], c1[0], local);
  const g = lerp(c0[1], c1[1], local);
  const b = lerp(c0[2], c1[2], local);
  return `rgb(${r}, ${g}, ${b})`;
}
