/* eslint-env mocha */
import * as React from 'react';
import { expect } from 'chai';
import { ReactWrapper } from 'enzyme';
import {
  ThemeProvider as MDThemeProvider,
  createTheme as mdCreateTheme,
} from '@mui/material/styles';
import { unstable_capitalize as capitalize } from '@mui/utils';
import ReactTestRenderer from 'react-test-renderer';
import createMount from './createMount';
import createDescribe from './createDescribe';
import findOutermostIntrinsic from './findOutermostIntrinsic';
import { MuiRenderResult } from './createRenderer';

export interface SlotTestingOptions {
  /**
   * A custom React component to test if the receiving props are correct.
   *
   * It must:
   * - contains at least one DOM which has `data-testid="custom"`
   * - spread `className` to the DOM
   *
   * If not provided, the default custom component tests if the class name is spread.
   */
  testWithComponent?: React.ComponentType;
  /**
   * A custom HTML tag to use for the `slots` prop.
   */
  testWithElement?: keyof JSX.IntrinsicElements | null;
  /**
   * To ensure that the slot has this class name when `slotProps` is provided.
   */
  expectedClassName: string;
  isOptional?: boolean;
}

interface SlotTestOverride {
  slotName: string;
  slotClassName?: string;
}

export interface InputConformanceOptions {
  muiName: string;
  classes: { root: string };
  refInstanceof: any;
  after?: () => void;
  inheritComponent?: React.ElementType;
  render: (node: React.ReactElement) => MuiRenderResult;
  only?: Array<keyof typeof fullSuite>;
  skip?: Array<keyof typeof fullSuite | 'classesRoot'>;
  testComponentsRootPropWith?: string;
  testComponentPropWith?: string;
  testDeepOverrides?: SlotTestOverride | SlotTestOverride[];
  testRootOverrides?: SlotTestOverride;
  testStateOverrides?: { prop?: string; value?: any; styleKey: string };
  testCustomVariant?: boolean;
  testVariantProps?: object;
  testLegacyComponentsProp?: boolean;
  wrapMount?: (
    mount: (node: React.ReactElement) => ReactWrapper,
  ) => (node: React.ReactElement) => ReactWrapper;
  slots?: Record<string, SlotTestingOptions>;
  ThemeProvider?: React.ElementType;
  createTheme?: (arg: any) => any;
}

export interface ConformanceOptions extends InputConformanceOptions {
  mount: (node: React.ReactElement) => ReactWrapper;
}

/**
 * @param {object} node
 * @returns
 */
function assertDOMNode(node: unknown) {
  // duck typing a DOM node
  expect(typeof (node as HTMLElement).nodeName).to.equal('string');
}

/**
 * Utility method to make assertions about the ref on an element
 * The element should have a component wrapped in withStyles as the root
 */
function testRef(
  element: React.ReactElement,
  mount: ConformanceOptions['mount'],
  onRef: (instance: unknown, wrapper: import('enzyme').ReactWrapper) => void = assertDOMNode,
) {
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
 */
export function findRootComponent(wrapper: ReactWrapper, component: string | React.ElementType) {
  const outermostHostElement = findOutermostIntrinsic(wrapper).getElement();

  return wrapper.find(component as string).filterWhere((componentWrapper) => {
    return componentWrapper.contains(outermostHostElement);
  });
}

export function randomStringValue() {
  return `s${Math.random().toString(36).slice(2)}`;
}

function throwMissingPropError(field: string) {
  throw new Error(`missing "${field}" in options

  > describeConformance(element, () => options)
`);
}

/**
 * MUI components have a `className` prop. The `className` is applied to
 * the root component.
 */
export function testClassName(element: React.ReactElement, getOptions: () => ConformanceOptions) {
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
 */
export function testComponentProp(
  element: React.ReactElement,
  getOptions: () => ConformanceOptions,
) {
  describe('prop: component', () => {
    it('can render another root component with the `component` prop', () => {
      const { mount, testComponentPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { component }));

      expect(findRootComponent(wrapper, component).exists()).to.equal(true);
    });
  });
}

/**
 * MUI components can spread additional props to a documented component.
 */
export function testPropsSpread(element: React.ReactElement, getOptions: () => ConformanceOptions) {
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
    const root = findRootComponent(wrapper, inheritComponent);

    expect(root.props()).to.have.property(testProp, value);
  });
}

/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 */
export function describeRef(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  describe('ref', () => {
    it(`attaches the ref`, () => {
      // type def in ConformanceOptions
      const { inheritComponent, mount, refInstanceof } = getOptions();

      testRef(element, mount, (instance, wrapper) => {
        expect(instance).to.be.instanceof(refInstanceof);

        if (inheritComponent !== undefined && (instance as HTMLElement).nodeType === 1) {
          const rootHost = findOutermostIntrinsic(wrapper);
          expect(instance).to.equal(rootHost.instance());
        }
      });
    });
  });
}

