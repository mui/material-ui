import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import useTheme from '../useTheme';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const render = createClientRender();

  it('should provide the theme', () => {
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

  it('should merge the themes', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return (
        <span ref={ref}>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }

    render(
      <ThemeProvider theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(text()).to.equal('foobar');
  });

  it('should memoize the merged output', () => {
    const themes = [];

    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();
      React.useEffect(() => {
        themes.push(theme);
      });

      return (
        <span ref={ref}>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }
    const MemoTest = React.memo(Test);

    const outerTheme = { bar: 'bar' };
    const innerTheme = { foo: 'foo' };

    function Container() {
      return (
        <ThemeProvider theme={outerTheme}>
          <ThemeProvider theme={innerTheme}>
            <MemoTest />
          </ThemeProvider>
        </ThemeProvider>
      );
    }

    const { setProps } = render(<Container />);
    expect(text()).to.equal('foobar');
    setProps({});
    expect(text()).to.equal('foobar');
    expect(themes).to.have.length(1);
  });

  describe('warnings', () => {
    it('should warn about missing provider', () => {
      expect(() => {
        render(
          <ThemeProvider theme={(theme) => theme}>
            <div />
          </ThemeProvider>,
        );
      }).toErrorDev([
        'However, no outer theme is present.',
        React.version.startsWith('16') &&
          // strict mode renders twice
          'However, no outer theme is present.',
      ]);
    });

    it('should warn about wrong theme function', () => {
      expect(() => {
        render(
          <ThemeProvider theme={{ bar: 'bar' }}>
            <ThemeProvider theme={() => {}}>
              <div />
            </ThemeProvider>
            ,
          </ThemeProvider>,
        );
      }).toErrorDev([
        'Material-UI: You should return an object from your theme function',
        React.version.startsWith('16') &&
          // strict mode renders twice
          'Material-UI: You should return an object from your theme function',
      ]);
    });
  });
});
