# Density-adapter screenshot harness

Local visual verification for the CSS-var density adapter — no Argos.
Decision/spec: [`docs/adr/0001-css-var-density-adapter.md`](../../docs/adr/0001-css-var-density-adapter.md).

Asserts the default render is **pixel-identical** before/after the change
(Playwright `toHaveScreenshot`, `maxDiffPixels: 0`) and captures density
screenshots (token `dense`/`loose` levels) for human review.

Unlike the `--mui-spacing` sibling experiment, density here is driven by
per-component tokens (`--Button-<size>-pad`, `--OutlinedInput-<size>-padBlock`),
so the review `level` maps to those tokens — see `scopes` in the fixture.

## Prerequisites

- `pnpm docs:dev` running (serves the fixture at
  `/experiments/density-fixture`). Override the URL with `DENSITY_BASE_URL`.
- Chromium for Playwright: `pnpm exec playwright install chromium` (once).

## Steps (per component)

1. Add the component's matrix to the `demos` map (and its token overrides to
   `scopes`) in `docs/pages/experiments/density-fixture.tsx`.
2. **Baseline (before)** — on the _unconverted_ component (from `master`):

   ```bash
   git stash # or check out the component file(s) from master
   COMPONENT=<Component> pnpm density:shot:update
   git stash pop
   ```

   Writes the baseline to `scripts/density-screenshots/__baselines__/`.

3. Implement / keep the density-adapter in the component.
4. **Assert + density (after)**:

   ```bash
   COMPONENT=<Component> pnpm density:shot
   ```

   - Fails if the default render differs from the baseline (⇒ not
     pixel-identical); a diff image is written under `.playwright-output/`.
   - Writes `density-screenshots/<Component>/after-{default,dense,loose}.png`.

5. Eyeball `after-dense.png` / `after-loose.png` for density reflow (and, for
   TextField, that the floating label stays centered).

Outputs (`density-screenshots/`, `__baselines__/`, `.playwright-output/`) are
gitignored.
