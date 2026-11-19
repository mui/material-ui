import { describe, it, expect } from 'vitest';
import {
  createColorSchemeSelectorGetter,
  createIsolatedStyleSheets,
  createScopedStyleSheets,
  getColorSchemeRule,
  getIsolatedColorSchemeRule,
} from './scopeCssVars';

const upper = {
  root: { '--mui-spacing': '8px' },
  colorSchemes: [
    ['light', { colorScheme: 'light', '--mui-primary': 'blue', '--mui-text': 'black' }],
    ['dark', { colorScheme: 'dark', '--mui-primary': 'lightblue', '--mui-text': 'white' }],
  ] as Array<[string, Record<string, string>]>,
};

describe('createScopedStyleSheets', () => {
  it('returns null when a nested theme has the same declarations', () => {
    expect(
      createScopedStyleSheets({ css: upper, upper, colorSchemeRule: '.%s &', prefix: 'mui' }),
    ).to.equal(null);
  });

  it('writes only the declarations that differ from the outer theme', () => {
    const result = createScopedStyleSheets({
      css: {
        root: { '--mui-spacing': '8px' },
        colorSchemes: [
          ['light', { colorScheme: 'light', '--mui-primary': 'red', '--mui-text': 'black' }],
          ['dark', { colorScheme: 'dark', '--mui-primary': 'pink', '--mui-text': 'white' }],
        ],
      },
      upper,
      colorSchemeRule: '.%s &',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.className).to.match(/^mui-theme-[a-z0-9]+$/);
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-primary': 'red' } },
      { [`.dark ${scope}`]: { '--mui-primary': 'pink' } },
    ]);
  });

  it('writes the default color scheme declarations again for the other color schemes', () => {
    // Only the light primary changes, but `.scope` applies in dark mode too.
    const result = createScopedStyleSheets({
      css: {
        root: upper.root,
        colorSchemes: [
          ['light', { ...upper.colorSchemes[0][1], '--mui-primary': 'red' }],
          upper.colorSchemes[1],
        ],
      },
      upper,
      colorSchemeRule: '.%s &',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-primary': 'red' } },
      { [`.dark ${scope}`]: { '--mui-primary': 'lightblue' } },
    ]);
  });

  it('writes a single color scheme in full, whatever the outer color scheme is', () => {
    const result = createScopedStyleSheets({
      css: { root: upper.root, colorSchemes: [upper.colorSchemes[1]] },
      upper,
      colorSchemeRule: '.%s &',
      prefix: 'mui',
    })!;
    expect(result.styles).to.deep.equal([{ [`.${result.className}`]: upper.colorSchemes[1][1] }]);
  });

  it('writes every declaration of a theme with another prefix', () => {
    const result = createScopedStyleSheets({
      css: upper,
      upper: { root: {}, colorSchemes: [] },
      colorSchemeRule: '.%s &',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: upper.root },
      { [scope]: upper.colorSchemes[0][1] },
      { [`.dark ${scope}`]: upper.colorSchemes[1][1] },
    ]);
  });

  it('only writes the default color scheme when the outer theme has no color scheme rule', () => {
    const result = createScopedStyleSheets({
      css: upper,
      upper: { root: upper.root, colorSchemes: [['light', { colorScheme: 'light' }]] },
      colorSchemeRule: undefined,
      prefix: 'mui',
    })!;
    expect(result.styles).to.deep.equal([
      { [`.${result.className}`]: { '--mui-primary': 'blue', '--mui-text': 'black' } },
    ]);
  });

  it('uses media queries with the media rule', () => {
    const result = createScopedStyleSheets({
      css: {
        root: upper.root,
        colorSchemes: [
          ['light', { ...upper.colorSchemes[0][1], '--mui-primary': 'red' }],
          ['dark', { ...upper.colorSchemes[1][1], '--mui-primary': 'pink' }],
        ],
      },
      upper,
      colorSchemeRule: 'media',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-primary': 'red' } },
      { '@media (prefers-color-scheme: dark)': { [scope]: { '--mui-primary': 'pink' } } },
    ]);
  });

  it('follows the marker of an isolated provider', () => {
    const result = createScopedStyleSheets({
      css: {
        root: upper.root,
        colorSchemes: [
          ['light', { ...upper.colorSchemes[0][1], '--mui-primary': 'red' }],
          ['dark', { ...upper.colorSchemes[1][1], '--mui-primary': 'pink' }],
        ],
      },
      upper,
      colorSchemeRule: getIsolatedColorSchemeRule(':r1:'),
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    const marker = '[data-mui-isolated=":r1:"][data-mui-scheme="dark"]';
    expect(result.styles[1]).to.deep.equal({
      [`${scope}:where(${marker}, ${marker} *)`]: { '--mui-primary': 'pink' },
    });
  });

  it('writes the declarations that reference a changed one, transitively', () => {
    const outer = {
      root: { '--mui-shadow': '0 0 4px var(--mui-primary)', '--mui-radius': '4px' },
      colorSchemes: [
        [
          'light',
          {
            '--mui-primary': 'blue',
            '--mui-button': 'var(--mui-primary)',
            '--mui-link': 'var( --mui-button, red)',
            '--mui-text': 'black',
          },
        ],
        [
          'dark',
          {
            '--mui-primary': 'lightblue',
            '--mui-button': 'var(--mui-primary)',
            '--mui-link': 'var(--mui-text)',
            '--mui-text': 'white',
          },
        ],
      ] as Array<[string, Record<string, string>]>,
    };
    const result = createScopedStyleSheets({
      css: {
        root: outer.root,
        colorSchemes: [
          ['light', { ...outer.colorSchemes[0][1], '--mui-primary': 'red' }],
          outer.colorSchemes[1],
        ],
      },
      upper: outer,
      colorSchemeRule: '.%s &',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-shadow': '0 0 4px var(--mui-primary)' } },
      {
        [scope]: {
          '--mui-primary': 'red',
          '--mui-button': 'var(--mui-primary)',
          '--mui-link': 'var( --mui-button, red)',
        },
      },
      {
        [`.dark ${scope}`]: {
          '--mui-primary': 'lightblue',
          '--mui-button': 'var(--mui-primary)',
          '--mui-link': 'var(--mui-text)',
        },
      },
    ]);
  });

  it('gives the same class name to the same declarations and rule', () => {
    const css = {
      root: upper.root,
      colorSchemes: [['light', { '--mui-primary': 'red' }], upper.colorSchemes[1]] as Array<
        [string, Record<string, string>]
      >,
    };
    const options = { css, upper, colorSchemeRule: '.%s &', prefix: 'mui' };
    const { className } = createScopedStyleSheets(options)!;
    expect(createScopedStyleSheets({ ...options, css: structuredClone(css) })!.className).to.equal(
      className,
    );
    expect(
      createScopedStyleSheets({ ...options, colorSchemeRule: '[data-%s] &' })!.className,
    ).not.to.equal(className);
  });
});

