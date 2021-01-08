import React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import ThemeProvider from '../styles/ThemeProvider';
import createMuiTheme from '../styles/createMuiTheme';
import Global from './Global';

const customTheme = createMuiTheme({
  spacing: 10,
});

describe('Global', () => {
  const render = createClientRender();

  it('should provide default theme', function () {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const { container } = render(
      <div>
        <Global styles={theme => `span { margin-top: ${theme.spacing(1)}; }`} />
        <span>Text</span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      marginTop: '8px',
    });
  });

  it('should respect context theme if available', function () {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const { container } = render(
      <ThemeProvider theme={customTheme}>
        <Global styles={theme => `span { margin-top: ${theme.spacing(1)}; }`} />
        <span>Text</span>
      </ThemeProvider>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      marginTop: '10px',
    });
  });
});