/**
 * Tests that the root component has the root class
 */
export function testRootClass(element: React.ReactElement, getOptions: () => ConformanceOptions) {
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
 */
export function testReactTestRenderer(element: React.ReactElement) {
  it('should render without errors in ReactTestRenderer', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(element, {
        createNodeMock: (node) => {
          return document.createElement(node.type as keyof HTMLElementTagNameMap);
        },
      });
    });
  });
}

function forEachSlot(
  slots: ConformanceOptions['slots'],
  callback: (slotName: string, slot: SlotTestingOptions) => void,
) {
  if (!slots) {
    return;
  }

  const slotNames = Object.keys(slots);
  slotNames.forEach((slotName) => {
    const slot = slots[slotName];
    callback(slotName, slot);
  });
}

function testSlotsProp(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  const { render, slots, testLegacyComponentsProp } = getOptions();

  const CustomComponent = React.forwardRef<
    HTMLElement,
    React.PropsWithChildren<{ className?: string }>
  >(({ className, children }, ref) => (
    <i className={className} ref={ref} data-testid="custom">
      {children}
    </i>
  ));

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`allows overriding the ${slotName} slot with a component using the slots.${slotName} prop`, () => {
      if (!render) {
        throwMissingPropError('render');
      }

      const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

      const components = {
        [slotName]: slotComponent,
      };

      const { queryByTestId } = render(React.cloneElement(element, { slots: components }));
      const renderedElement = queryByTestId('custom');
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

        const components = {
          [slotName]: slotElement,
        };

        const slotProps = {
          [slotName]: {
            'data-testid': 'customized',
          },
        };

        const { queryByTestId } = render(
          React.cloneElement(element, { slots: components, slotProps }),
        );

        const renderedElement = queryByTestId('customized');
        expect(renderedElement).not.to.equal(null);

        expect(renderedElement!.nodeName.toLowerCase()).to.equal(slotElement);
        if (slotOptions.expectedClassName) {
          expect(renderedElement).to.have.class(slotOptions.expectedClassName);
        }
      });
    }

    // For testing Material UI components v5, and v6. Likely to be removed in v7.
    if (testLegacyComponentsProp) {
      it(`allows overriding the ${slotName} slot with a component using the components.${capitalize(
        slotName,
      )} prop`, () => {
        if (!render) {
          throwMissingPropError('render');
        }

        const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

        const components = {
          [capitalize(slotName)]: slotComponent,
        };

        const { queryByTestId } = render(React.cloneElement(element, { components }));
        const renderedElement = queryByTestId('custom');
        expect(renderedElement).not.to.equal(null);
        if (slotOptions.expectedClassName) {
          expect(renderedElement).to.have.class(slotOptions.expectedClassName);
        }
      });

      it(`prioritizes the 'slots.${slotName}' over components.${capitalize(
        slotName,
      )} if both are defined`, () => {
        if (!render) {
          throwMissingPropError('render');
        }

        const ComponentForComponentsProp = React.forwardRef<
          HTMLDivElement,
          { children: React.ReactNode }
        >(({ children }, ref) => {
          const SlotComponent = slotOptions.testWithComponent ?? 'div';
          return (
            <SlotComponent ref={ref} data-testid="from-components">
              {children}
            </SlotComponent>
          );
        });

        const ComponentForSlotsProp = React.forwardRef<
          HTMLDivElement,
          { children: React.ReactNode }
        >(({ children }, ref) => {
          const SlotComponent = slotOptions.testWithComponent ?? 'div';
          return (
            <SlotComponent ref={ref} data-testid="from-slots">
              {children}
            </SlotComponent>
          );
        });

        const components = {
          [capitalize(slotName)]: ComponentForComponentsProp,
        };

        const slotOverrides = {
          [slotName]: ComponentForSlotsProp,
        };

        const { queryByTestId } = render(
          React.cloneElement(element, { components, slots: slotOverrides }),
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

          const components = {
            [capitalize(slotName)]: slotElement,
          };

          const componentsProps = {
            [slotName]: {
              'data-testid': 'customized',
            },
          };

          const { queryByTestId } = render(
            React.cloneElement(element, { components, componentsProps }),
          );

          const renderedElement = queryByTestId('customized');
          expect(renderedElement).not.to.equal(null);

          expect(renderedElement!.nodeName.toLowerCase()).to.equal(slotElement);
          if (slotOptions.expectedClassName) {
            expect(renderedElement).to.have.class(slotOptions.expectedClassName);
          }
        });
      }
    }
  });
}

