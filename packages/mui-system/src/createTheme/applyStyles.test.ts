import { expect } from 'chai';
import applyStyles from './applyStyles';

describe('applyStyles', () => {
  it('should apply styles for media prefers-color-scheme', () => {
    const theme = {
      vars: {},
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
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme="${colorScheme}"] &`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme="light"]) &': styles,
    });
  });
});
