import React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { useTheme } from '@material-ui/styles';
import { ThemeContext } from '@material-ui/styled-engine';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const render = createClientRender();

  it('should provide the theme to the mui theme context', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return <span ref={ref}>{theme.foo}</span>;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(text()).to.equal('foo');
  });

  it('should provide the theme to the styled engine theme context', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = React.useContext(ThemeContext);

      return <span ref={ref}>{theme.foo}</span>;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(text()).to.equal('foo');
  });
});
