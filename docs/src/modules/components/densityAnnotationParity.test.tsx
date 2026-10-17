import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { createRenderer, ignoreActWarnings, isJsdom } from '@mui/internal-test-utils';
import AllComponentsDemo from 'docs/data/material/experimental-api/enhance-density/AllComponentsDemo';
import {
  DENSITY_SCALE,
  DENSITY_TARGETS,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotations';
import { DENSITY_COMPONENTS } from 'docs/data/material/experimental-api/enhance-density/densityComponents';
import {
  DENSITY_ANNOTATIONS,
  annotationsFor,
} from 'docs/data/material/experimental-api/enhance-density/densityAnnotationSpecs';

/**
 * The annotation page names every measured band with a token (`xSmall`,
 * `touchTarget - xxSmall`, `(touchTarget - 1lh) / 2`). Those tokens are written
 * by hand, and nothing has ever checked them against the value they sit beside —
 * so a retuned emission leaves the label quietly lying about the pixels.
 *
 * Here the label is parsed back apart: the token is evaluated against the scale
 * the demo is running on, and compared to the px the engine measured. Any claim
 * whose token drifts from its emission fails, with no per-claim upkeep.
 */

// The ladder the demo renders on, read from the module it renders with — a
// second copy here would grade the labels against a scale the page isn't using.
const SCALE: Record<string, number> = { ...DENSITY_SCALE, ...DENSITY_TARGETS };

/**
 * Evaluate a token: scale names and `<n>lh` become numbers, then the arithmetic
 * runs left to right honouring `*` and `/`. Deliberately tiny — the token
 * vocabulary is names, px literals, `+ - * /`, `×` and parentheses.
 */
function evaluateToken(token: string, lineHeight: number): number | null {
  const normalised = token
    .replace(/×/g, '*')
    .replace(/([\d.]+)lh/g, (_, multiple) => String(parseFloat(multiple) * lineHeight))
    .replace(/\b([a-zA-Z][a-zA-Z0-9]*)\b/g, (name) => String(SCALE[name] ?? name))
    .replace(/px/g, '');
  if (!/^[\d\s.+\-*/()]+$/.test(normalised)) {
    return null; // not an arithmetic token (a prose note) — skipped
  }
  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict";return (${normalised});`)() as number;
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Everything here waits on a condition rather than a duration, so the cadence
 * is what the walk costs: the default 50ms poll spends most of the run asleep
 * between a re-render and the check that notices it.
 */
const POLL = { interval: 5, timeout: 3000 };

/** `token (12px)` → the two halves; labels without a token render px only. */
const LABEL = /^(.*?)\s*\(([\d.]+)px\)$/;

/**
 * The annotations redraw on an animation frame after a re-render, so the wait
 * runs on that same clock: sample per frame and accept once the drawing has
 * held still for three of them. A timer-based poll can take both its samples
 * inside the gap before the redraw starts and call the previous state settled.
 */
async function settledLabels(): Promise<string[]> {
  const read = () =>
    Array.from(document.querySelectorAll('[data-annotations] text')).map(
      (node) => node.textContent ?? '',
    );
  let previous = '';
  let held = 0;
  for (let frame = 0; frame < 90; frame += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(requestAnimationFrame);
    const current = read();
    const key = current.join('|');
    held = key === previous && current.length > 0 ? held + 1 : 0;
    previous = key;
    if (held >= 3) {
      return current;
    }
  }
  throw new Error('annotations never settled');
}

/**
 * Every toolbar state a family can be read in. Size-dependent tokens are only
 * true at the size they were written for, so defaults alone would leave the
 * other sizes unchecked.
 */
function toolbarStates(family: string): Record<string, string | boolean>[] {
  const controls = (DENSITY_COMPONENTS[family].controls ?? []) as any[];
  return controls.reduce<Record<string, string | boolean>[]>(
    (states, control) => {
      const options = control.type === 'select' ? control.options : [false, true];
      return states.flatMap((state) =>
        options.map((option: string | boolean) => ({ ...state, [control.prop]: option })),
      );
    },
    [{}],
  );
}

/** Put the toolbar into one of those states. */
async function applyState(family: string, state: Record<string, string | boolean>) {
  const controls = (DENSITY_COMPONENTS[family].controls ?? []) as any[];
  const selects = controls.filter((control) => control.type === 'select');
  for (const [prop, value] of Object.entries(state)) {
    if (typeof value === 'boolean') {
      const label = Array.from(document.querySelectorAll('.MuiFormControlLabel-root')).find(
        (node) => node.textContent === prop,
      );
      const input = label?.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
      if (input && input.checked !== value) {
        input.click();
        // eslint-disable-next-line no-await-in-loop
        await vi.waitFor(() => {
          if (input.checked !== value) {
            throw new Error(`${prop} not toggled`);
          }
        }, POLL);
      }
    } else {
      // The toolbar's own selects come first in the DOM: the component picker,
      // then one per select control, before anything the demo renders.
      const position = 1 + selects.findIndex((control) => control.prop === prop);
      const trigger = document.querySelectorAll('.MuiSelect-select')[position] as
        HTMLElement | undefined;
      if (!trigger || trigger.textContent === value) {
        continue;
      }
      trigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      // eslint-disable-next-line no-await-in-loop
      const option = await vi.waitFor(() => {
        const found = Array.from(document.querySelectorAll('li.MuiMenuItem-root')).find(
          (node) => node.textContent === value,
        );
        if (!found) {
          throw new Error(`no ${prop} option ${value}`);
        }
        return found as HTMLElement;
      }, POLL);
      option.click();
      // The labels are read straight after this, so the toolbar has to have
      // taken the value first — otherwise the previous state's drawing is
      // still on screen and reads as settled.
      // eslint-disable-next-line no-await-in-loop
      await vi.waitFor(() => {
        if (trigger.textContent !== value) {
          throw new Error(`${prop} not applied`);
        }
      }, POLL);
    }
  }
}

/** Drive the demo's Component select, the way a reader would. */
async function selectFamily(family: string) {
  const trigger = document.querySelector('.MuiSelect-select') as HTMLElement;
  if (trigger.textContent === family) {
    return;
  }
  trigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  const option = await vi.waitFor(() => {
    const found = Array.from(document.querySelectorAll('li.MuiMenuItem-root')).find(
      (node) => node.textContent === family,
    );
    if (!found) {
      throw new Error(`no option for ${family}`);
    }
    return found as HTMLElement;
  }, POLL);
  option.click();
  await vi.waitFor(() => {
    if ((document.querySelector('.MuiSelect-select') as HTMLElement).textContent !== family) {
      throw new Error('selection not applied');
    }
  }, POLL);
}

describe.skipIf(isJsdom())('density annotation parity', () => {
  const { render } = createRenderer();

  test('every demo family carries annotations', () => {
    const unannotated = Object.keys(DENSITY_COMPONENTS).filter(
      (family) => DENSITY_ANNOTATIONS[family] === undefined,
    );
    expect(unannotated).to.deep.equal([]);
  });

  // One test per family, walking every toolbar state it can be read in: a
  // mismatch names the family and the state it came from.
  Object.keys(DENSITY_COMPONENTS).forEach((family) => {
    test(`${family} tokens equal the values they label`, async () => {
      ignoreActWarnings();
      render(<AllComponentsDemo />);
      await selectFamily(family);

      const mismatches: string[] = [];
      let checked = 0;

      for (const state of toolbarStates(family)) {
        /* eslint-disable no-await-in-loop -- the toolbar is driven in sequence */
        await applyState(family, state);
        const labels = await settledLabels();
        /* eslint-enable no-await-in-loop */
        const claims = annotationsFor(family, state);

        // `1lh` is the claimed element's line box, not the page's. Only a
        // handful of tokens use it, so the element is resolved on demand.
        const lineHeightFor = (token: string) => {
          const claim = claims.find((candidate) => candidate.token === token);
          const target = claim ? (document.querySelector(claim.on) as HTMLElement | null) : null;
          if (!target) {
            return 16;
          }
          // An icon claim sizes the glyph, so its `lh` is the line box the
          // element inherits — its own resolves against the font-size being set.
          const source = claim?.aspect === 'icon' ? (target.parentElement ?? target) : target;
          return parseFloat(getComputedStyle(source).lineHeight) || 16;
        };

        for (const label of labels) {
          const match = LABEL.exec(label.trim());
          const token = match?.[1];
          const expected =
            token === undefined
              ? null
              : evaluateToken(token, /lh/.test(token) ? lineHeightFor(token) : 0);
          if (match === null || token === undefined || expected === null) {
            continue;
          }
          const px = match[2];
          checked += 1;
          const measured = parseFloat(px);
          // The engine measures rendered boxes, so a border can ride along with
          // the value; the tolerance stays well under the smallest scale step.
          if (Math.abs(expected - measured) > 1.1) {
            const where = Object.entries(state)
              .map(([prop, value]) => `${prop}=${value}`)
              .join(' ');
            mismatches.push(
              `${where || 'default'}: "${token}" labels ${measured}px but evaluates to ${expected}px`,
            );
          }
        }
      }

      expect(mismatches).to.deep.equal([]);
      // Guards the walk: a selector change that stopped finding labels would
      // otherwise let this pass by checking nothing.
      expect(checked, 'no evaluable token was checked').to.be.greaterThan(0);
    });
  });
});
