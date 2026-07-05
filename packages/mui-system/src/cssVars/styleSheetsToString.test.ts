import { expect } from 'chai';
import styleSheetsToString from './styleSheetsToString';

describe('styleSheetsToString', () => {
  it('returns an empty string for an empty array', () => {
    expect(styleSheetsToString([])).to.equal('');
  });

  it('returns an empty string when all sheets are empty objects', () => {
    expect(styleSheetsToString([{}, {}])).to.equal('');
  });

  it('skips a selector block whose vars object is empty', () => {
    const sheets = [{ ':root': {} }];
    expect(styleSheetsToString(sheets)).to.equal('');
  });

  it('serializes a single flat selector block', () => {
    const sheets = [{ ':root': { '--mui-spacing': '8px', '--mui-zIndex-modal': '1300' } }];
    expect(styleSheetsToString(sheets)).to.equal(
      ':root {\n  --mui-spacing: 8px;\n  --mui-zIndex-modal: 1300;\n}\n',
    );
  });

  it('serializes multiple separate sheets with the same selector without merging them', () => {
    // Sheet 0: spacing vars on :root
    // Sheet 1: palette vars also on :root (media mode, light default)
    // These must NOT be merged — order must be preserved.
    const sheets = [
      { ':root': { '--mui-spacing': '8px' } },
      { ':root': { '--mui-palette-primary-main': '#1976d2', 'color-scheme': 'light' } },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      ':root {\n  --mui-spacing: 8px;\n}\n' +
        ':root {\n  --mui-palette-primary-main: #1976d2;\n  color-scheme: light;\n}\n',
    );
  });

  it('serializes a two-key sheet (dark split block — data-* mode)', () => {
    // When colorSchemeSelector is 'data-mui-color-scheme' and dark is non-default,
    // generateStyleSheets emits one object with two keys for the dark scheme.
    const sheets = [
      {
        '[data-mui-color-scheme="dark"]': {
          '--mui-overlays-0': 'rgba(255,255,255,0.05)',
        },
        ':root, [data-mui-color-scheme="dark"]': {
          '--mui-palette-primary-main': '#90caf9',
          'color-scheme': 'dark',
        },
      },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      '[data-mui-color-scheme="dark"] {\n  --mui-overlays-0: rgba(255,255,255,0.05);\n}\n' +
        ':root, [data-mui-color-scheme="dark"] {\n  --mui-palette-primary-main: #90caf9;\n  color-scheme: dark;\n}\n',
    );
  });

  it('serializes a @media block (media mode)', () => {
    const sheets = [
      {
        '@media (prefers-color-scheme: dark)': {
          ':root': { '--mui-palette-primary-main': '#90caf9', 'color-scheme': 'dark' },
        },
      },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      '@media (prefers-color-scheme: dark) {\n' +
        '  :root {\n' +
        '    --mui-palette-primary-main: #90caf9;\n' +
        '    color-scheme: dark;\n' +
        '  }\n' +
        '}\n',
    );
  });

  it('serializes a sheet with both a flat :root key and a @media key (dark-default media mode)', () => {
    // When colorSchemeSelector='media' and defaultColorScheme='dark', Sheet 1 has
    // both ':root' (dark palette) and '@media (prefers-color-scheme: dark)' (excluded vars)
    // in the same sheet object.
    const sheets = [
      {
        ':root': { '--mui-palette-primary-main': '#90caf9', 'color-scheme': 'dark' },
        '@media (prefers-color-scheme: dark)': {
          ':root': { '--mui-overlays-0': 'rgba(255,255,255,0.05)' },
        },
      },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      ':root {\n  --mui-palette-primary-main: #90caf9;\n  color-scheme: dark;\n}\n' +
        '@media (prefers-color-scheme: dark) {\n' +
        '  :root {\n' +
        '    --mui-overlays-0: rgba(255,255,255,0.05);\n' +
        '  }\n' +
        '}\n',
    );
  });

  it('serializes class-based selectors', () => {
    const sheets = [
      { ':root, .light': { '--mui-palette-primary-main': '#1976d2' } },
      { '.dark': { '--mui-palette-primary-main': '#90caf9' } },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      ':root, .light {\n  --mui-palette-primary-main: #1976d2;\n}\n' +
        '.dark {\n  --mui-palette-primary-main: #90caf9;\n}\n',
    );
  });

  it('serializes a custom rootSelector (:host)', () => {
    const sheets = [
      { ':host': { '--mui-spacing': '8px' } },
      { ':host, .light': { '--mui-palette-primary-main': '#1976d2' } },
    ];
    const result = styleSheetsToString(sheets);
    expect(result).to.equal(
      ':host {\n  --mui-spacing: 8px;\n}\n' +
        ':host, .light {\n  --mui-palette-primary-main: #1976d2;\n}\n',
    );
  });
});
