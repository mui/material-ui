/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import { ThemeProvider as MDThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_capitalize as capitalize } from '@mui/utils';
import ReactTestRenderer from 'react-test-renderer';
import createMount from './createMount';
import findOutermostIntrinsic from './findOutermostIntrinsic';

/**
 * @param {object} node
 * @returns
 */
function assertDOMNode(node) {
  // duck typing a DOM node
  expect(typeof node.nodeName).to.equal('string');
}

/**
 * Utility method to make assertions about the ref on an element
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {(node: React.ReactNode) => import('enzyme').ReactWrapper} mount - Should be returnvalue of createMount
 * @param {(instance: unknown, wrapper: import('enzyme').ReactWrapper) => void} onRef - Asserts that the ref is a DOM node by default
 */
function testRef(element, mount, onRef = assertDOMNode) {
  const ref = React.createRef();
  const wrapper = mount(<React.Fragment>{React.cloneElement(element, { ref })}</React.Fragment>);
  onRef(ref.current, wrapper);
}

/**
 * Glossary
 * - root component:
 *   - renders the outermost host component
 *   - has the `root` class if the component has one
 *   - excess props are spread to this component
 *   - has the type of `inheritComponent`
 */

/**
 * Returns the component with the same constructor as `component` that renders
 * the outermost host
 * @param {import('enzyme').ReactWrapper} wrapper
 * @param {object} options
 * @param {import('react').ElementType} options.component
 */
export function findRootComponent(wrapper, { component }) {
  const outermostHostElement = findOutermostIntrinsic(wrapper).getElement();

  return wrapper.find(component).filterWhere((componentWrapper) => {
    return componentWrapper.contains(outermostHostElement);
  });
}

export function randomStringValue() {
  return `s${Math.random().toString(36).slice(2)}`;
}

function throwMissingPropError(field) {
  throw new Error(`missing "${field}" in options

  > describeConformance(element, () => options)
`);
}

/**
 * MUI components have a `className` prop. The `className` is applied to
 * the root component.
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testClassName(element, getOptions) {
  it('applies the className to the root component', () => {
    const { mount } = getOptions();
    const className = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { className }));

    expect(findOutermostIntrinsic(wrapper).instance()).to.have.class(className);
  });
}

/**
 * MUI components have a `component` prop that allows rendering a different
 * Component from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testComponentProp(element, getOptions) {
  describe('prop: component', () => {
    it('can render another root component with the `component` prop', () => {
      const { mount, testComponentPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { component }));

      expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
    });
  });
}

/**
 * MUI components can spread additional props to a documented component.
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testPropsSpread(element, getOptions) {
  it(`spreads props to the root component`, () => {
    // type def in ConformanceOptions
    const { inheritComponent, mount } = getOptions();
    if (inheritComponent === undefined) {
      throw new TypeError(
        'Unable to test props spread without `inheritComponent`. Either skip the test or pass a React element type.',
      );
    }

    const testProp = 'data-test-props-spread';
    const value = randomStringValue();

    const wrapper = mount(React.cloneElement(element, { [testProp]: value }));
    const root = findRootComponent(wrapper, { component: inheritComponent });

    expect(root.props()).to.have.property(testProp, value);
  });
}

/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function describeRef(element, getOptions) {
  describe('ref', () => {
    it(`attaches the ref`, () => {
      // type def in ConformanceOptions
      const { inheritComponent, mount, refInstanceof } = getOptions();

      testRef(element, mount, (instance, wrapper) => {
        expect(instance).to.be.instanceof(refInstanceof);

        if (inheritComponent !== undefined && instance.nodeType === 1) {
          const rootHost = findOutermostIntrinsic(wrapper);
          expect(instance).to.equal(rootHost.instance());
        }
      });
    });
  });
}

/**
 * Tests that the root component has the root class
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
export function testRootClass(element, getOptions) {
  it('applies the root class to the root component if it has this class', () => {
    const { classes, render, skip } = getOptions();
    if (classes.root == null) {
      return;
    }

    const className = randomStringValue();
    const classesRootClassname = randomStringValue();
    const { container } = render(
      React.cloneElement(element, {
        className,
        classes: { ...classes, root: `${classes.root} ${classesRootClassname}` },
      }),
    );

    // we established that the root component renders the outermost host previously. We immediately
    // jump to the host component because some components pass the `root` class
    // to the `classes` prop of the root component.
    // https://github.com/mui/material-ui/blob/f9896bcd129a1209153106296b3d2487547ba205/packages/material-ui/src/OutlinedInput/OutlinedInput.js#L101
    expect(container.firstChild).to.have.class(className);
    expect(container.firstChild).to.have.class(classes.root);
    expect(document.querySelectorAll(`.${classes.root}`).length).to.equal(1);

    // classes test only for @mui/material
    if (!skip || !skip.includes('classesRoot')) {
      // Test that classes prop works
      expect(container.firstChild).to.have.class(classesRootClassname);

      // Test that `classes` does not spread to DOM
      expect(document.querySelectorAll('[classes]').length).to.equal(0);
    }
  });
}

/**
 * Tests that the component can be rendered with react-test-renderer.
 * This is important for snapshot testing with Jest (even if we don't encourage it).
 * @param {React.ReactElement} element
 */
