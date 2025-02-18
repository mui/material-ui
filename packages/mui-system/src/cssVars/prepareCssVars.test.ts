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
});
