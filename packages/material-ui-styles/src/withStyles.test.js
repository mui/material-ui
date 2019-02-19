import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { act } from 'react-dom/test-utils';
import { Input } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { isMuiElement } from '@material-ui/core/utils/reactHelpers';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import StylesProvider from './StylesProvider';
import ThemeProvider from './ThemeProvider';
import withStyles from './withStyles';

describe('withStyles', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('does not hoist statics', () => {
    const Test = () => null;
    Test.someStatic = 'will not get hoisted';
    const TestWithStyles = withStyles({})(Test);
    assert.strictEqual(TestWithStyles.someStatic, undefined);
  });

  it('hoists mui internals', () => {
    assert.strictEqual(isMuiElement(<Input />, ['Input']), true);

    // the imported Input is decorated with @material-ui/core/styles
    const StyledInput = withStyles({})(Input);

    assert.strictEqual(isMuiElement(<StyledInput />, ['Input']), true);
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
          <StylesProvider sheetsRegistry={sheetsRegistry}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-vy1bts' });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-vy1bts' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-vy1bts' });

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
          <StylesProvider sheetsRegistry={sheetsRegistry}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiTextField-root-tyxeaf' });
      act(() => {
        wrapper.setProps({ theme: createMuiTheme({ foo: 'bar' }) });
      });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiTextField-root-lu46bw' });
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
          <StylesProvider sheetsRegistry={sheetsRegistry}>
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

  // To fix for a new pull request
  // describe('HMR with same state', () => {
  //   it('should take the new stylesCreator into account', () => {
  //     const styles1 = { root: { padding: 1 } };
  //     const StyledComponent1 = withStyles(styles1, { name: 'MuiTextField' })(Empty);
  //     const wrapper = mount(<StyledComponent1 />);

  //     const styles2 = { root: { padding: 2 } };
  //     const StyledComponent2 = withStyles(styles2, { name: 'MuiTextField' })(Empty);

  //     // Simulate react-hot-loader behavior
  //     wrapper.instance().componentDidUpdate = StyledComponent2.prototype.componentDidUpdate;

  //     const classes1 = wrapper.childAt(0).props().classes.root;
  //     wrapper.setProps({});
  //     wrapper.update();
  //     const classes2 = wrapper.childAt(0).props().classes.root;

  //     assert.notStrictEqual(classes1, classes2, 'should generate new classes');
  //   });
  // });

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
        <StylesProvider sheetsRegistry={sheetsRegistry}>
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
