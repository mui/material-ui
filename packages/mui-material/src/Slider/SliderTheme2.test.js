/**
 * Checks that an alternative theme can dress the unstyled Slider using nothing
 * but its stable class names.
 *
 * This loads the real `theme2` stylesheet (the same file the docs experiment
 * links to), injects it, and renders the unstyled Slider with no theme provider
 * and no styling engine. If the class names are a good enough description of
 * the component, every one of these assertions holds.
 */
import * as React from 'react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import theme2Css from 'docs/public/static/slider-theme2.css?raw';
import SliderUnstyled from './unstyled/SliderUnstyled';
import sliderClasses from './sliderClasses';

const MARKS = [
  { value: 0, label: '0' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

describe.skipIf(isJsdom())('Slider with theme2', () => {
  const { render } = createRenderer();
  let styleElement;

  beforeAll(() => {
    styleElement = document.createElement('style');
    styleElement.textContent = theme2Css;
    document.head.appendChild(styleElement);
  });

  afterAll(() => {
    styleElement.remove();
  });

  function styleOf(selector, props) {
    const { container } = render(<SliderUnstyled defaultValue={40} {...props} />);
    return window.getComputedStyle(container.querySelector(selector));
  }

  it('styles the rail as the groove', () => {
    const style = styleOf(`.${sliderClasses.rail}`, {});
    expect(style.backgroundColor).toBe('rgb(233, 232, 236)');
    expect(style.position).toBe('absolute');
  });

  it('styles the thumb as a circle with the theme size', () => {
    const style = styleOf(`.${sliderClasses.thumb}`, {});
    expect(style.borderRadius).toBe('50%');
    expect(style.width).toBe('20px');
    expect(style.height).toBe('20px');
  });

  it('reacts to the size class', () => {
    const style = styleOf(`.${sliderClasses.thumb}`, { size: 'small' });
    expect(style.width).toBe('14px');
  });

  it('gives the track a gradient rather than a flat colour', () => {
    const style = styleOf(`.${sliderClasses.track}`, {});
    expect(style.backgroundImage).toContain('linear-gradient');
  });

  it('reacts to the colour class', () => {
    const fill = (props) =>
      styleOf(`.${sliderClasses.root}`, props).getPropertyValue('--theme2-fill-from').trim();

    const primary = fill({});
    expect(fill({ color: 'success' })).not.toBe(primary);
    expect(fill({ color: 'error' })).not.toBe(primary);
    expect(fill({ color: 'secondary' })).not.toBe(primary);
  });

  it('greys out a disabled slider whatever colour it was given', () => {
    // `Mui-disabled` and the colour classes weigh the same, so this only works
    // because the disabled rule comes after them in the stylesheet.
    const fill = (props) =>
      styleOf(`.${sliderClasses.root}`, props).getPropertyValue('--theme2-fill-from').trim();

    expect(fill({ color: 'success', disabled: true })).toBe(fill({ disabled: true }));
    expect(fill({ color: 'success', disabled: true })).not.toBe(fill({ color: 'success' }));
  });

  it('reacts to the orientation class', () => {
    const vertical = styleOf(`.${sliderClasses.root}`, { orientation: 'vertical' });
    expect(vertical.width).toBe('6px');

    const horizontal = styleOf(`.${sliderClasses.root}`, {});
    expect(horizontal.height).toBe('6px');
  });

  it('reacts to the disabled class', () => {
    const style = styleOf(`.${sliderClasses.root}`, { disabled: true });
    expect(style.cursor).toBe('not-allowed');
  });

  it('reacts to the trackFalse class', () => {
    const style = styleOf(`.${sliderClasses.track}`, { track: false });
    expect(style.display).toBe('none');
  });

  it('distinguishes active mark labels', () => {
    const { container } = render(<SliderUnstyled defaultValue={60} marks={MARKS} step={50} />);
    const labels = Array.from(container.querySelectorAll(`.${sliderClasses.markLabel}`));
    expect(labels.length).toBeGreaterThan(1);

    const colours = labels.map((label) => {
      const isActive = label.classList.contains(sliderClasses.markLabelActive);
      return `${isActive}:${window.getComputedStyle(label).color}`;
    });
    // Active and inactive labels must not end up the same colour.
    const active = colours.filter((c) => c.startsWith('true'))[0];
    const inactive = colours.filter((c) => c.startsWith('false'))[0];
    expect(active.split(':')[1]).not.toBe(inactive.split(':')[1]);
  });

  it('switches colour scheme from an attribute on the root element', () => {
    // What the toggle on the experiment page drives.
    const light = styleOf(`.${sliderClasses.rail}`, {}).backgroundColor;

    document.documentElement.dataset.theme2 = 'dark';
    try {
      const dark = styleOf(`.${sliderClasses.rail}`, {}).backgroundColor;
      expect(dark).not.toBe(light);
    } finally {
      delete document.documentElement.dataset.theme2;
    }
  });

  it('shows the value label only when open', () => {
    const open = styleOf(`.${sliderClasses.valueLabel}`, { valueLabelDisplay: 'on' });
    expect(open.opacity).toBe('1');

    const closed = styleOf(`.${sliderClasses.valueLabel}`, { valueLabelDisplay: 'auto' });
    expect(closed.opacity).toBe('0');
  });
});
