import * as React from 'react';
import { expect } from 'chai';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Box from '@material-ui/core/Box';

describe('<Box />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<Box />, () => ({
    render,
    mount,
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

    const theme = createTheme({
      palette: {
        primary: {
          main: 'rgb(255, 0, 0)',
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box color="primary.main" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
});
