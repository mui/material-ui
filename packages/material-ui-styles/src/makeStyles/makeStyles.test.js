import { assert } from 'chai';
import React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { act } from 'react-dom/test-utils';
import { createMount } from '@material-ui/core/test-utils';
import { createMuiTheme } from '@material-ui/core/styles';
import createGenerateClassName from '../createGenerateClassName';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import makeStyles from './makeStyles';
import useTheme from '../useTheme';
import StylesProvider from '../StylesProvider';
import ThemeProvider from '../ThemeProvider';

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

  let generateClassName;

  before(() => {
    mount = createMount({ strict: undefined });
  });

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should accept a classes property', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const output = mountWithProps();
    const baseClasses = output.classes;
    output.wrapper.setProps({
      classes: { root: 'h1' },
    });
    const extendedClasses = output.classes;
    assert.strictEqual(extendedClasses.root, `${baseClasses.root} h1`);
  });

  it('should ignore undefined property', () => {
    const styles = { root: {} };
    const mountWithProps = createGetClasses(styles);
    const output = mountWithProps();
    const baseClasses = output.classes;
    output.wrapper.setProps({
      classes: { root: undefined },
    });
    const extendedClasses = output.classes;
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
      const output = mountWithProps();
      const baseClasses = output.classes;
      output.wrapper.setProps({ classes: { bar: 'foo' } });
      const extendedClasses = output.classes;
      assert.deepEqual(extendedClasses, { root: baseClasses.root, bar: 'undefined foo' });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'Material-UI: the key `bar` provided to the classes property is not implemented',
      );
    });

    it('should warn if providing a string', () => {
      const output = mountWithProps();
      output.wrapper.setProps({ classes: 'foo' });
      assert.strictEqual(consoleErrorMock.callCount() >= 1, true);
      const args = consoleErrorMock.args();
      assert.include(
        consoleErrorMock.args()[args.length - 1][0],
        'You might want to use the className property instead',
      );
    });

    it('should warn if providing a non string', () => {
      const output = mountWithProps();
      const baseClasses = output.classes;
      output.wrapper.setProps({ classes: { root: {} } });
      const extendedClasses = output.classes;
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
      const output = mountWithProps();
      const classes = output.classes;
      output.wrapper.setProps({ classes: { root: 'foo' } });
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
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'makeStyles-root-1' });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'makeStyles-root-1' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'makeStyles-root-1' });

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
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
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
          <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
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
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <StyledComponent {...props} />
        </StylesProvider>
      );

      const wrapper = mount(<Test />);
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'makeStyles-root-1' });
      assert.deepEqual(sheetsRegistry.registry[1].classes, { root: 'makeStyles-root-2' });
      assert.deepEqual(sheetsRegistry.registry[1].rules.map.root.style, {
        margin: '8px',
        padding: '8px',
      });
      wrapper.setProps({ padding: 4 });
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'makeStyles-root-1' });
      assert.deepEqual(sheetsRegistry.registry[1].classes, { root: 'makeStyles-root-2' });
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
        <StylesProvider sheetsRegistry={sheetsRegistry} disableGeneration sheetsCache={new Map()}>
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
        /* eslint-disable react-hooks/rules-of-hooks */
        if (hmr) {
          useStyles2();
        } else {
          useStyles1();
        }
        /* eslint-enable react-hooks/rules-of-hooks */

        return <div />;
      };

      const sheetsRegistry = new SheetsRegistry();
      const wrapper = mount(
        <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
          <StyledComponent />
        </StylesProvider>,
      );

      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: { padding: 8 },
      });

      hmr = true;
      wrapper.setProps({});
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
        <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
          <StyledComponent1 />
          <StyledComponent2 />
        </StylesProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry[0].options.classNamePrefix, 'makeStyles');
      assert.strictEqual(sheetsRegistry.registry[0].options.name, undefined);
      assert.strictEqual(sheetsRegistry.registry[1].options.classNamePrefix, 'Fooo');
      assert.strictEqual(sheetsRegistry.registry[1].options.name, 'Fooo');
    });
  });

  describe('stress test', () => {
    let StressTest;

    before(() => {
      const useStyles = makeStyles(theme => ({
        root: props => ({
          backgroundColor: props.backgroundColor,
          color: theme.color,
        }),
      }));

      const Component = React.memo(props => {
        const classes = useStyles(props);
        const theme = useTheme();

        const rendered = React.useRef(1);
        React.useEffect(() => {
          rendered.current += 1;
        });

        return (
          <div className={classes.root}>
            rendered {rendered.current} times
            <br />
            backgroundColor: {props.backgroundColor}
            <br />
            color: {theme.color}
          </div>
        );
      });

      Component.propTypes = {
        backgroundColor: PropTypes.string.isRequired,
      };

      StressTest = () => {
        const [backgroundColor, setBackgroundColor] = React.useState('black');
        function handleBackgroundColorChange(event) {
          setBackgroundColor(event.target.value);
        }

        const [color, setColor] = React.useState('white');
        function handleColorChange(event) {
          setColor(event.target.value);
        }

        const theme = React.useMemo(() => ({ color }), [color]);

        return (
          <ThemeProvider theme={theme}>
            <fieldset>
              <div>Color in theme, background-color in props</div>
              <label htmlFor="background-color">background-color</label>
              <input
                id="background-color"
                onChange={handleBackgroundColorChange}
                value={backgroundColor}
              />
              <label htmlFor="color">color</label>
              <input id="color" onChange={handleColorChange} value={color} />
            </fieldset>
            <Component backgroundColor={backgroundColor} />
          </ThemeProvider>
        );
      };
    });

    it('should update like expected', () => {
      const sheetsRegistry = new SheetsRegistry();

      const wrapper = mount(
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <StressTest />
        </StylesProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 2);
      assert.strictEqual(
        sheetsRegistry.toString(),
        `
.makeStyles-root-2 {
  color: white;
  background-color: black;
}`,
      );

      act(() => {
        wrapper.find('#color').simulate('change', { target: { value: 'blue' } });
      });
      assert.strictEqual(
        sheetsRegistry.toString(),
        `
.makeStyles-root-4 {
  color: blue;
  background-color: black;
}`,
      );
      act(() => {
        wrapper.find('#background-color').simulate('change', { target: { value: 'green' } });
      });
      assert.strictEqual(
        sheetsRegistry.toString(),
        `
.makeStyles-root-4 {
  color: blue;
  background-color: green;
}`,
      );
    });
  });
});
