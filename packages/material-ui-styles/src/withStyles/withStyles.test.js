import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { Input } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { isMuiElement } from '@material-ui/core/utils';
import { createMuiTheme } from '@material-ui/core/styles';
// import consoleErrorMock from 'test/utils/consoleErrorMock';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';
import ThemeProvider from '../ThemeProvider';
import withStyles from './withStyles';

describe('withStyles', () => {
  let mount;
  let generateClassName;

  before(() => {
    // StrictModeViolation: uses makeStyles
    mount = createMount({ strict: false });
  });

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  after(() => {
    mount.cleanUp();
  });

  it('hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    assert.strictEqual(TestWithStyles.someStatic, Test.someStatic);
  });

  it('hoists mui internals', () => {
    assert.strictEqual(isMuiElement(<Input />, ['Input']), true);
    // the imported Input is decorated with @material-ui/core/styles
    const StyledInput = withStyles({})(Input);

    assert.strictEqual(isMuiElement(<StyledInput />, ['Input']), true);
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
      mount(
        <React.Fragment>
          <StyledTarget ref={ref} />
        </React.Fragment>,
      );
      assert.instanceOf(ref.current, TargetComponent);
    });

    it('forwards refs to React.forwardRef types', () => {
      const StyledTarget = withStyles({})(
        React.forwardRef((props, ref) => <div {...props} ref={ref} />),
      );

      const ref = React.createRef();
      mount(
        <React.Fragment>
          <StyledTarget ref={ref} />
        </React.Fragment>,
      );
      assert.strictEqual(ref.current.nodeName, 'DIV');
    });

    // describe('innerRef', () => {
    //   beforeEach(() => {
    //     consoleErrorMock.spy();
    //   });

    //   afterEach(() => {
    //     consoleErrorMock.reset();
    //     PropTypes.resetWarningCache();
    //   });

    //   it('is deprecated', () => {
    //     const ThemedDiv = withStyles({})('div');

    //     mount(
    //       <React.Fragment>
    //         <ThemedDiv innerRef={React.createRef()} />
    //       </React.Fragment>,
    //     );

    //     assert.strictEqual(consoleErrorMock.callCount(), 1);
    //     assert.include(
    //       consoleErrorMock.args()[0][0],
    //       'Warning: Failed prop type: Material-UI: the `innerRef` prop is deprecated',
    //     );
    //   });
    // });
  });

  it('should forward the properties', () => {
    const Test = props => <div>{props.foo}</div>;
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({})(Test);
    const wrapper = mount(<StyledComponent foo="bar" />);
    assert.strictEqual(wrapper.text(), 'bar');
  });

  it('should work with no theme', () => {
    const Test = props => <div>{props.foo}</div>;
    Test.propTypes = {
      foo: PropTypes.any,
    };
    const StyledComponent = withStyles({}, { name: 'Foo' })(Test);
    const wrapper = mount(<StyledComponent foo="bar" />);
    assert.strictEqual(wrapper.text(), 'bar');
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
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });

      wrapper.unmount();
      assert.strictEqual(sheetsRegistry.registry.length, 0);
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

      assert.strictEqual(wrapper.find(Empty).props().foo, 'bar');
      wrapper.unmount();
    });

    it('should work when depending on a theme', () => {
      const styles = theme => ({ root: { padding: theme.spacing(1) } });
      const StyledComponent = withStyles(styles, { name: 'MuiTextField' })(Empty);

      const wrapper = mount(
        <ThemeProvider theme={createMuiTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiTextField-root' });
      wrapper.setProps({ theme: createMuiTheme({ foo: 'bar' }) });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiTextField-root' });
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

      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, { root: { padding: 9 } });
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
        assert.strictEqual(sheetsRegistry.registry.length, 0);
        assert.deepEqual(wrapper.find(Empty).props().classes, {});
        wrapper.unmount();
        assert.strictEqual(sheetsRegistry.registry.length, 0);
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
      assert.strictEqual(sheetsRegistry.registry[0].options.classNamePrefix, 'a');
      assert.strictEqual(sheetsRegistry.registry[0].options.name, undefined);
      assert.strictEqual(sheetsRegistry.registry[1].options.classNamePrefix, 'fooo');
      assert.strictEqual(sheetsRegistry.registry[1].options.name, undefined);
      assert.strictEqual(sheetsRegistry.registry[2].options.classNamePrefix, 'AppLayout');
      assert.strictEqual(sheetsRegistry.registry[2].options.name, 'AppLayout');
    });
  });

  it('should throw is the import is invalid', () => {
    assert.throw(
      () => withStyles({})(undefined),
      'You are calling withStyles(styles)(Component) with an undefined component',
    );
  });

  describe('option: withTheme', () => {
    it('should inject the theme', () => {
      const styles = { root: { padding: 1 } };
      const StyledComponent = withStyles(styles, { withTheme: true })(props => (
        <option theme={props.theme} />
      ));
      const theme = {};
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledComponent />
        </ThemeProvider>,
      );
      assert.strictEqual(wrapper.find('option').props().theme, theme);
    });
  });
});
