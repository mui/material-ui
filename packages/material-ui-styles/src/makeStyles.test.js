import { assert } from 'chai';
import React from 'react';
import { SheetsRegistry } from 'jss';
import { act } from 'react-dom/test-utils';
import { createMount } from '@material-ui/core/test-utils';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import makeStyles from './makeStyles';
import StylesProvider from './StylesProvider';
import ThemeProvider from './ThemeProvider';

describe('makeStyles', () => {
  let mount;

  /**
   * returns a function that given the props for the styles object will return
   * the css classes
   * @param {object} styles argument for `makeStyles`
   */
  function createGetClasses(styles) {
    const useStyles = makeStyles(styles);
    const output = {};

    function TestComponent(props) {
      output.classes = useStyles(props);
      return <div />;
    }

    return function mountWithProps(props) {
      const wrapper = mount(<TestComponent {...props} />);
      output.wrapper = wrapper;
      return output;
    };
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should accept a classes property', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const { classes: baseClasses } = mountWithProps();
    const { classes: extendedClasses } = mountWithProps({ classes: { root: 'h1' } });
    assert.strictEqual(extendedClasses.root, `${baseClasses.root} h1`);
  });

  it('should ignore undefined property', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const { classes: baseClasses } = mountWithProps();
    const { classes: extendedClasses } = mountWithProps({ classes: { root: undefined } });
    assert.strictEqual(extendedClasses.root, baseClasses.root);
  });

  describe('warnings', () => {
    const mountWithProps = createGetClasses({ root: {} });

    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn if providing a unknown key', () => {
      const { classes: baseClasses } = mountWithProps();
      const { classes: extendedClasses } = mountWithProps({ classes: { bar: 'foo' } });
      assert.deepEqual(extendedClasses, { root: baseClasses.root, bar: 'undefined foo' });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'Material-UI: the key `bar` provided to the classes property is not implemented',
      );
    });

    it('should warn if providing a string', () => {
      mountWithProps({ classes: 'foo' });
      assert.strictEqual(consoleErrorMock.callCount() >= 1, true);
      const args = consoleErrorMock.args();
      assert.include(
        consoleErrorMock.args()[args.length - 1][0],
        'You might want to use the className property instead',
      );
    });

    it('should warn if providing a non string', () => {
      const { classes: baseClasses } = mountWithProps();
      const { classes: extendedClasses } = mountWithProps({ classes: { root: {} } });
      assert.deepEqual(extendedClasses, { root: `${baseClasses.root} [object Object]` });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'Material-UI: the key `root` provided to the classes property is not valid',
      );
    });

    it('should warn if missing theme', () => {
      const styles = theme => ({ root: { padding: theme.spacing(2) } });
      const mountWithProps2 = createGetClasses(styles);
      assert.throw(() => {
        mountWithProps2({});
      });
      assert.strictEqual(consoleErrorMock.callCount(), 4);
      assert.include(consoleErrorMock.args()[1][0], 'the `styles` argument provided is invalid');
    });
  });

  describe('classes memoization', () => {
    let mountWithProps;

    before(() => {
      const styles = { root: {} };
      mountWithProps = createGetClasses(styles);
    });

    it('should recycle with no classes property', () => {
      const output = mountWithProps();
      const classes1 = output.classes;
      output.wrapper.update();
      const classes2 = output.classes;
      assert.strictEqual(classes1, classes2);
    });

    it('should recycle even when a classes property is provided', () => {
      const inputClasses = { root: 'foo' };
      const output = mountWithProps({ classes: inputClasses });
      const classes1 = output.classes;
      output.wrapper.setProps({
        classes: inputClasses,
      });
      const classes2 = output.classes;
      assert.strictEqual(classes1, classes2);
    });

    it('should invalidate the cache', () => {
      const { classes } = mountWithProps();
      const output = mountWithProps({ classes: { root: 'foo' } });
      const classes1 = output.classes;
      assert.deepEqual(classes1, {
        root: `${classes.root} foo`,
      });
      output.wrapper.setProps({
        classes: { root: 'bar' },
      });
      const classes2 = output.classes;
      assert.notStrictEqual(classes1, classes2);
      assert.deepEqual(classes2, {
        root: `${classes.root} bar`,
      });
    });
  });

  describe('integration', () => {
    let sheetsRegistry;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should run lifecycles with no theme', () => {
      const useStyles = makeStyles({ root: { display: 'flex' } });
      const StyledComponent = () => {
        useStyles();
        return <div />;
      };

      const wrapper = mount(
        <ThemeProvider theme={createMuiTheme()}>
          <StylesProvider sheetsRegistry={sheetsRegistry}>
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Hook-root-vy1bts' });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Hook-root-vy1bts' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Hook-root-vy1bts' });

      wrapper.unmount();
      assert.strictEqual(sheetsRegistry.registry.length, 0);
    });

    it('should work when depending on a theme', () => {
      const useStyles = makeStyles(theme => ({ root: { padding: theme.spacing(1) } }), {
        name: 'MuiTextField',
      });
      const StyledComponent = () => {
        useStyles();
        return <div />;
      };

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
      const useStyles = makeStyles(
        {
          root: {
            padding: 8,
            margin: [1, 3],
          },
        },
        {
          name: 'MuiTextField',
        },
      );
      const StyledComponent = () => {
        useStyles();
        return <div />;
      };

      mount(
        <ThemeProvider
          theme={createMuiTheme({
            overrides: {
              MuiTextField: {
                root: {
                  padding: 9,
                  margin: [2, 2, 3],
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
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: { padding: 9, margin: [2, 2, 3] },
      });
    });

    it('should handle dynamic properties', () => {
      const useStyles = makeStyles({
        root: props => ({ margin: 8, padding: props.padding || 8 }),
      });
      const StyledComponent = props => {
        const classes = useStyles(props);
        return <div className={classes.root} />;
      };

      const Test = props => (
        <StylesProvider sheetsRegistry={sheetsRegistry}>
          <StyledComponent {...props} />
        </StylesProvider>
      );

      const wrapper = mount(<Test />);
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Hook-root-1cjflis' });
      assert.deepEqual(sheetsRegistry.registry[1].classes, { root: 'Hook-root-1' });
      assert.deepEqual(sheetsRegistry.registry[1].rules.map.root.style, {
        margin: '8px',
        padding: '8px',
      });
      act(() => {
        wrapper.setProps({ padding: 4 });
      });
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Hook-root-1cjflis' });
      assert.deepEqual(sheetsRegistry.registry[1].classes, { root: 'Hook-root-1' });
      assert.deepEqual(sheetsRegistry.registry[1].rules.map.root.style, {
        margin: '8px',
        padding: '4px',
      });
    });
  });

  describe('options: disableGeneration', () => {
    it('should not generate the styles', () => {
      const sheetsRegistry = new SheetsRegistry();
      const Empty = () => <div />;
      const useStyles = makeStyles({ root: { padding: 8 } });
      const StyledComponent = () => {
        const classes = useStyles();
        return <Empty classes={classes} />;
      };

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

  describe('react-hot-loader', () => {
    it('should take the new stylesCreator into account', () => {
      const useStyles1 = makeStyles({ root: { padding: 8 } });
      const useStyles2 = makeStyles({ root: { padding: 4 } });

      let hmr = false;

      const StyledComponent = () => {
        // Simulate react-hot-loader behavior
        if (hmr) {
          useStyles2();
        } else {
          useStyles1();
        }

        return <div />;
      };

      const sheetsRegistry = new SheetsRegistry();
      const wrapper = mount(
        <StylesProvider sheetsRegistry={sheetsRegistry}>
          <StyledComponent />
        </StylesProvider>,
      );

      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: { padding: 8 },
      });

      hmr = true;
      act(() => {
        wrapper.setProps({});
      });

      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: { padding: 4 },
      });
    });
  });

  describe('classname quality', () => {
    let sheetsRegistry;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should use the displayName', () => {
      const useStyles1 = makeStyles({ root: { padding: 8 } });
      const StyledComponent1 = () => {
        useStyles1();
        return <div />;
      };

      const useStyles2 = makeStyles({ root: { padding: 8 } }, { name: 'Fooo' });
      const StyledComponent2 = () => {
        useStyles2();
        return <div />;
      };

      mount(
        <StylesProvider sheetsRegistry={sheetsRegistry}>
          <StyledComponent1 />
          <StyledComponent2 />
        </StylesProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry[0].options.classNamePrefix, 'Hook');
      assert.strictEqual(sheetsRegistry.registry[0].options.name, undefined);
      assert.strictEqual(sheetsRegistry.registry[1].options.classNamePrefix, 'Fooo');
      assert.strictEqual(sheetsRegistry.registry[1].options.name, 'Fooo');
    });
  });
});
