import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { useTheme } from '@material-ui/core/styles';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const render = createClientRender();

  it('should provide the theme to the mui theme context', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({ foo: 'foo' });
  });
});
