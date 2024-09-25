import { expect } from 'chai';
import applyStyles from './applyStyles';

describe('applyStyles', () => {
  it('should apply styles for media prefers-color-scheme', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `@media (prefers-color-scheme: ${colorScheme})`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '@media (prefers-color-scheme: light)': styles,
    });
  });

  it('should apply styles for a class selector', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `.${colorScheme}`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where(.light) &': styles,
    });
  });

  it('should apply styles for a data attribute selector', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme-${colorScheme}]`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme-light]) &': styles,
    });
  });

  it('should apply styles for a data attribute selector with &', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme="${colorScheme}"] &`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme="light"]) &': styles,
    });
  });

  it('should not apply styles if colorScheme does not exist', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme="${colorScheme}"] &`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'dark', styles)).to.deep.equal({});
  });

  it('should return the styles directly if selector is &', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: () => {
        return '&';
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal(styles);
  });

  it('should exclude single other color scheme when defined', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true, dark: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `.${colorScheme}`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where(.light):not(:has(* .dark)) &': styles,
    });
  });

  it('should exclude multiple other color schemes when defined', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true, dark: true, contrast: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `.${colorScheme}`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where(.light):not(:has(* .dark, * .contrast)) &': styles,
    });
  });

  it('should exclude other themes when used with data selector', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true, dark: true, contrast: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme-${colorScheme}]`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme-light]):not(:has(* [data-color-scheme-dark], * [data-color-scheme-contrast])) &':
        styles,
    });
  });
});
