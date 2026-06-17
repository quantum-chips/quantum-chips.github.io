export type RGB = [number, number, number];

// Inferno-style stops (approved heat ramp): #180F3E #7B2382 #D44842 #F6A21E #FCFFA4
export const INFERNO_STOPS: RGB[] = [
  [24, 15, 62],
  [123, 35, 130],
  [212, 72, 66],
  [246, 162, 30],
  [252, 255, 164],
];

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

// t in [0,1] -> "rgb(r, g, b)" along the heat ramp.
export function heatColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const segments = INFERNO_STOPS.length - 1;
  const scaled = clamped * segments;
  const i = Math.min(Math.floor(scaled), segments - 1);
  const local = scaled - i;
  const c0 = INFERNO_STOPS[i];
  const c1 = INFERNO_STOPS[i + 1];
  const r = lerp(c0[0], c1[0], local);
  const g = lerp(c0[1], c1[1], local);
  const b = lerp(c0[2], c1[2], local);
  return `rgb(${r}, ${g}, ${b})`;
}