export function testReactTestRenderer(element) {
  it('should render without errors in ReactTestRenderer', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(element, {
        createNodeMock: (node) => {
          return document.createElement(node.type);
        },
      });
    });
  });
}

/**
 *
 * @param {object} slots
 * @param {(slotName: string, slotOptions: object) => void} callback
 * @returns
 */
function forEachSlot(slots, callback) {
  if (!slots) {
    return;
  }

  const slotNames = Object.keys(slots);
  for (let i = 0; i < slotNames.length; i += 1) {
    const slotName = slotNames[i];
    const slot = slots[slotName];

    callback(slotName, slot);
  }
}

function testSlotsProp(element, getOptions) {
  const { render, slots } = getOptions();

  // eslint-disable-next-line react/prop-types
  const CustomComponent = React.forwardRef(({ className }, ref) => (
    <i className={className} ref={ref} data-testid="custom" />
  ));

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`allows overriding the ${slotName} slot with a component using the slots.${slotName} prop`, () => {
      if (!render) {
        throwMissingPropError('render');
      }

      const { queryByTestId } = render(
        React.cloneElement(element, {
          slots: {
            [slotName]: slotOptions.testWithComponent ?? CustomComponent,
          },
        }),
      );
      const renderedElement = queryByTestId('custom'); // use `query*` instead of `get*` to bypass hidden element, we just want to check the overriding functionality.
      expect(renderedElement).not.to.equal(null);
      if (slotOptions.expectedClassName) {
        expect(renderedElement).to.have.class(slotOptions.expectedClassName);
      }
    });

    if (slotOptions.testWithElement !== null) {
      it(`allows overriding the ${slotName} slot with an element using the slots.${slotName} prop`, () => {
        if (!render) {
          throwMissingPropError('render');
        }

        const slotElement = slotOptions.testWithElement ?? 'i';

        const { queryByTestId } = render(
          React.cloneElement(element, {
            slots: {
              [slotName]: slotElement,
            },
            componentsProps: {
              [slotName]: {
                'data-testid': 'customized',
              },
            },
          }),
        );

        const renderedElement = queryByTestId('customized'); // use `query*` instead of `get*` to bypass hidden element, we just want to check the overriding functionality.
        expect(renderedElement).not.to.equal(null);

        expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
        if (slotOptions.expectedClassName) {
          expect(renderedElement).to.have.class(slotOptions.expectedClassName);
        }
      });
    }
  });
}

