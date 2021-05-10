import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import { ThemeProvider, createTheme } from '@material-ui/core//styles/';

const customTheme = createTheme({
  spacing: 10,
});

describe('Global', () => {
  const render = createClientRender();

  it('should provide default theme', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const { container } = render(
      <div>
        <GlobalStyles styles={(theme) => `span { margin-top: ${theme.spacing(1)}; }`} />
        <span>Text</span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      marginTop: '8px',
    });
  });

  it('should respect context theme if available', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const { container } = render(
      <ThemeProvider theme={customTheme}>
        <GlobalStyles styles={(theme) => `span { margin-top: ${theme.spacing(1)}; }`} />
        <span>Text</span>
      </ThemeProvider>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      marginTop: '10px',
    });
  });
});
