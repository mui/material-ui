/* eslint-disable no-console, no-await-in-loop */
/**
 * Gate for the "All components density" doc section.
 *
 * Every annotation claims a row of the density emit table. This renders the demo
 * for each family and checks three things a screenshot can't be trusted to show:
 *
 *   A. the annotated element exists and is visible — a selector that stopped
 *      matching, or a slot inside a closed container, draws nothing silently;
 *   B. an annotation whose token names a scale step measures that step — the
 *      caption is a claim about a number, and it has been wrong before
 *      (`x-small` printed on a band measuring 6px);
 *   C. every annotation produced a caption — specs list drawable rows only, so
 *      one that drew nothing is either a bad spec or an instance that doesn't
 *      exercise it (a `gap` needs children to put a gap between).
 *
 * Run against the demo-shot Vite host:
 *   npx vite .demo-harness --port 5099 &
 *   node scripts/verifyDensityAnnotations.mjs
 */
import { chromium } from 'playwright';
import {
  DENSITY_ANNOTATIONS,
  annotationsFor,
} from '../docs/data/material/customization/density/densityAnnotationSpecs.js';

const HOST = process.env.HOST ?? 'http://localhost:5099';
const only = process.argv.slice(2);

// The scale `enhanceDensity` ships. A token naming one of these is checkable.
const SCALE = {
  'xx-small': 4,
  'x-small': 8,
  small: 12,
  medium: 16,
  large: 24,
  'x-large': 32,
  'xx-large': 48,
  'touch-target': 32,
  'icon-target': 16,
};

/** Only a bare step (or its negation) is a claim we can settle; anything with
 * arithmetic in it is the preset's own expression and is left alone. */
function expected(token) {
  if (!token) {
    return null;
  }
  const negated = token.startsWith('-');
  const key = negated ? token.slice(1) : token;
  if (!(key in SCALE)) {
    return null;
  }
  return negated ? -SCALE[key] : SCALE[key];
}

const measureInPage = ([selector, aspect, axis]) => {
  // Scope to the demo, or the toolbar's own inputs answer for the component's.
  const demo = document.querySelector('[data-density-demo]');
  const element = demo?.querySelector(selector);
  if (!element) {
    return { missing: true };
  }
  const check = element.checkVisibility?.({ visibilityProperty: true });
  if (check === false) {
    return { hidden: true };
  }
  const styles = window.getComputedStyle(element);
  const num = (value) => parseFloat(value) || 0;
  if (aspect === 'padding' || aspect === 'margin') {
    const sides =
      axis === 'block'
        ? [`${aspect}Top`, `${aspect}Bottom`]
        : [`${aspect}Left`, `${aspect}Right`];
    const values = sides.map((side) => num(styles[side])).filter((v) => Math.abs(v) > 0.5);
    return { values };
  }
  if (aspect === 'gap') {
    const column = num(styles.columnGap);
    const row = num(styles.rowGap);
    return { values: [column > 0.5 ? column : row].filter((v) => v > 0.5) };
  }
  if (aspect === 'icon') {
    const svg = element.matches('svg') ? element : element.querySelector('svg');
    return { values: svg ? [svg.getBoundingClientRect().height] : [] };
  }
  return { values: [element.getBoundingClientRect().height] };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const failures = [];
const families = Object.keys(DENSITY_ANNOTATIONS).filter(
  (name) => only.length === 0 || only.includes(name),
);

for (const family of families) {
  await page.goto(`${HOST}/?demo=AllComponentsDemo&w=900`, { waitUntil: 'networkidle' });
  const select = page.locator('[role="combobox"]').first();
  await select.click();
  await page.locator(`li[data-value="${family}"]`).click();
  await page.waitForTimeout(600);

  // The toolbar's own defaults are what the spec is evaluated against.
  const values = await page.evaluate(() => {
    const out = {};
    document.querySelectorAll('.MuiFormControl-root').forEach((control) => {
      const label = control.querySelector('label')?.textContent;
      const value = control.querySelector('[role="combobox"]')?.textContent;
      if (label && value && label !== 'Component') {
        out[label] = value;
      }
    });
    document.querySelectorAll('.MuiSwitch-root input').forEach((input) => {
      const label = input.closest('.MuiFormControlLabel-root')?.textContent;
      if (label) {
        out[label] = input.checked;
      }
    });
    return out;
  });

  const captions = await page.evaluate(() =>
    Array.from(document.querySelectorAll('svg[aria-hidden="true"] text')).map(
      (node) => node.textContent,
    ),
  );

  for (const annotation of annotationsFor(family, values)) {
    const where = `${family} · ${annotation.on} · ${annotation.aspect}${
      annotation.axis ? ` (${annotation.axis})` : ''
    }`;
    const result = await page.evaluate(measureInPage, [
      annotation.on,
      annotation.aspect,
      annotation.axis,
    ]);

    // A — the element is there and visible
    if (result.missing) {
      failures.push(`${where}: selector matched nothing`);
      continue;
    }
    if (result.hidden) {
      failures.push(`${where}: element is not visible`);
      continue;
    }
    // C — it drew something
    if (result.values.length === 0) {
      failures.push(
        `${where}: nothing to draw — the instance does not exercise this row`,
      );
      continue;
    }
    // B — a step token must be the number it names
    const want = expected(annotation.token);
    if (want !== null) {
      const wrong = result.values.filter((value) => Math.abs(value - want) > 0.6);
      if (wrong.length > 0) {
        failures.push(
          `${where}: token "${annotation.token}" claims ${want}px, measured ${wrong
            .map((v) => `${Math.round(v * 10) / 10}px`)
            .join(', ')}`,
        );
        continue;
      }
      const shown = `${annotation.token} (${Math.round(want * 10) / 10}px)`;
      if (!captions.some((text) => text === shown)) {
        failures.push(`${where}: expected the caption "${shown}", not drawn`);
      }
    }
  }
  console.log(`${family}: ${annotationsFor(family, values).length} annotations checked`);
}

await browser.close();

if (failures.length > 0) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((line) => console.error(`  ✗ ${line}`));
  process.exit(1);
}
console.log('\nAll annotations match the scale they name.');