describe('createIsolatedStyleSheets', () => {
  it('writes every declaration and follows the marker on the element', () => {
    const result = createIsolatedStyleSheets({
      css: upper,
      prefix: 'mui',
      lightColorScheme: 'light',
      darkColorScheme: 'dark',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: upper.root },
      { [scope]: upper.colorSchemes[0][1] },
      { [`${scope}[data-mui-scheme="dark"]`]: upper.colorSchemes[1][1] },
      {
        '@media (prefers-color-scheme: dark)': {
          [`${scope}:not([data-mui-scheme])`]: upper.colorSchemes[1][1],
        },
      },
    ]);
  });

  it('writes a single color scheme without any rule', () => {
    const result = createIsolatedStyleSheets({
      css: { root: upper.root, colorSchemes: [upper.colorSchemes[1]] },
      prefix: 'mui',
      lightColorScheme: 'light',
      darkColorScheme: 'dark',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: upper.root },
      { [scope]: upper.colorSchemes[1][1] },
    ]);
  });
});

describe('getColorSchemeRule', () => {
  it('turns the color scheme selector into a rule', () => {
    expect(getColorSchemeRule('class')).to.equal('.%s &');
    expect(getColorSchemeRule('data')).to.equal('[data-%s] &');
    expect(getColorSchemeRule('data-mui-color-scheme')).to.equal('[data-mui-color-scheme="%s"] &');
    expect(getColorSchemeRule('.mode-%s')).to.equal('.mode-%s &');
    expect(getColorSchemeRule('media')).to.equal('media');
    expect(getColorSchemeRule(undefined)).to.equal(undefined);
  });
});

describe('createColorSchemeSelectorGetter', () => {
  it('returns the selector of a color scheme', () => {
    expect(createColorSchemeSelectorGetter('.%s &')('dark')).to.equal('.dark &');
    expect(createColorSchemeSelectorGetter('media')('dark')).to.equal(
      '@media (prefers-color-scheme: dark)',
    );
    expect(createColorSchemeSelectorGetter(undefined)('dark')).to.equal('&');
    expect(createColorSchemeSelectorGetter(getIsolatedColorSchemeRule('a"b'))('dark')).to.equal(
      '&:where([data-mui-isolated="a\\"b"][data-mui-scheme="dark"], [data-mui-isolated="a\\"b"][data-mui-scheme="dark"] *)',
    );
  });
});
