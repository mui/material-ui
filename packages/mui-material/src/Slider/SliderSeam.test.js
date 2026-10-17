/**
 * Tests the generated styled shells and overridesResolver.
 *
 * `@mui/material` builds one styled shell per slot from the unstyled slot
 * declaration rather than hand-writing them. The generated `overridesResolver`
 * picks `styleOverrides` entries with a class selector instead of reading
 * `ownerState`, so these cover each key shape it has to handle: slot keys,
 * modifier keys on the root, and per-item modifier keys on a repeated slot.
 */
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Slider from './Slider';
import sliderClasses from './sliderClasses';

const MARKS = [
  { value: 0, label: '0' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

// Computed styles only mean anything in a real browser: jsdom does not resolve
// defaults or cascade the way a browser does.
describe.skipIf(isJsdom())('Slider generated slots', () => {
  const { render } = createRenderer();

  function computed(selector, props, styleOverrides) {
    const theme = createTheme({ components: { MuiSlider: { styleOverrides } } });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Slider defaultValue={30} {...props} />
      </ThemeProvider>,
    );
    return window.getComputedStyle(container.querySelector(selector));
  }

  describe('styleOverrides', () => {
    it('applies a slot key', () => {
      const style = computed(`.${sliderClasses.thumb}`, {}, { thumb: { width: '30px' } });
      expect(style.width).toBe('30px');
    });

    it('applies a modifier key when the class is present', () => {
      const style = computed(
        `.${sliderClasses.root}`,
        { orientation: 'vertical' },
        { vertical: { opacity: '0.4' } },
      );
      expect(style.opacity).toBe('0.4');
    });

    it('does not apply a modifier key when the class is absent', () => {
      const style = computed(
        `.${sliderClasses.root}`,
        { orientation: 'horizontal' },
        { vertical: { opacity: '0.4' } },
      );
      expect(style.opacity).toBe('1');
    });

    it('applies a size modifier key', () => {
      const style = computed(
        `.${sliderClasses.root}`,
        { size: 'small' },
        { sizeSmall: { opacity: '0.3' } },
      );
      expect(style.opacity).toBe('0.3');
    });

    it('applies a colour modifier key', () => {
      const style = computed(
        `.${sliderClasses.root}`,
        { color: 'secondary' },
        { colorSecondary: { opacity: '0.6' } },
      );
      expect(style.opacity).toBe('0.6');
    });

    it('applies a per-item modifier key only to the items carrying the class', () => {
      const theme = createTheme({
        components: {
          MuiSlider: {
            styleOverrides: { mark: { width: '4px' }, markActive: { opacity: '0.25' } },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Slider defaultValue={60} marks={MARKS} />
        </ThemeProvider>,
      );

      const marks = Array.from(container.querySelectorAll(`.${sliderClasses.mark}`));
      expect(marks.length).toBeGreaterThan(1);

      marks.forEach((mark) => {
        const style = window.getComputedStyle(mark);
        // The slot key applies to every mark.
        expect(style.width).toBe('4px');
        // The modifier key only where the class landed.
        const isActive = mark.classList.contains(sliderClasses.markActive);
        expect(style.opacity).toBe(isActive ? '0.25' : '1');
      });
    });

    it('applies markLabelActive, which SliderMarkLabel had no resolver for', () => {
      // Before the split `SliderMarkLabel` had no `overridesResolver`, so it fell
      // back to the default and this override was silently ignored.
      const style = computed(
        `.${sliderClasses.markLabelActive}`,
        { marks: MARKS, value: 60 },
        { markLabelActive: { fontWeight: '700' } },
      );
      expect(style.fontWeight).toBe('700');
    });
  });

  describe('sx', () => {
    it('applies on the root', () => {
      const { container } = render(<Slider defaultValue={30} sx={{ opacity: 0.7 }} />);
      const style = window.getComputedStyle(container.querySelector(`.${sliderClasses.root}`));
      expect(style.opacity).toBe('0.7');
    });

    it('applies on a slot through slotProps', () => {
      const { container } = render(
        <Slider defaultValue={30} slotProps={{ thumb: { sx: { width: 28 } } }} />,
      );
      const style = window.getComputedStyle(container.querySelector(`.${sliderClasses.thumb}`));
      expect(style.width).toBe('28px');
    });
  });
});
