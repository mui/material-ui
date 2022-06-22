import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/joy/className';
import Box from '@mui/joy/Box';

describe('Joy <Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    render,
    ThemeProvider,
    inheritComponent: 'div',
    skip: [
      'componentProp',
      'componentsProp',
      'rootClass',
      'themeVariants',
      'themeStyleOverrides',
      'themeDefaultProps',
    ],
    refInstanceof: window.HTMLDivElement,
  }));

  it('respects theme from context', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const { container } = render(
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: 'rgb(255, 0, 0)',
            },
          },
        }}
      >
        <Box color="primary.main" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  describe('ClassNameGenerator', () => {
    afterEach(() => {
      ClassNameGenerator.reset();
    });

    it('get custom className', () => {
      const { container, rerender } = render(<Box />);
      expect(container.firstChild).to.have.class('JoyBox-root');

      ClassNameGenerator.configure((name) => name.replace('Joy', 'Company'));

      rerender(<Box />);

      expect(container.firstChild).to.have.class('CompanyBox-root');
    });
  });
});
