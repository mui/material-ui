import { expect } from 'chai';
import prepareCssVars from './prepareCssVars';

describe('prepareCssVars', () => {
  it('`generateCssVars` should always return a new object', () => {
    const result = prepareCssVars({
      colorSchemes: {
        dark: {
          color: 'red',
        },
      },
    });

    const { css: css1 } = result.generateCssVars('dark');
    const { css: css2 } = result.generateCssVars('dark');

    expect(css1).to.not.equal(css2);
  });

  it('delete css fields should not affect the next call', () => {
    const result = prepareCssVars({
      colorSchemes: {
        dark: {
          color: 'red',
        },
      },
    });

    const { css: css1 } = result.generateCssVars('dark');

    delete css1['--color'];

    expect(css1).to.deep.equal({});

    const { css: css2 } = result.generateCssVars('dark');

    expect(css2).to.deep.equal({ '--color': 'red' });
  });

  it('`generateStyleSheets` should have the right sequence', () => {
    const result = prepareCssVars({
      defaultColorScheme: 'dark',
      colorSchemes: {
        dark: {
          color: 'red',
        },
        light: {
          color: 'green',
        },
      },
      fontSize: {
        base: '1rem',
      },
    });

    const stylesheets = result.generateStyleSheets();
    expect(stylesheets).to.deep.equal([
      { ':root': { '--fontSize-base': '1rem' } },
      { '.dark': { '--color': 'red' } },
      { '.light': { '--color': 'green' } },
    ]);
  });

  it('`generateStyleSheets` respect the `getSelector` input', () => {
    const result = prepareCssVars(
      {
        defaultColorScheme: 'dark',
        colorSchemes: {
          dark: {
            color: 'red',
            background: '#000',
          },
          light: {
            color: 'green',
            background: '#fff',
          },
        },
        fontSize: {
          base: '1rem',
        },
      },
      {
        prefix: 'mui',
        getSelector: (colorScheme, css) => {
          if (colorScheme === 'dark') {
            const exclusion: Record<string, any> = {};
            Object.keys(css).forEach((key) => {
              if (key.endsWith('background')) {
                exclusion[key] = css[key];
                delete css[key];
              }
            });
            return {
              '.dark': exclusion,
              '.root, .dark': css,
            };
          }
          if (colorScheme) {
            return `.${colorScheme}`;
          }
          return '.root';
        },
      },
    );

    const stylesheets = result.generateStyleSheets();
    expect(stylesheets).to.deep.equal([
      { '.root': { '--mui-fontSize-base': '1rem' } },
      { '.dark': { '--mui-background': '#000' }, '.root, .dark': { '--mui-color': 'red' } },
      { '.light': { '--mui-color': 'green', '--mui-background': '#fff' } },
    ]);
  });
});
