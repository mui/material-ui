import { expect } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { stub } from 'sinon';
import { SheetsRegistry } from 'jss';
import { Input } from '@material-ui/core';
import createMount from 'test/utils/createMount';
import { isMuiElement } from '@material-ui/core/utils';
import { createMuiTheme } from '@material-ui/core/styles';
// import consoleErrorMock from 'test/utils/consoleErrorMock';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';
import ThemeProvider from '../ThemeProvider';
import withStyles from './withStyles';

describe('withStyles', () => {
  // StrictModeViolation: uses makeStyles
  const mount = createMount({ strict: false });
  let generateClassName;

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  it('hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    expect(TestWithStyles.someStatic).to.equal(Test.someStatic);
  });

  it('hoists mui internals', () => {
    expect(isMuiElement(<Input />, ['Input'])).to.equal(true);
    // the imported Input is decorated with @material-ui/core/styles
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
      mount(<StyledTarget ref={ref} />);
      expect(ref.current).to.be.instanceof(TargetComponent);
    });

    it('forwards refs to React.forwardRef types', () => {
      const StyledTarget = withStyles({})(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );

      const ref = React.createRef();
      mount(<StyledTarget ref={ref} />);
      expect(ref.current.nodeName).to.equal('DIV');
    });
  });

  it('should forward the props', () => {
    const Test = (props) => <div>{props.foo}</div>;
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({})(Test);
    const wrapper = mount(<StyledComponent foo="bar" />);
    expect(wrapper.text()).to.equal('bar');
  });

  it('should work with no theme', () => {
    const Test = (props) => <div>{props.foo}</div>;
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({}, { name: 'Foo' })(Test);
    const wrapper = mount(<StyledComponent foo="bar" />);
    expect(wrapper.text()).to.equal('bar');
  });

  describe('integration', () => {
    let sheetsRegistry;
    const Empty = () => <div />;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should run lifecycles with no theme', () => {
      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles)(Empty);
      const wrapper = mount(
        <ThemeProvider theme={createMuiTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-1' });
      wrapper.update();
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-1' });
      wrapper.setProps({ theme: createMuiTheme() });
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'Empty-root-2' });

      wrapper.unmount();
      expect(sheetsRegistry.registry.length).to.equal(0);
    });

    it('should supply correct props to jss callbacks', () => {
      const MyComp = () => <div />;
      MyComp.defaultProps = {
        myDefaultProp: 111,
      };

      const jssCallbackStub = stub().returns({});
      const styles = { root: jssCallbackStub };
      const StyledComponent = withStyles(styles)(MyComp);
      mount(<StyledComponent mySuppliedProp={222} />);

      expect(
        jssCallbackStub.calledWith({
          myDefaultProp: 111,
          mySuppliedProp: 222,
        }),
      ).to.equal(true);
    });

    it('should support theme.props', () => {
      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles, { name: 'MuiFoo' })(Empty);

      const wrapper = mount(
        <ThemeProvider
          theme={createMuiTheme({
            props: {
              MuiFoo: {
                foo: 'bar',
              },
            },
          })}
        >
          <StyledComponent foo={undefined} />
        </ThemeProvider>,
      );

      expect(wrapper.find(Empty).props().foo).to.equal('bar');
      wrapper.unmount();
    });

    it('should use theme.props instead of defaultProps', () => {
      const MuiFoo = () => <div />;
      MuiFoo.defaultProps = {
        foo: 'foo',
      };

      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles, { name: 'MuiFoo' })(MuiFoo);

      const wrapper = mount(
        <ThemeProvider
          theme={createMuiTheme({
            props: {
              MuiFoo: {
                foo: 'bar',
              },
            },
          })}
        >
          <StyledComponent foo={undefined} />
        </ThemeProvider>,
      );

      expect(wrapper.find(MuiFoo).props().foo).to.equal('bar');
      wrapper.unmount();
    });

    it('should work when depending on a theme', () => {
      const styles = (theme) => ({ root: { padding: theme.spacing(1) } });
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(Empty);

      const wrapper = mount(
        <ThemeProvider theme={createMuiTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });
      wrapper.setProps({ theme: createMuiTheme({ foo: 'bar' }) });
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'MuiTextField-root' });
    });

    it('should support the overrides key', () => {
      const styles = { root: { padding: 8 } };
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(Empty);

      mount(
        <ThemeProvider
          theme={createMuiTheme({
            overrides: {
              MuiTextField: {
                root: {
                  padding: 9,
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

    describe('options: disableGeneration', () => {
      it('should not generate the styles', () => {
        const styles = { root: { display: 'flex' } };
        const StyledComponent = withStyles(styles)(Empty);

        const wrapper = mount(
          <StylesProvider sheetsRegistry={sheetsRegistry} disableGeneration>
            <StyledComponent />
          </StylesProvider>,
        );
        expect(sheetsRegistry.registry.length).to.equal(0);
        expect(wrapper.find(Empty).props().classes).to.deep.equal({});
        wrapper.unmount();
        expect(sheetsRegistry.registry.length).to.equal(0);
      });
    });
  });

  describe('classname quality', () => {
    it('should use the displayName', () => {
      const sheetsRegistry = new SheetsRegistry();
      // Uglified
      const a = () => <div />;
      const StyledComponent1 = withStyles({ root: { padding: 1 } })(a);
      const fooo = () => <div />;
      const StyledComponent2 = withStyles({ root: { padding: 1 } })(fooo);
      const AppFrame = () => <div />;
      AppFrame.displayName = 'AppLayout';
      const StyledComponent3 = withStyles({ root: { padding: 1 } })(AppFrame);

      mount(
        <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
          <StyledComponent1 />
          <StyledComponent2 />
          <StyledComponent3 />
        </StylesProvider>,
      );
      expect(sheetsRegistry.registry[0].options.classNamePrefix).to.equal('a');
      expect(sheetsRegistry.registry[0].options.name).to.equal(undefined);
      expect(sheetsRegistry.registry[1].options.classNamePrefix).to.equal('fooo');
      expect(sheetsRegistry.registry[1].options.name).to.equal(undefined);
      expect(sheetsRegistry.registry[2].options.classNamePrefix).to.equal('AppLayout');
      expect(sheetsRegistry.registry[2].options.name).to.equal('AppLayout');
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
      const StyledComponent = withStyles(styles, { withTheme: true })((props) => (
        <option theme={props.theme}>themed</option>
      ));
      const theme = {};
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledComponent />
        </ThemeProvider>,
      );
      expect(wrapper.find('option').props().theme).to.equal(theme);
    });
  });
});
