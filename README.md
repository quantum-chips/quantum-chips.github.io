# Quantum-Safe Silicon — project site

Next.js + TypeScript + Tailwind. A grant-facing research site with an interactive,
**illustrative** side-channel test-bench demo.

## Develop
    npm install
    npm run dev        # http://localhost:3000

## Test
    npm test

## Build
    npm run build          # static export to ./out
    npx serve out          # preview the static build locally

## Deploy to GitHub Pages
The repo includes a workflow (`.github/workflows/deploy.yml`) that builds the
static export and publishes it to GitHub Pages on every push to `main`.

1. Create a GitHub repo and push this project to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Push to `main` — the workflow builds `./out` and deploys it.

Notes:
- The workflow auto-detects the base path: a **project page**
  (`https://<user>.github.io/<repo>`) is served under `/<repo>`; a user/org page
  or custom domain is served at the root. No manual config needed.
- Set the real site URL in `lib/site.ts` (`SITE_URL`) so Open Graph tags and
  `sitemap.xml` use absolute links — e.g. `https://<user>.github.io/<repo>`.
- A custom domain works too: add it under Settings → Pages and a `CNAME`.

## Structure
- `app/` — routes (/, /chip-testing, /problem, /threat-model, /method, /demo, /team, /resources)
- `components/` — layout + demo widgets
- `content/` — editable page copy and data. `pipeline.ts` is the single source for
  the five test stages; `threats.ts`, `framework.ts` and `milestones.ts` come from
  the Milestone 1 report.
- `lib/` — seeded simulation (`sidechannel-sim.ts`), RNG, color ramp
- Design system: `docs/superpowers/specs/2026-10-12-site-redesign.md`

## Notes
- All demo figures are synthetic simulations, clearly labelled. Replace the
  generators in `lib/sidechannel-sim.ts` with real trace data to go live.
- Contact enquiries on /resources#contact point to the investigators' public profiles on /team.
