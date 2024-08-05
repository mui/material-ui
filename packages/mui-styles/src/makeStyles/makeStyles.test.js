import { expect } from 'chai';
import * as React from 'react';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import {
  createRenderer,
  screen,
  renderHook,
  fireEvent,
  reactMajor,
} from '@mui/internal-test-utils';
import { createTheme } from '@mui/material/styles';
import createGenerateClassName from '../createGenerateClassName';
import makeStyles from './makeStyles';
import useTheme from '../useTheme';
import StylesProvider from '../StylesProvider';
import ThemeProvider from '../ThemeProvider';

describe('makeStyles', () => {
  // StrictModeViolation: uses `useSynchronousEffect`
  const { render } = createRenderer({ strict: false });

  let generateClassName;

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  it('should accept a classes prop', () => {
    const styles = { root: {} };
    const useStyles = makeStyles(styles);

    const { result, rerender } = renderHook((props) => useStyles(props));
    const baseClasses = result.current;
    rerender({ classes: { root: 'h1' } });
    const extendedClasses = result.current;

    expect(extendedClasses.root).to.equal(`${baseClasses.root} h1`);
  });

  it('should ignore undefined prop', () => {
    const styles = { root: {} };
    const useStyles = makeStyles(styles);

    const { result, rerender } = renderHook((props) => useStyles(props));
    const baseClasses = result.current;
    rerender({ classes: { root: undefined } });
    const extendedClasses = result.current;

    expect(extendedClasses.root).to.equal(baseClasses.root);
  });

  describe('warnings', () => {
    const useStyles = makeStyles({ root: {} });

    it('should warn if providing a unknown key', () => {
      let baseClasses;
      let extendedClasses;

      expect(() => {
        const { result } = renderHook(() => useStyles({ classes: { bar: 'foo' } }));
        baseClasses = result.current;
        extendedClasses = result.current;
      }).toErrorDev('MUI: The key `bar` provided to the classes prop is not implemented');
      expect(extendedClasses).to.deep.equal({ root: baseClasses.root, bar: 'undefined foo' });
    });

    it('should warn if providing a string', () => {
      expect(() => {
        renderHook(() => useStyles({ classes: 'foo' }));
      }).toErrorDev(['You might want to use the className prop instead']);
    });

    it('should warn if providing a non string', () => {
      const { result, rerender } = renderHook((props) => useStyles(props));
      const baseClasses = result.current;

      expect(() => {
        rerender({ classes: { root: {} } });
      }).toErrorDev('MUI: The key `root` provided to the classes prop is not valid');

      const extendedClasses = result.current;

      expect(extendedClasses).to.deep.equal({ root: `${baseClasses.root} [object Object]` });
    });

    it('should warn if missing theme', () => {
      const useStyles2 = makeStyles((theme) => ({ root: { padding: theme.spacing(2) } }));

      const muiErrorMessage =
        'MUI: The `styles` argument provided is invalid.\nYou are providing a function without a theme in the context.';
      const nodeErrorMessage = 'TypeError: theme.spacing is not a function';

      let devErrorMessages = [muiErrorMessage, muiErrorMessage];

      if (reactMajor < 19) {
        devErrorMessages = [
          ...devErrorMessages,
          nodeErrorMessage,
          muiErrorMessage,
          muiErrorMessage,
          nodeErrorMessage,
          'The above error occurred in the <TestComponent> component',
        ];
      }

      expect(() => {
        expect(() => {
          renderHook(() => useStyles2({}));
        }).to.throw('theme.spacing is not a function');
      }).toErrorDev(devErrorMessages);
    });

    it('should warn but not throw if providing an invalid styles type', () => {
      let useStyles2;

      expect(() => {
        useStyles2 = makeStyles(undefined);
      }).toErrorDev(
        'MUI: The `styles` argument provided is invalid.\nYou need to provide a function generating the styles or a styles object.',
      );
      expect(() => {
        renderHook(() => useStyles2({}));
      }).not.to.throw();
    });

    it('should warn if the key is not available', () => {
      const theme = {
        components: {
          Test: {
            styleOverrides: {
              foo: {
                margin: '1px',
              },
            },
          },
        },
      };
      const useStyles2 = makeStyles({ root: { margin: 5, padding: 3 } }, { name: 'Test' });
      function Test() {
        const classes = useStyles2();
        return <div className={classes.root} />;
      }

      expect(() => {
        render(
          <ThemeProvider theme={theme}>
            <Test />
          </ThemeProvider>,
        );
      }).toWarnDev([
        'MUI: You are trying to override a style that does not exist.\n' +
          'Fix the `foo` key of `theme.components.Test.styleOverrides`.',
      ]);
    });
  });

  describe('classes memoization', () => {
    let useStyles;

    before(() => {
      const styles = { root: {} };
      useStyles = makeStyles(styles);
    });

    it('should recycle with no classes prop', () => {
      const { result, rerender } = renderHook(() => useStyles());
      const classes1 = result.current;
      rerender();
      const classes2 = result.current;

      expect(classes1).to.equal(classes2);
    });

    it('should recycle even when a classes prop is provided', () => {
      const inputClasses = { root: 'foo' };
      const { result, rerender } = renderHook(() => useStyles({ classes: inputClasses }));
      const classes1 = result.current;
      rerender();
      const classes2 = result.current;

      expect(classes1).to.equal(classes2);
    });

    it('should invalidate the cache', () => {
      const { result, rerender } = renderHook((props) => useStyles(props));
      const classes = result.current;
      rerender({ classes: { root: 'foo' } });
      const classes1 = result.current;

      expect(classes1).to.deep.equal({
        root: `${classes.root} foo`,
      });

      rerender({
        classes: { root: 'bar' },
      });
      const classes2 = result.current;

      expect(classes1).not.to.equal(classes2);
      expect(classes2).to.deep.equal({
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
      const initialTheme = createTheme();
      function StyledComponent() {
        useStyles();
        return <div />;
      }

      const { setProps, unmount } = render(
        <ThemeProvider theme={initialTheme}>
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
            <StyledComponent />
          </StylesProvider>
        </ThemeProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });

      setProps();

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });

      setProps({ theme: createTheme() });

      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-2' });

      unmount();

      expect(sheetsRegistry.registry.length).to.equal(0);
    });

    it('should work when depending on a theme', () => {
      const useStyles = makeStyles((theme) => ({ root: { padding: theme.spacing(1) } }), {
        name: 'MuiTextField',
      });
      function StyledComponent() {
        useStyles();
        return <div />;
      }

      const { setProps } = render(
        <ThemeProvider theme={createTheme()}>
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
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

    describe('styleOverrides', () => {
      it('should support the styleOverrides key inside components', () => {
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
        function StyledComponent() {
          useStyles();
          return <div />;
        }

        render(
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiTextField: {
                  styleOverrides: {
                    root: {
                      padding: 9,
                      margin: [2, 2, 3],
                    },
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

        expect(sheetsRegistry.registry.length).to.equal(1);
        expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
          root: { padding: 9, margin: [2, 2, 3] },
        });
      });

      it('can be used to remove styles', () => {
        const theme = {
          components: {
            Test: {
              styleOverrides: {
                root: {
                  margin: null,
                },
              },
            },
          },
        };
        const useStyles = makeStyles({ root: { margin: 5, padding: 3 } }, { name: 'Test' });
        function Test() {
          const classes = useStyles();
          return <div className={classes.root} />;
        }

        render(
          <ThemeProvider theme={theme}>
            <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
              <Test />
            </StylesProvider>
          </ThemeProvider>,
        );

        expect(sheetsRegistry.registry.length).to.equal(1);
        expect(sheetsRegistry.registry[0].rules.raw).to.deep.equal({
          root: { margin: null, padding: 3 },
        });
      });
    });

    it('should handle dynamic props', async () => {
      const useStyles = makeStyles({
        root: (props) => ({ margin: 8, padding: props.padding || 8 }),
      });
      function StyledComponent(props) {
        const classes = useStyles(props);
        return <div className={classes.root} />;
      }
      function Test(props) {
        return (
          <StylesProvider
            sheetsRegistry={sheetsRegistry}
            sheetsCache={new Map()}
            generateClassName={generateClassName}
          >
            <StyledComponent {...props} />
          </StylesProvider>
        );
      }

      const { setProps } = render(<Test />);

      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      expect(sheetsRegistry.registry[1].classes).to.deep.equal({ root: 'makeStyles-root-2' });
      expect(sheetsRegistry.registry[1].rules.map.root.style).to.deep.equal({
        margin: '8px',
        padding: '8px',
      });

      setProps({ padding: 4 });

      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'makeStyles-root-1' });
      expect(sheetsRegistry.registry[1].classes).to.deep.equal({ root: 'makeStyles-root-2' });
      expect(sheetsRegistry.registry[1].rules.map.root.style).to.deep.equal({
        margin: '8px',
        padding: '4px',
      });
    });
  });

  describe('options: disableGeneration', () => {
    it('should not generate the styles', () => {
      const sheetsRegistry = new SheetsRegistry();
      const useStyles = makeStyles({ root: { padding: 8 } });
      let classes;
      function Empty(props) {
        React.useEffect(() => {
          classes = props.classes;
        }, [props.classes]);
        return <div />;
      }
      function StyledComponent() {
        const classes2 = useStyles();
        return <Empty classes={classes2} />;
      }

      const { unmount } = render(
        <StylesProvider sheetsRegistry={sheetsRegistry} disableGeneration sheetsCache={new Map()}>
          <StyledComponent />
        </StylesProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(0);
      expect(classes).to.deep.equal({});

      unmount();

      expect(sheetsRegistry.registry.length).to.equal(0);
    });
  });

  describe('classname quality', () => {
    let sheetsRegistry;

    beforeEach(() => {
      sheetsRegistry = new SheetsRegistry();
    });

    it('should use the displayName', () => {
      const useStyles1 = makeStyles({ root: { padding: 8 } });
      function StyledComponent1() {
        useStyles1();
        return <div />;
      }

      const useStyles2 = makeStyles({ root: { padding: 8 } }, { name: 'Fooo' });
      function StyledComponent2() {
        useStyles2();
        return <div />;
      }

      render(
        <StylesProvider sheetsRegistry={sheetsRegistry} sheetsCache={new Map()}>
          <StyledComponent1 />
          <StyledComponent2 />
        </StylesProvider>,
      );

      expect(sheetsRegistry.registry[0].options.classNamePrefix).to.equal('makeStyles');
      expect(sheetsRegistry.registry[0].options.name).to.equal(undefined);
      expect(sheetsRegistry.registry[1].options.classNamePrefix).to.equal('Fooo');
      expect(sheetsRegistry.registry[1].options.name).to.equal('Fooo');
    });
  });

  describe('stress test', () => {
    let StressTest;

    before(() => {
      const useStyles = makeStyles((theme) => ({
        root: (props) => ({
          backgroundColor: props.backgroundColor,
          color: theme.color,
        }),
      }));

      const Component = React.memo((props) => {
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

      StressTest = function StressTestComponent() {
        const [backgroundColor, setBackgroundColor] = React.useState('black');
        const handleBackgroundColorChange = (event) => {
          setBackgroundColor(event.target.value);
        };

        const [color, setColor] = React.useState('white');
        const handleColorChange = (event) => {
          setColor(event.target.value);
        };

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

      render(
        <StylesProvider
          sheetsRegistry={sheetsRegistry}
          sheetsCache={new Map()}
          generateClassName={generateClassName}
        >
          <StressTest />
        </StylesProvider>,
      );

      expect(sheetsRegistry.registry.length).to.equal(2);
      expect(sheetsRegistry.toString()).to.equal(`.makeStyles-root-2 {
  color: white;
  background-color: black;
}`);

      fireEvent.change(screen.getByLabelText('color'), { target: { value: 'blue' } });

      expect(sheetsRegistry.toString()).to.equal(
        `.makeStyles-root-4 {
  color: blue;
  background-color: black;
}`,
      );

      fireEvent.change(screen.getByLabelText('background-color'), {
        target: { value: 'green' },
      });

      expect(sheetsRegistry.toString()).to.equal(
        `.makeStyles-root-4 {
  color: blue;
  background-color: green;
}`,
      );
    });
  });
});