function testSlotPropsProp(element, getOptions) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`sets custom properties on the ${slotName} slot's element with the slotProps.${slotName} prop`, () => {
      const { queryByTestId } = render(
        React.cloneElement(element, {
          slotProps: {
            [slotName]: {
              'data-testid': 'custom',
            },
          },
        }),
      );
      const slotComponent = queryByTestId('custom'); // use `query*` instead of `get*` to bypass hidden element, we just want to check the overriding functionality.
      expect(slotComponent).not.to.equal(null);

      if (slotOptions.expectedClassName) {
        expect(slotComponent).to.have.class(slotOptions.expectedClassName);
      }
    });

    if (slotOptions.expectedClassName) {
      it(`merges the class names provided in slotsProps.${slotName} with the built-in ones`, () => {
        const slotProps = {
          [slotName]: {
            'data-testid': 'custom',
            className: randomStringValue(),
          },
        };

        const { getByTestId } = render(React.cloneElement(element, { slotProps }));

        expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
        expect(getByTestId('custom')).to.have.class(slotProps[slotName].className);
      });
    }
  });
}

/**
 * @typedef {Object} ConformanceOptions
 * @property {() => void} [after]
 * @property {object} classes - `classes` of the component provided by `@mui/styled-engine`
 * @property {import('react').ElementType} [inheritComponent] - The element type that receives spread props or `undefined` if props are not spread.
 * @property {string} muiName
 * @property {(node: React.ReactElement) => import('./createRenderer').MuiRenderResult} [render] - Should be a return value from createRenderer
 * @property {Array<keyof typeof fullSuite>} [only] - If specified only run the tests listed
 * @property {any} refInstanceof - `ref` will be an instanceof this constructor.
 * @property {Array<keyof typeof fullSuite | 'classesRoot'>} [skip] - Skip the specified tests
 * @property {string} [testComponentsRootPropWith] - The host component that should be rendered instead.
 * @property {{ slotName: string, slotClassName: string } | Array<{ slotName: string, slotClassName: string }>} [testDeepOverrides]
 * @property {{ prop?: string, value?: any, styleKey: string }} [testStateOverrides]
 * @property {object} [testVariantProps]
 * @property {(mount: (node: React.ReactNode) => import('enzyme').ReactWrapper) => (node: React.ReactNode) => import('enzyme').ReactWrapper} [wrapMount] - You can use this option to mount the component with enzyme in a WrapperComponent. Make sure the returned node corresponds to the input node and not the wrapper component.
 * @property {boolean} [testCustomVariant] - The component supports custom variant
 * @property {object} [components] - Material UI's components prop
 * @property {object} [slots] - MUI slots prop
 */