function testSlotPropsProp(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  const { render, slots, testLegacyComponentsProp } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  forEachSlot(slots, (slotName, slotOptions) => {
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

    if (testLegacyComponentsProp) {
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
    }
  });
}

function testSlotPropsCallback(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  forEachSlot(slots, (slotName) => {
    it(`sets custom properties on the ${slotName} slot's element with the slotProps.${slotName} callback`, () => {
      const slotProps = {
        [slotName]: (ownerState: Record<string, any>) => ({
          'data-testid': ownerState.className,
        }),
      };

      const { queryByTestId } = render(
        React.cloneElement(element, { slotProps, className: 'custom' }),
      );
      const slotComponent = queryByTestId('custom');
      expect(slotComponent).not.to.equal(null);
    });
  });
}

/**
 * MUI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 */
function testComponentsProp(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  describe('prop components:', () => {
    it('can render another root component with the `components` prop', () => {
      const { mount, testComponentsRootPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

      expect(findRootComponent(wrapper, component).exists()).to.equal(true);
    });
  });
}

/**
 * MUI theme has a components section that allows specifying default props.
 * Components from @inheritComponent
 */
function testThemeDefaultProps(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  describe('theme default components:', () => {
    it("respect theme's defaultProps", () => {
      const testProp = 'data-id';
      const {
        muiName,
        render,
        ThemeProvider = MDThemeProvider,
        createTheme = mdCreateTheme,
      } = getOptions();

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
 */
function testThemeStyleOverrides(
  element: React.ReactElement,
  getOptions: () => ConformanceOptions,
) {
  describe('theme style overrides:', () => {
    it("respect theme's styleOverrides custom state", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const {
        muiName,
        testStateOverrides,
        render,
        ThemeProvider = MDThemeProvider,
        createTheme = mdCreateTheme,
      } = getOptions();

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

      if (!testStateOverrides.prop) {
        return;
      }

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
        createTheme = mdCreateTheme,
      } = getOptions();

      const testStyle = {
        mixBlendMode: 'darken',
      };

      function resolveDeepOverrides(
        callback: (styles: Record<string, any>, slot: SlotTestOverride) => void,
      ) {
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
        createTheme = mdCreateTheme,
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

      if (!testStateOverrides.prop) {
        return;
      }

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
 */
function testThemeVariants(element: React.ReactElement, getOptions: () => ConformanceOptions) {
  describe('theme variants:', () => {
    it("respect theme's variants", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const {
        muiName,
        testVariantProps,
        render,
        ThemeProvider = MDThemeProvider,
        createTheme = mdCreateTheme,
      } = getOptions();

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

      const {
        muiName,
        testCustomVariant,
        render,
        ThemeProvider = MDThemeProvider,
        createTheme = mdCreateTheme,
      } = getOptions();

      if (!testCustomVariant) {
        return;
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              root: ({ ownerState }: { ownerState: any }) => ({
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
  componentsProp: testComponentsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
  slotPropsProp: testSlotPropsProp,
  slotPropsCallback: testSlotPropsCallback,
  slotsProp: testSlotsProp,
  themeDefaultProps: testThemeDefaultProps,
  themeStyleOverrides: testThemeStyleOverrides,
  themeVariants: testThemeVariants,
};

/**
 * Tests various aspects of a component that should be equal across MUI
 * components.
 */
function describeConformance(
  minimalElement: React.ReactElement,
  getOptions: () => InputConformanceOptions,
) {
  let originalMatchmedia: typeof window.matchMedia;
  const storage: Record<string, string> = {};
  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key: string) => storage[key],
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () =>
      ({
        addListener: () => {},
        removeListener: () => {},
      } as unknown as MediaQueryList);
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });
  const {
    after: runAfterHook = () => {},
    only = Object.keys(fullSuite),
    slots,
    skip = [],
    wrapMount,
  } = getOptions();

  let filteredTests = Object.keys(fullSuite).filter(
    (testKey) =>
      only.indexOf(testKey) !== -1 && skip.indexOf(testKey as keyof typeof fullSuite) === -1,
  ) as (keyof typeof fullSuite)[];

  const slotBasedTests = ['slotsProp', 'slotPropsProp', 'slotPropsCallback'];

  if (!slots) {
    // if `slots` are not defined, do not run tests that depend on them
    filteredTests = filteredTests.filter((testKey) => !slotBasedTests.includes(testKey));
  }

  const baseMount = createMount();
  const mount = wrapMount !== undefined ? wrapMount(baseMount) : baseMount;

  after(runAfterHook);

  function getTestOptions(): ConformanceOptions {
    return {
      ...getOptions(),
      mount,
    };
  }

  filteredTests.forEach((testKey) => {
    const test = fullSuite[testKey];
    test(minimalElement, getTestOptions);
  });
}

export default createDescribe('MUI component API', describeConformance);
