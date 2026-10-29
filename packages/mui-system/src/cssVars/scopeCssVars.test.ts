import { describe, it, expect } from 'vitest';
import { createScopedStyleSheets, getColorSchemeProps } from './scopeCssVars';

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
      createScopedStyleSheets({ css: upper, upper, colorSchemeSelector: 'class', prefix: 'mui' }),
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
      colorSchemeSelector: 'class',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.className).to.match(/^mui-theme-[a-z0-9]+$/);
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-primary': 'red' } },
      { [`.dark ${scope}, ${scope}.dark`]: { '--mui-primary': 'pink' } },
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
      colorSchemeSelector: 'class',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: { '--mui-primary': 'red' } },
      { [`.dark ${scope}, ${scope}.dark`]: { '--mui-primary': 'lightblue' } },
    ]);
  });

  it('writes a single color scheme in full, whatever the outer color scheme is', () => {
    const result = createScopedStyleSheets({
      css: { root: upper.root, colorSchemes: [upper.colorSchemes[1]] },
      upper,
      colorSchemeSelector: 'class',
      prefix: 'mui',
    })!;
    expect(result.styles).to.deep.equal([{ [`.${result.className}`]: upper.colorSchemes[1][1] }]);
  });

  it('uses media queries with the media selector', () => {
    const result = createScopedStyleSheets({
      css: upper,
      colorSchemeSelector: 'media',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles).to.deep.equal([
      { [scope]: upper.root },
      { [scope]: upper.colorSchemes[0][1] },
      { '@media (prefers-color-scheme: dark)': { [scope]: upper.colorSchemes[1][1] } },
    ]);
  });

  it('puts the color scheme rule on the scoped element when it is not nested', () => {
    const result = createScopedStyleSheets({
      css: upper,
      colorSchemeSelector: 'data-mui-color-scheme',
      prefix: 'mui',
    })!;
    const scope = `.${result.className}`;
    expect(result.styles[2]).to.deep.equal({
      [`${scope}[data-mui-color-scheme="dark"]`]: upper.colorSchemes[1][1],
    });
  });

  it('gives the same class name to the same declarations', () => {
    const options = { css: upper, colorSchemeSelector: 'class', prefix: 'mui' };
    expect(createScopedStyleSheets(options)!.className).to.equal(
      createScopedStyleSheets({ ...options, css: structuredClone(upper) })!.className,
    );
  });
});

describe('getColorSchemeProps', () => {
  it('returns the class or attribute of a color scheme', () => {
    expect(getColorSchemeProps('class', 'dark')).to.deep.equal({ className: 'dark' });
    expect(getColorSchemeProps('data', 'dark')).to.deep.equal({ 'data-dark': '' });
    expect(getColorSchemeProps('data-mui-color-scheme', 'dark')).to.deep.equal({
      'data-mui-color-scheme': 'dark',
    });
    expect(getColorSchemeProps('media', 'dark')).to.deep.equal({});
    expect(getColorSchemeProps('class', undefined)).to.deep.equal({});
  });
});
