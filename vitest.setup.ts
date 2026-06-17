import "@testing-library/jest-dom/vitest";

// Minimal canvas stub: prevents jsdom "Not implemented: HTMLCanvasElement.prototype.getContext"
// noise in test output. Components guard with `if (!ctx) return;` so canvas drawing is a no-op.
HTMLCanvasElement.prototype.getContext = ((id: string) =>
  id === "2d" ? { fillRect: () => {}, clearRect: () => {} } : null
) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// matchMedia stub: framer-motion's useReducedMotion() calls window.matchMedia which jsdom
// does not implement. matches:false means useReducedMotion() returns false (motion enabled).
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  }),
});
