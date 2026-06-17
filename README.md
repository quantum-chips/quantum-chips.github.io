# Quantum-Safe Silicon — project site

Next.js + TypeScript + Tailwind. A grant-facing research site with an interactive,
**illustrative** side-channel test-bench demo.

## Develop
    npm install
    npm run dev        # http://localhost:3000

## Test
    npm test

## Build
    npm run build && npm run start

## Structure
- `app/` — routes (/, /problem, /demo, /method, /team, /resources)
- `components/` — layout + demo widgets
- `content/` — editable page copy and data (team, milestones, reading)
- `lib/` — seeded simulation (`sidechannel-sim.ts`), RNG, color ramp

## Notes
- All demo figures are synthetic simulations, clearly labelled. Replace the
  generators in `lib/sidechannel-sim.ts` with real trace data to go live.
- Team roster, lab name, and logo are placeholders.
