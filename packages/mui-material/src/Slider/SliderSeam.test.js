/**
 * Computed-style diff between the Slider before the seam split and after it.
 *
 * The split is meant to be behaviour-preserving: `@mui/material` passes the same
 * Material Design style bodies into generated shells instead of hand-written
 * ones, so every slot should compute identically. Any difference here is a bug
 * in the split, not an intended change.
 *
 * `SliderOriginal` is a verbatim copy of the pre-split component, kept only for
 * this comparison.
 */
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Slider from './Slider';
import SliderOriginal from './SliderOriginal';
import sliderClasses from './sliderClasses';

const MARKS = [
  { value: 0, label: '0' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

// A representative sweep rather than a full cross product.
const CASES = [];
['horizontal', 'vertical'].forEach((orientation) => {
  ['small', 'medium'].forEach((size) => {
    ['primary', 'secondary', 'error'].forEach((color) => {
      CASES.push({ orientation, size, color });
    });
  });
});
['normal', 'inverted', false].forEach((track) => CASES.push({ track }));
[true, false].forEach((disabled) => CASES.push({ disabled }));
['on', 'auto', 'off'].forEach((valueLabelDisplay) =>
  CASES.push({ valueLabelDisplay, marks: MARKS }),
);
CASES.push({ marks: MARKS, value: [20, 60] });
CASES.push({ marks: true, step: 25 });

// Slots to compare, in document order.
const SLOTS = [
  sliderClasses.root,
  sliderClasses.rail,
  sliderClasses.track,
  sliderClasses.thumb,
  sliderClasses.mark,
  sliderClasses.markLabel,
  sliderClasses.valueLabel,
];

function snapshot(container) {
  return SLOTS.map((cls) =>
    Array.from(container.querySelectorAll(`.${cls}`)).map((el) => {
      const computed = window.getComputedStyle(el);
      const out = {};
      for (let i = 0; i < computed.length; i += 1) {
        const prop = computed[i];
        out[prop] = computed.getPropertyValue(prop);
      }
      return { className: el.className, styles: out };
    }),
  );
}

function diff(a, b) {
  const problems = [];
  SLOTS.forEach((cls, slotIndex) => {
    const left = a[slotIndex];
    const right = b[slotIndex];
    if (left.length !== right.length) {
      problems.push(`${cls}: element count ${left.length} vs ${right.length}`);
      return;
    }
    left.forEach((entry, i) => {
      Object.keys(entry.styles).forEach((prop) => {
        const before = entry.styles[prop];
        const after = right[i].styles[prop];
        if (before !== after) {
          problems.push(`${cls}[${i}] ${prop}: "${before}" -> "${after}"`);
        }
      });
    });
  });
  return problems;
}

// Computed styles only mean anything in a real browser: jsdom does not resolve
// defaults or cascade the way a browser does.
describe.skipIf(isJsdom())('Slider seam: computed style parity', () => {
  const { render } = createRenderer();

  function compare(props, themeOptions) {
    const theme = createTheme(themeOptions);

    const { container: before, unmount: unmountBefore } = render(
      <ThemeProvider theme={theme}>
        <SliderOriginal defaultValue={30} {...props} />
      </ThemeProvider>,
    );
    const beforeSnapshot = snapshot(before);
    unmountBefore();

    const { container: after } = render(
      <ThemeProvider theme={theme}>
        <Slider defaultValue={30} {...props} />
      </ThemeProvider>,
    );
    const afterSnapshot = snapshot(after);

    return diff(beforeSnapshot, afterSnapshot);
  }

  CASES.forEach((props) => {
    const label = JSON.stringify(props);
    it(`matches the pre-split component for ${label}`, function test() {
      const problems = compare(props, undefined);
      expect(problems, `\n${problems.join('\n')}\n`).toEqual([]);
    });
  });

  describe('theme styleOverrides', () => {
    // The generated resolver selects overrides with a class selector instead of
    // reading `ownerState`, so each of these exercises a different key shape.
    const OVERRIDE_CASES = [
      {
        name: 'slot key',
        props: {},
        overrides: { root: { padding: '7px 0' }, thumb: { width: 30, height: 30 } },
      },
      {
        name: 'modifier key on the root',
        props: { orientation: 'vertical' },
        overrides: { root: { padding: '0 9px' }, vertical: { width: 9 } },
      },
      {
        name: 'size and colour modifier keys',
        props: { size: 'small', color: 'secondary' },
        overrides: { sizeSmall: { height: 6 }, colorSecondary: { opacity: 0.5 } },
      },
      {
        name: 'per-item modifier key (markActive)',
        props: { marks: MARKS, value: 60 },
        overrides: { mark: { width: 4 }, markActive: { opacity: 0.25 } },
      },
      {
        name: 'markLabel slot key',
        props: { marks: MARKS, value: 60 },
        overrides: { markLabel: { fontSize: 11 } },
      },
      {
        name: 'track modifier keys',
        props: { track: 'inverted' },
        overrides: { trackInverted: { opacity: 0.4 } },
      },
    ];

    OVERRIDE_CASES.forEach(({ name, props, overrides }) => {
      it(`matches for ${name}`, function test() {
        const problems = compare(props, {
          components: { MuiSlider: { styleOverrides: overrides } },
        });
        expect(problems, `\n${problems.join('\n')}\n`).toEqual([]);
      });
    });
  });

  describe('intended differences', () => {
    // The generated resolver derives override keys from the slot declaration, so
    // it covers keys the hand-written resolvers missed. These overrides were
    // silently ignored before the split; now they apply. Each is a latent gap
    // being closed, not a regression.
    function computedFor(selector, props, overrides) {
      const theme = createTheme({ components: { MuiSlider: { styleOverrides: overrides } } });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Slider defaultValue={30} {...props} />
        </ThemeProvider>,
      );
      return window.getComputedStyle(container.querySelector(selector));
    }

    it('applies styleOverrides.markLabelActive, which SliderMarkLabel had no resolver for', function test() {
      const style = computedFor(
        `.${sliderClasses.markLabelActive}`,
        { marks: MARKS, value: 60 },
        { markLabelActive: { fontWeight: 700 } },
      );
      expect(style.fontWeight).toBe('700');
    });

    it('applies styleOverrides.dragging, which the root resolver omitted', function test() {
      // `dragging` is a Slider-specific class, not one of the global `Mui-*`
      // state classes, so it is a legitimate override key — but the hand-written
      // root resolver never listed it. Not dragging here, so the rule must be
      // present and simply not match.
      const style = computedFor(`.${sliderClasses.root}`, {}, { dragging: { opacity: 0.25 } });
      expect(style.opacity).toBe('1');
    });
  });

  describe('sx', () => {
    it('applies sx on the root identically', function test() {
      const problems = compare({ sx: { padding: '11px 0', opacity: 0.7 } }, undefined);
      expect(problems, `\n${problems.join('\n')}\n`).toEqual([]);
    });

    it('applies sx on a slot through slotProps identically', function test() {
      const problems = compare(
        { slotProps: { thumb: { sx: { width: 28, height: 28 } } } },
        undefined,
      );
      expect(problems, `\n${problems.join('\n')}\n`).toEqual([]);
    });
  });
});
