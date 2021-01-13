import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import CssBaseline from './CssBaseline';
import ThemeProvider from '../styles/ThemeProvider';
import createMuiTheme from '../styles/createMuiTheme';

describe('<CssBaseline />', () => {
  // StrictModeViolation: makeStyles will retain the styles in the head in strict mode
  // which becomes an issue for global styles
  const render = createClientRender({ strict: false });

  it('renders its children', () => {
    const { container } = render(
      <CssBaseline>
        <div id="child" />
      </CssBaseline>,
    );

    const child = container.querySelector('#child');

    expect(child).to.have.tagName('div');
  });

  it('supports theme overrides', () => {
    const theme = createMuiTheme({
      components: { MuiCssBaseline: { styleOverrides: { div: { marginTop: '10px' } } } },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div id="child" />
        </CssBaseline>
      </ThemeProvider>,
    );

    const child = container.querySelector('#child');

    expect(child).toHaveComputedStyle({ marginTop: '10px' });
  });
});
