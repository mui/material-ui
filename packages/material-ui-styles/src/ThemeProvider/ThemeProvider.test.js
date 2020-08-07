import React from 'react';
import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender } from 'test/utils/createClientRender';
import makeStyles from '../makeStyles';
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

  it('does not allow setting mui.nested manually', () => {
    if (typeof Symbol === 'undefined') {
      // skip in IE11
      return;
    }

    const useStyles = makeStyles({ root: {} }, { name: 'MuiTest' });
    function Component(props) {
      const classes = useStyles();

      return (
        <div {...props} className={classes.root}>
          Component
        </div>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider theme={{ [Symbol.for('mui.nested')]: true }}>
        <Component data-testid="global" />
        <ThemeProvider theme={{}}>
          <Component data-testid="nested" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getByTestId('global')).to.have.class('MuiTest-root');
    expect(getByTestId('nested')).not.to.have.class('MuiTest-root');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn about missing provider', () => {
      render(
        <ThemeProvider theme={(theme) => theme}>
          <div />
        </ThemeProvider>,
      );
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.messages()[0]).to.include('However, no outer theme is present.');
    });

    it('should warn about wrong theme function', () => {
      render(
        <ThemeProvider theme={{ bar: 'bar' }}>
          <ThemeProvider theme={() => {}}>
            <div />
          </ThemeProvider>
          ,
        </ThemeProvider>,
      );
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: You should return an object from your theme function',
      );
    });
  });
});
