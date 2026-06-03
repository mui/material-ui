# Spacing-derivation screenshot harness

Local visual verification for the spacing-derivation rollout — no Argos.
Decision/spec/plan: [`docs/adr/`](../../docs/adr/spacing-derived-rollout-plan.md).

Asserts the default render is **pixel-identical** before/after the change
(Playwright `toHaveScreenshot`, `maxDiffPixels: 0`) and captures density
screenshots (`--mui-spacing` 6px/10px) for human review.

## Prerequisites

- `pnpm docs:dev` running (serves the fixture at
  `/experiments/spacing-fixture`). Override the URL with `SPACING_BASE_URL`.
- Chromium for Playwright: `pnpm exec playwright install chromium` (once).

## Steps (per component)

1. Add the component's matrix to the `demos` map in
   `docs/pages/experiments/spacing-fixture.tsx`.
2. **Baseline (before)** — on the _unconverted_ component:

   ```bash
   COMPONENT=<Component> pnpm spacing:shot:update
   ```

   Writes the baseline to `scripts/spacing-screenshots/__baselines__/`.

3. Implement the spacing-derivation in the component.
4. **Assert + density (after)**:

   ```bash
   COMPONENT=<Component> pnpm spacing:shot
   ```

   - Fails if the default render differs from the baseline (⇒ wrong offset);
     a diff image is written under `test-results/`.
   - Writes `spacing-screenshots/<Component>/after-{default,6px,10px}.png`.

5. Eyeball `after-6px.png` / `after-10px.png` for density reflow and
   anchored/notch alignment.

Outputs (`spacing-screenshots/`, `__baselines__/`) are gitignored.