/**
 * >>> The `components` and `componentsProps` will be deprecated in v6, and removed in v7 (together with this test suite) <<<
 *
 * MUI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testMaterialUIComponentsProp(element, getOptions) {
  describe('prop components:', () => {
    const { components, render } = getOptions();

    if (!components) {
      // the tests below will cover all the components
      it('can render another root component with the `components` prop', () => {
        const { mount, testComponentsRootPropWith: component = 'em' } = getOptions();
        const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

        expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
      });
    } else {
      // eslint-disable-next-line react/prop-types
      const CustomComponent = React.forwardRef(({ className }, ref) => (
        <i className={className} ref={ref} data-testid="custom" />
      ));

      forEachSlot(components, (slotName, slotOptions) => {
        it(`allows overriding the ${slotName} slot with a component using the components.${capitalize(
          slotName,
        )} prop`, () => {
          if (!render) {
            throwMissingPropError('render');
          }

          const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

          const { queryByTestId } = render(
            React.cloneElement(element, { components: { [capitalize(slotName)]: slotComponent } }),
          );
          const renderedElement = queryByTestId('custom');
          expect(renderedElement).not.to.equal(null);
          if (slotOptions.expectedClassName) {
            expect(renderedElement).to.have.class(slotOptions.expectedClassName);
          }
        });

        it(`prioritizes the 'slots.${slotName}' over components.${capitalize(
          slotName,
        )} if both are defined`, () => {
          // eslint-disable-next-line react/prop-types
          const ComponentForComponentsProp = React.forwardRef(({ children }, ref) => {
            const SlotComponent = slotOptions.testWithComponent ?? 'div';
            return (
              <SlotComponent ref={ref} data-testid="from-components">
                {children}
              </SlotComponent>
            );
          });

          // eslint-disable-next-line react/prop-types
          const ComponentForSlotsProp = React.forwardRef(({ children }, ref) => {
            const SlotComponent = components[slotName].testWithComponent ?? 'div';
            return (
              <SlotComponent ref={ref} data-testid="from-slots">
                {children}
              </SlotComponent>
            );
          });

          const { queryByTestId } = render(
            React.cloneElement(element, {
              components: {
                [capitalize(slotName)]: ComponentForComponentsProp,
              },
              slots: {
                [slotName]: ComponentForSlotsProp,
              },
            }),
          );

          expect(queryByTestId('from-slots')).not.to.equal(null);
          expect(queryByTestId('from-components')).to.equal(null);
        });

        if (slotOptions.testWithElement !== null) {
          it(`allows overriding the ${slotName} slot with an element using the components.${capitalize(
            slotName,
          )} prop`, () => {
            if (!render) {
              throwMissingPropError('render');
            }

            const slotElement = slotOptions.testWithElement ?? 'i';

            const { queryByTestId } = render(
              React.cloneElement(element, {
                components: {
                  [capitalize(slotName)]: slotElement,
                },
                componentsProps: {
                  [slotName]: {
                    'data-testid': 'customized',
                  },
                },
              }),
            );

            const renderedElement = queryByTestId('customized');
            expect(renderedElement).not.to.equal(null);

            expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
            if (slotOptions.expectedClassName) {
              expect(renderedElement).to.have.class(slotOptions.expectedClassName);
            }
          });

          it(`allows overriding the ${slotName} slot with an element using the slots.${slotName} prop`, () => {
            if (!render) {
              throwMissingPropError('render');
            }

            const slotElement = slotOptions.testWithElement ?? 'i';

            const { queryByTestId } = render(
              React.cloneElement(element, {
                slots: {
                  [slotName]: slotElement,
                },
                slotProps: {
                  [slotName]: {
                    'data-testid': 'customized',
                  },
                },
              }),
            );

            const renderedElement = queryByTestId('customized');
            expect(renderedElement).not.to.equal(null);

            expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
            if (slotOptions.expectedClassName) {
              expect(renderedElement).to.have.class(slotOptions.expectedClassName);
            }
          });
        }
      });
    }
  });
}

function testMaterialUIComponentsPropsProp(element, getOptions) {
  const { render, components } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  describe('prop componentsProps:', () => {
    forEachSlot(components, (slotName, slotOptions) => {
      it(`sets custom properties on the ${slotName} slot's element with the componentsProps.${slotName} prop`, () => {
        const componentsProps = {
          [slotName]: {
            'data-testid': 'custom',
          },
        };

        const { queryByTestId } = render(React.cloneElement(element, { componentsProps }));
        const slotComponent = queryByTestId('custom');
        expect(slotComponent).not.to.equal(null);

        if (slotOptions.expectedClassName) {
          expect(slotComponent).to.have.class(slotOptions.expectedClassName);
        }
      });

      it(`sets custom properties on the ${slotName} slot's element with the slotProps.${slotName} prop`, () => {
        const slotProps = {
          [slotName]: {
            'data-testid': 'custom',
          },
        };

        const { queryByTestId } = render(React.cloneElement(element, { slotProps }));
        const slotComponent = queryByTestId('custom');
        expect(slotComponent).not.to.equal(null);

        if (slotOptions.expectedClassName) {
          expect(slotComponent).to.have.class(slotOptions.expectedClassName);
        }
      });

      it(`prioritizes the 'slotProps.${slotName}' over componentsProps.${slotName} if both are defined`, () => {
        const componentsProps = {
          [slotName]: {
            'data-testid': 'custom',
            'data-from-components-props': 'true',
          },
        };

        const slotProps = {
          [slotName]: {
            'data-testid': 'custom',
            'data-from-slot-props': 'true',
          },
        };

        const { queryByTestId } = render(
          React.cloneElement(element, { componentsProps, slotProps }),
        );
        const slotComponent = queryByTestId('custom');
        expect(slotComponent).to.have.attribute('data-from-slot-props', 'true');
        expect(slotComponent).not.to.have.attribute('data-from-components-props');
      });

      if (slotOptions.expectedClassName) {
        it(`merges the class names provided in slotsProps.${slotName} with the built-in ones`, () => {
          const slotProps = {
            [slotName]: {
              'data-testid': 'custom',
              className: randomStringValue(),
            },
          };

          const { getByTestId } = render(React.cloneElement(element, { slotProps }));

          expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
          expect(getByTestId('custom')).to.have.class(slotProps[slotName].className);
        });
      }
    });
  });
}

/**
 * MUI theme has a components section that allows specifying default props.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeDefaultProps(element, getOptions) {
  describe('theme default components:', () => {
    it("respect theme's defaultProps", () => {
      const testProp = 'data-id';
      const { muiName, render, ThemeProvider = MDThemeProvider } = getOptions();

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            defaultProps: {
              [testProp]: 'testProp',
            },
          },
        },
      });

      const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.have.attribute(testProp, 'testProp');
    });
  });
}

/**
 * MUI theme has a components section that allows specifying style overrides.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeStyleOverrides(element, getOptions) {
  describe('theme style overrides:', () => {
    it("respect theme's styleOverrides custom state", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const { muiName, testStateOverrides, render, ThemeProvider = MDThemeProvider } = getOptions();

      if (!testStateOverrides) {
        return;
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              [testStateOverrides.styleKey]: testStyle,
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );

      expect(container.firstChild).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's styleOverrides slots", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const {
        muiName,
        testDeepOverrides,
        testRootOverrides = { slotName: 'root' },
        render,
        ThemeProvider = MDThemeProvider,
      } = getOptions();

      const testStyle = {
        mixBlendMode: 'darken',
      };

      function resolveDeepOverrides(callback) {
        if (!testDeepOverrides) {
          return {};
        }
        const styles = {};
        if (Array.isArray(testDeepOverrides)) {
          testDeepOverrides.forEach((slot) => {
            callback(styles, slot);
          });
        } else {
          callback(styles, testDeepOverrides);
        }
        return styles;
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              [testRootOverrides.slotName]: {
                ...testStyle,
                ...resolveDeepOverrides((styles, slot) => {
                  styles[`& .${slot.slotClassName}`] = {
                    fontVariantCaps: 'all-petite-caps',
                  };
                }),
              },
              ...resolveDeepOverrides((styles, slot) => {
                styles[slot.slotName] = {
                  mixBlendMode: 'darken',
                };
              }),
            },
          },
        },
      });

      const { container, setProps } = render(
        <ThemeProvider theme={theme}>{element}</ThemeProvider>,
      );

      if (testRootOverrides.slotClassName) {
        expect(
          document.querySelector(`.${testRootOverrides.slotClassName}`),
        ).to.toHaveComputedStyle(testStyle);
      } else {
        expect(container.firstChild).to.toHaveComputedStyle(testStyle);
      }

      if (testDeepOverrides) {
        (Array.isArray(testDeepOverrides) ? testDeepOverrides : [testDeepOverrides]).forEach(
          (slot) => {
            expect(document.querySelector(`.${slot.slotClassName}`)).to.toHaveComputedStyle({
              fontVariantCaps: 'all-petite-caps',
              mixBlendMode: 'darken',
            });
          },
        );

        const themeWithoutRootOverrides = createTheme({
          components: {
            [muiName]: {
              styleOverrides: {
                ...resolveDeepOverrides((styles, slot) => {
                  styles[slot.slotName] = testStyle;
                }),
              },
            },
          },
        });

        setProps({ theme: themeWithoutRootOverrides });

        (Array.isArray(testDeepOverrides) ? testDeepOverrides : [testDeepOverrides]).forEach(
          (slot) => {
            expect(document.querySelector(`.${slot.slotClassName}`)).to.toHaveComputedStyle(
              testStyle,
            );
          },
        );
      }
    });

    it('overrideStyles does not replace each other in slots', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const {
        muiName,
        classes,
        testStateOverrides,
        render,
        ThemeProvider = MDThemeProvider,
      } = getOptions();

      const classKeys = Object.keys(classes);

      // only test the component that has `root` and other classKey
      if (!testStateOverrides || !classKeys.includes('root') || classKeys.length === 1) {
        return;
      }

      // `styleKey` in some tests is `foo` or `bar`, so need to check if it is a valid classKey.
      const isStyleKeyExists = classKeys.indexOf(testStateOverrides.styleKey) !== -1;

      if (!isStyleKeyExists) {
        return;
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              root: {
                [`&.${classes.root}`]: {
                  filter: 'blur(1px)',
                  mixBlendMode: 'darken',
                },
              },
              ...(testStateOverrides && {
                [testStateOverrides.styleKey]: {
                  [`&.${classes.root}`]: {
                    mixBlendMode: 'color',
                  },
                },
              }),
            },
          },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );

      expect(document.querySelector(`.${classes.root}`)).toHaveComputedStyle({
        filter: 'blur(1px)', // still valid in root
        mixBlendMode: 'color', // overridden by `styleKey`
      });
    });
  });
}

/**
 * MUI theme has a components section that allows specifying custom variants.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeVariants(element, getOptions) {
  describe('theme variants:', () => {
    it("respect theme's variants", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testVariantProps, render, ThemeProvider = MDThemeProvider } = getOptions();

      if (!testVariantProps) {
        throw new Error('missing testVariantProps');
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const testStyle = {
        mixBlendMode: 'darken',
      };

      const theme = createTheme({
        components: {
          [muiName]: {
            variants: [
              {
                props: testVariantProps,
                style: testStyle,
              },
            ],
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
    });

    it('supports custom variant', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testCustomVariant, render, ThemeProvider = MDThemeProvider } = getOptions();

      if (!testCustomVariant) {
        return;
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === 'unknown' && {
                  mixBlendMode: 'darken',
                }),
              }),
            },
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { variant: 'unknown', 'data-testid': 'custom-variant' })}
        </ThemeProvider>,
      );

      expect(getByTestId('custom-variant')).toHaveComputedStyle({ mixBlendMode: 'darken' });
    });
  });
}

const fullSuite = {
  componentProp: testComponentProp,
  componentsProp: testMaterialUIComponentsProp,
  componentsPropsProp: testMaterialUIComponentsPropsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
  slotPropsProp: testSlotPropsProp,
  slotsProp: testSlotsProp,
  themeDefaultProps: testThemeDefaultProps,
  themeStyleOverrides: testThemeStyleOverrides,
  themeVariants: testThemeVariants,
};

/**
 * Tests various aspects of a component that should be equal across MUI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformance(minimalElement, getOptions) {
  describe('MUI component API', () => {
    const {
      after: runAfterHook = () => {},
      only = Object.keys(fullSuite),
      slots,
      components,
      skip = [],
      wrapMount,
    } = getOptions();

    let filteredTests = Object.keys(fullSuite).filter(
      (testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1,
    );

    if (!slots) {
      // if `slots` are not defined, do not run tests that depend on them
      filteredTests = filteredTests.filter(
        (testKey) => !['slotsProp', 'slotPropsProp'].includes(testKey),
      );
    }

    if (!components) {
      // if `components` are not defined, do not run tests that depend on them
      filteredTests = filteredTests.filter((testKey) => !['componentsPropsProp'].includes(testKey));
    }

    const baseMount = createMount();
    const mount = wrapMount !== undefined ? wrapMount(baseMount) : baseMount;

    after(runAfterHook);

    function getTestOptions() {
      return {
        ...getOptions(),

        mount,
      };
    }

    filteredTests.forEach((testKey) => {
      const test = fullSuite[testKey];
      test(minimalElement, getTestOptions);
    });
  });
}
