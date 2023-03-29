import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { useTheme } from '@mui/private-theming';
import { ThemeContext } from '@mui/styled-engine';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const { render } = createRenderer();

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

    expect(theme).to.include({ foo: 'foo' });
  });

  it('should provide the theme to the styled engine theme context', () => {
    let theme;

    function Test() {
      theme = React.useContext(ThemeContext);

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(theme).to.include({ foo: 'foo' });
  });

  it('merge theme by default', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({ foo: 'foo', bar: 'bar', [Symbol.for('mui.nested')]: true });
  });

  it('use provided theme from a callback', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={(upperTheme) => ({ bar: upperTheme })}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({
      bar: { foo: 'foo', [Symbol.for('mui.nested')]: false },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: theme should not change', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({ mui: { foo: 'foo' }, [Symbol.for('mui.nested')]: false });
  });

  it('theme scope: nested below general theme', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({
      foo: 'foo',
      mui: { bar: 'bar' },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: respect callback and merge theme', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: order should not matter', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: multiple identifiers', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }

    let theme2;

    function Test2() {
      theme2 = useTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider identifier="joy" theme={{ foo: 'foo' }}>
          <Test />
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <ThemeProvider identifier="joy" theme={(upperTheme) => ({ baz: upperTheme })}>
              <Test2 />
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({
      mui: { bar: 'bar' },
      joy: { foo: 'foo' },
      [Symbol.for('mui.nested')]: true,
    });
    expect(theme2).to.deep.equal({
      mui: { baz: { bar: 'bar' } },
      joy: { baz: { foo: 'foo' } },
      [Symbol.for('mui.nested')]: true,
    });
  });
});
