import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import AllComponentsDemo from 'docs/data/material/customization/density/AllComponentsDemo';
import { DENSITY_COMPONENTS } from 'docs/data/material/customization/density/densityComponents';
import {
  DENSITY_ANNOTATIONS,
  annotationsFor,
} from 'docs/data/material/customization/density/densityAnnotationSpecs';

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

// The shipped ladder the demo renders on.
const SCALE: Record<string, number> = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 48,
  touchTarget: 32,
  iconSize: 16,
};

/**
 * Evaluate a token: scale names and `<n>lh` become numbers, then the arithmetic
 * runs left to right honouring `*` and `/`. Deliberately tiny — the token
 * vocabulary is names, px literals, `+ - * /`, `×` and parentheses.
 */
function evaluateToken(token: string, lineHeight: number): number | null {
  const normalised = token
    .replace(/×/g, '*')
    .replace(/([\d.]+)lh/g, (_, n) => String(parseFloat(n) * lineHeight))
    .replace(/\b([a-zA-Z][a-zA-Z0-9]*)\b/g, (name) =>
      SCALE[name] !== undefined ? String(SCALE[name]) : name,
    )
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

/** `token (12px)` → the two halves; labels without a token render px only. */
const LABEL = /^(.*?)\s*\(([\d.]+)px\)$/;

const settle = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

/** The toolbar values a family opens on — what the drawn claims were built from. */
function controlDefaults(family: string): Record<string, string | boolean> {
  const values: Record<string, string | boolean> = {};
  (DENSITY_COMPONENTS[family].controls ?? []).forEach((control: any) => {
    values[control.prop] = control.initial;
  });
  return values;
}

/** Drive the demo's Component select, the way a reader would. */
async function selectFamily(family: string) {
  const trigger = document.querySelectorAll('.MuiSelect-select')[0] as HTMLElement;
  trigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  await settle();
  const option = Array.from(document.querySelectorAll('li.MuiMenuItem-root')).find(
    (node) => node.textContent === family,
  ) as HTMLElement | undefined;
  if (!option) {
    throw new Error(`no option for ${family}`);
  }
  option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  option.click();
  await settle();
}

describe.skipIf(isJsdom())('density annotation parity', () => {
  const { render } = createRenderer();

  test('every demo family carries annotations', () => {
    const unannotated = Object.keys(DENSITY_COMPONENTS).filter(
      (family) => DENSITY_ANNOTATIONS[family] === undefined,
    );
    expect(unannotated).to.deep.equal([]);
  });

  // One test per family: a mismatch names the family it came from, and each
  // walk stays well inside the default timeout.
  Object.keys(DENSITY_COMPONENTS).forEach((family) => {
    test(`${family} tokens equal the values they label`, async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<AllComponentsDemo />);
      await settle();
      await selectFamily(family);

      const svg = document.querySelector('[data-annotations]');
      expect(svg, 'the demo drew no annotations').not.to.equal(null);

      // `1lh` is the claimed element's line box, not the page's, so each token
      // is evaluated against the element the claim points at.
      const lineHeightFor = (token: string) => {
        const claim = annotationsFor(family, controlDefaults(family)).find(
          (candidate) => candidate.token === token,
        );
        const target = claim ? (document.querySelector(claim.on) as HTMLElement | null) : null;
        if (!target) {
          return 16;
        }
        // An icon claim sizes the glyph, so its `lh` is the line box the element
        // inherits — reading the element's own would resolve against the very
        // font-size the token is setting.
        const source = claim?.aspect === 'icon' ? (target.parentElement ?? target) : target;
        return parseFloat(getComputedStyle(source).lineHeight) || 16;
      };

      const mismatches: string[] = [];
      let checked = 0;
      Array.from(svg!.querySelectorAll('text')).forEach((node) => {
        const match = LABEL.exec((node.textContent ?? '').trim());
        if (!match) {
          return;
        }
        const [, token, px] = match;
        const expected = evaluateToken(token, lineHeightFor(token));
        if (expected === null) {
          return;
        }
        checked += 1;
        const measured = parseFloat(px);
        // The engine measures rendered boxes, so a border rides along with the
        // value; the tolerance stays well under one scale step.
        if (Math.abs(expected - measured) > 1.5) {
          mismatches.push(`"${token}" labels ${measured}px but evaluates to ${expected}px`);
        }
      });

      expect(mismatches).to.deep.equal([]);
      // Guards the walk: a selector change that stopped finding labels would
      // otherwise let this pass by checking nothing.
      expect(checked, 'no evaluable token was checked').to.be.greaterThan(0);
    });
  });
});
