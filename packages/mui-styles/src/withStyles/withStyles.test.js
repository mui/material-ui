import { expect } from 'chai';
import * as React from 'react';
import PropTypes from 'prop-types';
import { stub } from 'sinon';
import { SheetsRegistry } from 'jss';
import Input from '@mui/material/Input';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { isMuiElement } from '@mui/material/utils';
import { createTheme } from '@mui/material/styles';
import { unstable_nested } from '@mui/private-theming';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';
import ThemeProvider from '../ThemeProvider';
import withStyles from './withStyles';

describe('withStyles', () => {
  // StrictModeViolation: uses makeStyles
  const { render } = createRenderer({ strict: false });

  it('hoist statics', () => {
    function Test() {
      return null;
    }
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    expect(TestWithStyles.someStatic).to.equal(Test.someStatic);
  });

  it('hoists mui internals', () => {
    expect(isMuiElement(<Input />, ['Input'])).to.equal(true);
    // the imported Input is decorated with @mui/material/styles
    const StyledInput = withStyles({})(Input);

    expect(isMuiElement(<StyledInput />, ['Input'])).to.equal(true);
  });

  describe('refs', () => {
    it('forwards ref to class components', () => {
      // eslint-disable-next-line react/prefer-stateless-function
      class TargetComponent extends React.Component {
        render() {
          return null;
        }
      }
      const StyledTarget = withStyles({})(TargetComponent);
      const ref = React.createRef();

      render(<StyledTarget ref={ref} />);

      expect(ref.current).to.be.instanceof(TargetComponent);
    });

    it('forwards refs to React.forwardRef types', () => {
      const StyledTarget = withStyles({})(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );
      const ref = React.createRef();

      render(<StyledTarget ref={ref} />);

      expect(ref.current.nodeName).to.equal('DIV');
    });
  });

  it('should forward the props', () => {
    function Test(props) {
      return <div>{props.foo}</div>;
    }
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({})(Test);

    const { container } = render(<StyledComponent foo="bar" />);

    expect(container).to.have.text('bar');
  });

  it('should work with no theme', () => {
    function Test(props) {
      return <div>{props.foo}</div>;
    }
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({}, { name: 'Foo' })(Test);

    const { container } = render(<StyledComponent foo="bar" />);

    expect(container).to.have.text('bar');
  });

  describe('integration', () => {
    it('should run lifecycles with no theme', () => {
      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles)(function Empty() {
        return <div />;
      });
      const generateClassName = createGenerateClassName();
      const sheetsRegistry = new SheetsRegistry();

      const { setProps, unmount } = render(
        <ThemeProvider theme={createTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-1' });

      setProps({});

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-1' });

      setProps({ theme: createTheme() });

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-2' });

      unmount();

      expect(sheetsRegistry.registry.length).to.equal(0);
    });

    it('should supply correct props to jss callbacks', () => {
      function MyComp() {
        return <div />;
      }
      MyComp.defaultProps = {
        myDefaultProp: 111,
      };

      const jssCallbackStub = stub().returns({});
      const styles = { root: jssCallbackStub };
      const StyledComponent = withStyles(styles)(MyComp);
      const renderCb = () => render(<StyledComponent mySuppliedProp={222} />);

      // React 18.3.0 started warning for deprecated defaultProps for function components
      if (React.version.startsWith('18.3')) {
        expect(renderCb).toErrorDev([
          'Warning: MyComp: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
        ]);
      } else {
        renderCb();
      }

      expect(jssCallbackStub.callCount).to.equal(1);
      expect(jssCallbackStub.args[0][0]).to.deep.equal({
        myDefaultProp: 111,
        mySuppliedProp: 222,
      });
    });

    it('should support theme.props', () => {
      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles, { name: 'MuiFoo' })(({ foo }) => foo);

      const { container } = render(
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiFoo: {
                defaultProps: {
                  foo: 'bar',
                },
              },
            },
          })}
        >
          <StyledComponent foo={undefined} />
        </ThemeProvider>,
      );

      expect(container).to.have.text('bar');
    });

    it('should use theme.props instead of defaultProps', () => {
      function MuiFoo({ foo }) {
        return foo;
      }

      MuiFoo.defaultProps = {
        foo: 'foo',
      };

      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles, { name: 'MuiFoo' })(MuiFoo);
      const renderCb = () =>
        render(
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiFoo: {
                  defaultProps: {
                    foo: 'bar',
                  },
                },
              },
            })}
          >
            <StyledComponent foo={undefined} />
          </ThemeProvider>,
        );

      // React 18.3.0 started warning for deprecated defaultProps for function components
      if (React.version.startsWith('18.3')) {
        expect(renderCb).toErrorDev([
          'Warning: MuiFoo: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
        ]);
      } else {
        renderCb();
      }

      expect(screen.getByText('bar')).not.to.equal(null);
    });

    it('should work when depending on a theme', () => {
      const styles = (theme) => ({ root: { padding: theme.spacing(1) } });
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(() => <div />);
      const generateClassName = createGenerateClassName();
      const sheetsRegistry = new SheetsRegistry();

      const { setProps } = render(
        <ThemeProvider theme={createTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });

      setProps({ theme: createTheme({ foo: 'bar' }) });

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });
    });

    it('should support the styleOverrides key inside components', () => {
      const styles = { root: { padding: 8 } };
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(() => <div />);
      const generateClassName = createGenerateClassName();
      const sheetsRegistry = new SheetsRegistry();

      render(
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiTextField: {
                styleOverrides: {
                  root: {
                    padding: 9,
                  },
                },
              },
            },
          })}
        >
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({ root: { padding: 9 } });
    });

    it('should support the variants key', () => {
      const styles = {};
      const StyledComponent = withStyles(styles, { name: 'MuiButton' })(() => <div />);
      const generateClassName = createGenerateClassName();
      const sheetsRegistry = new SheetsRegistry();

      render(
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiButton: {
                variants: [
                  {
                    props: { variant: 'test' },
                    style: { padding: 9 },
                  },
                  {
                    props: { variant: 'test', size: 'large' },
                    style: { fontSize: 20 },
                  },
                  {
                    props: { size: 'largest' },
                    style: { fontSize: 22 },
                  },
                ],
              },
            },
          })}
        >
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
        test: { padding: 9 },
        testSizeLarge: { fontSize: 20 },
        sizeLargest: { fontSize: 22 },
      });
    });

    describe('options: disableGeneration', () => {
      it('should not generate the styles', () => {
        const styles = { root: { display: 'flex' } };
        const StyledComponent = withStyles(styles)(({ classes }) => (
          <div className={classes.root} data-testid="component" />
        ));
        const sheetsRegistry = new SheetsRegistry();

        const { unmount } = render(
          <StylesProvider sheetsRegistry={sheetsRegistry} disableGeneration>
            <StyledComponent />
          </StylesProvider>,
        );

        expect(sheetsRegistry.registry.length).to.equal(0);
        expect(screen.getByTestId('component')).not.to.have.attribute('className');

        unmount();

        expect(sheetsRegistry.registry.length).to.equal(0);
      });
    });
  });

  describe('classname quality', () => {
    it('should use the displayName', () => {
      const sheetsRegistry = new SheetsRegistry();
      // Uglified
      const a = ({ classes }) => <div className={classes.root} data-testid="a" />;
      const StyledComponent1 = withStyles({ root: { padding: 1 } })(a);
      const fooo = ({ classes }) => <div className={classes.root} data-testid="fooo" />;
      const StyledComponent2 = withStyles({ root: { padding: 1 } })(fooo);
      function AppFrame({ classes }) {
        return <div className={classes.root} data-testid="AppFrame" />;
      }
      AppFrame.displayName = 'AppLayout';
      const StyledComponent3 = withStyles({ root: { padding: 1 } })(AppFrame);

      function generateClassName(rule, sheet) {
        return `name:${sheet.options.name},prefix:${sheet.options.classNamePrefix}`;
      }

      render(
        <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
          <StyledComponent1 />
          <StyledComponent2 />
          <StyledComponent3 />
        </StylesProvider>,
      );

      expect(screen.getByTestId('a')).to.have.class('name:undefined,prefix:a');
      expect(screen.getByTestId('fooo')).to.have.class('name:undefined,prefix:fooo');
      expect(screen.getByTestId('AppFrame')).to.have.class('name:AppLayout,prefix:AppLayout');
    });
  });

  it('should throw is the import is invalid', () => {
    expect(() => withStyles({})(undefined)).to.throw(
      'You are calling withStyles(styles)(Component) with an undefined component',
    );
  });

  describe('option: withTheme', () => {
    it('should inject the theme', () => {
      const styles = { root: { padding: 1 } };
      let propsTheme;
      const StyledComponent = withStyles(styles, { withTheme: true })((props) => {
        propsTheme = props.theme;
        return null;
      });
      const theme = { [unstable_nested]: false };
      render(
        <ThemeProvider theme={theme}>
          <StyledComponent />
        </ThemeProvider>,
      );
      expect(propsTheme).to.deep.equal(theme);
    });
  });
});
