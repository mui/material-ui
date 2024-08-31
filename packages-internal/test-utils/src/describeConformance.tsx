/* eslint-env mocha */
import * as React from 'react';
import { expect } from 'chai';
import createDescribe from './createDescribe';
import { MuiRenderResult } from './createRenderer';

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
  testWithElement?: keyof React.JSX.IntrinsicElements | null;
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

export interface ConformanceOptions {
  muiName: string;
  classes: { root: string };
  refInstanceof: any;
  after?: () => void;
  inheritComponent?: React.ElementType;
  render: (node: React.ReactElement<any>) => MuiRenderResult | Promise<MuiRenderResult>;
  only?: Array<keyof typeof fullSuite>;
  skip?: Array<keyof typeof fullSuite | 'classesRoot'>;
  testComponentsRootPropWith?: string;
  /**
   * A custom React component to test if the component prop is implemented correctly.
   *
   * It must either:
   * - Be a string that is a valid HTML tag, or
   * - A component that spread props to the underlying rendered element.
   *
   * If not provided, the default 'em' element is used.
   */
  testComponentPropWith?: string | React.ElementType;
  testDeepOverrides?: SlotTestOverride | SlotTestOverride[];
  testRootOverrides?: SlotTestOverride;
  testStateOverrides?: { prop?: string; value?: any; styleKey: string };
  testCustomVariant?: boolean;
  testVariantProps?: object;
  testLegacyComponentsProp?: boolean;
  slots?: Record<string, SlotTestingOptions>;
  ThemeProvider?: React.ElementType;
  createTheme?: (arg: any) => any;
}

/**
 * Glossary
 * - root component:
 *   - renders the outermost host component
 *   - has the `root` class if the component has one
 *   - excess props are spread to this component
 *   - has the type of `inheritComponent`
 */

export function randomStringValue() {
  return `s${Math.random().toString(36).slice(2)}`;
}

function throwMissingPropError(field: string): never {
  throw new Error(`missing "${field}" in options

  > describeConformance(element, () => options)
`);
}

/**
 * MUI components have a `className` prop. The `className` is applied to
 * the root component.
 */
export function testClassName(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  it('applies the className to the root component', async () => {
    const { render } = getOptions();

    if (!render) {
      throwMissingPropError('render');
    }

    const className = randomStringValue();
    const testId = randomStringValue();

    const { getByTestId } = await render(
      React.cloneElement(element, { className, 'data-testid': testId }),
    );

    expect(getByTestId(testId)).to.have.class(className);
  });
}

/**
 * MUI components have a `component` prop that allows rendering a different
 * Component from @inheritComponent
 */
export function testComponentProp(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('prop: component', () => {
    it('can render another root component with the `component` prop', async () => {
      const { render, testComponentPropWith: component = 'em' } = getOptions();
      if (!render) {
        throwMissingPropError('render');
      }

      const testId = randomStringValue();

      if (typeof component === 'string') {
        const { getByTestId } = await render(
          React.cloneElement(element, { component, 'data-testid': testId }),
        );
        expect(getByTestId(testId)).not.to.equal(null);
        expect(getByTestId(testId).nodeName.toLowerCase()).to.eq(component);
      } else {
        const componentWithTestId = (props: {}) =>
          React.createElement(component, { ...props, 'data-testid': testId });
        const { getByTestId } = await render(
          React.cloneElement(element, {
            component: componentWithTestId,
          }),
        );
        expect(getByTestId(testId)).not.to.equal(null);
      }
    });
  });
}

/**
 * MUI components spread additional props to its root.
 */
export function testPropsSpread(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  it(`spreads props to the root component`, async () => {
    // type def in ConformanceOptions
    const { render } = getOptions();

    if (!render) {
      throwMissingPropError('render');
    }

    const testProp = 'data-test-props-spread';
    const value = randomStringValue();
    const testId = randomStringValue();

    const { getByTestId } = await render(
      React.cloneElement(element, { [testProp]: value, 'data-testid': testId }),
    );

    expect(getByTestId(testId)).to.have.attribute(testProp, value);
  });
}

/**
 * Tests that the `ref` of a component will return the correct instance
 *
 * This is determined by a given constructor i.e. a React.Component or HTMLElement for
 * components that forward their ref and attach it to a host component.
 */
export function describeRef(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('ref', () => {
    it(`attaches the ref`, async () => {
      // type def in ConformanceOptions
      const { render, refInstanceof } = getOptions();

      if (!render) {
        throwMissingPropError('render');
      }

      const ref = React.createRef();

      await render(React.cloneElement(element, { ref }));

      expect(ref.current).to.be.instanceof(refInstanceof);
    });
  });
}

/**
 * Tests that the root component has the root class
 */
export function testRootClass(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  it('applies the root class to the root component if it has this class', async () => {
    const { classes, render, skip } = getOptions();
    if (classes.root == null) {
      return;
    }

    const className = randomStringValue();
    const classesRootClassname = randomStringValue();
    const { container } = await render(
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

function testSlotsProp(element: React.ReactElement<any>, getOptions: () => ConformanceOptions) {
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
    it(`allows overriding the ${slotName} slot with a component using the slots.${slotName} prop`, async () => {
      if (!render) {
        throwMissingPropError('render');
      }

      const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

      const components = {
        [slotName]: slotComponent,
      };

      const { queryByTestId } = await render(React.cloneElement(element, { slots: components }));
      const renderedElement = queryByTestId('custom');
      expect(renderedElement).not.to.equal(null);
      if (slotOptions.expectedClassName) {
        expect(renderedElement).to.have.class(slotOptions.expectedClassName);
      }
    });

    if (slotOptions.testWithElement !== null) {
      it(`allows overriding the ${slotName} slot with an element using the slots.${slotName} prop`, async () => {
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

        const { queryByTestId } = await render(
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
      )} prop`, async () => {
        if (!render) {
          throwMissingPropError('render');
        }

        const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

        const components = {
          [capitalize(slotName)]: slotComponent,
        };

        const { queryByTestId } = await render(React.cloneElement(element, { components }));
        const renderedElement = queryByTestId('custom');
        expect(renderedElement).not.to.equal(null);
        if (slotOptions.expectedClassName) {
          expect(renderedElement).to.have.class(slotOptions.expectedClassName);
        }
      });

      it(`prioritizes the 'slots.${slotName}' over components.${capitalize(
        slotName,
      )} if both are defined`, async () => {
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

        const { queryByTestId } = await render(
          React.cloneElement(element, { components, slots: slotOverrides }),
        );

        expect(queryByTestId('from-slots')).not.to.equal(null);
        expect(queryByTestId('from-components')).to.equal(null);
      });

      if (slotOptions.testWithElement !== null) {
        it(`allows overriding the ${slotName} slot with an element using the components.${capitalize(
          slotName,
        )} prop`, async () => {
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

          const { queryByTestId } = await render(
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

function testSlotPropsProp(element: React.ReactElement<any>, getOptions: () => ConformanceOptions) {
  const { render, slots, testLegacyComponentsProp } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`sets custom properties on the ${slotName} slot's element with the slotProps.${slotName} prop`, async () => {
      const slotProps = {
        [slotName]: {
          'data-testid': 'custom',
        },
      };

      const { queryByTestId } = await render(React.cloneElement(element, { slotProps }));
      const slotComponent = queryByTestId('custom');
      expect(slotComponent).not.to.equal(null);

      if (slotOptions.expectedClassName) {
        expect(slotComponent).to.have.class(slotOptions.expectedClassName);
      }
    });

    if (slotOptions.expectedClassName) {
      it(`merges the class names provided in slotsProps.${slotName} with the built-in ones`, async () => {
        const slotProps = {
          [slotName]: {
            'data-testid': 'custom',
            className: randomStringValue(),
          },
        };

        const { getByTestId } = await render(React.cloneElement(element, { slotProps }));

        expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
        expect(getByTestId('custom')).to.have.class(slotProps[slotName].className);
      });
    }

    if (testLegacyComponentsProp) {
      it(`sets custom properties on the ${slotName} slot's element with the componentsProps.${slotName} prop`, async () => {
        const componentsProps = {
          [slotName]: {
            'data-testid': 'custom',
          },
        };

        const { queryByTestId } = await render(React.cloneElement(element, { componentsProps }));
        const slotComponent = queryByTestId('custom');
        expect(slotComponent).not.to.equal(null);

        if (slotOptions.expectedClassName) {
          expect(slotComponent).to.have.class(slotOptions.expectedClassName);
        }
      });

      it(`prioritizes the 'slotProps.${slotName}' over componentsProps.${slotName} if both are defined`, async () => {
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

        const { queryByTestId } = await render(
          React.cloneElement(element, { componentsProps, slotProps }),
        );
        const slotComponent = queryByTestId('custom');
        expect(slotComponent).to.have.attribute('data-from-slot-props', 'true');
        expect(slotComponent).not.to.have.attribute('data-from-components-props');
      });
    }
  });
}

function testSlotPropsCallback(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  forEachSlot(slots, (slotName) => {
    it(`sets custom properties on the ${slotName} slot's element with the slotProps.${slotName} callback`, async () => {
      const slotProps = {
        [slotName]: (ownerState: Record<string, any>) => ({
          'data-testid': ownerState.className,
        }),
      };

      const { queryByTestId } = await render(
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
function testComponentsProp(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('prop components:', () => {
    it('can render another root component with the `components` prop', async () => {
      const { render, testComponentsRootPropWith: component = 'em' } = getOptions();
      if (!render) {
        throwMissingPropError('render');
      }

      const testId = randomStringValue();

      const { getByTestId } = await render(
        React.cloneElement(element, { components: { Root: component }, 'data-testid': testId }),
      );
      expect(getByTestId(testId)).not.to.equal(null);
      expect(getByTestId(testId).nodeName.toLowerCase()).to.eq(component);
    });
  });
}

/**
 * MUI theme has a components section that allows specifying default props.
 * Components from @inheritComponent
 */
function testThemeDefaultProps(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('theme default components:', () => {
    it("respect theme's defaultProps", async () => {
      const testProp = 'data-id';
      const { muiName, render, ThemeProvider, createTheme } = getOptions();

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
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

      const { container } = await render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.have.attribute(testProp, 'testProp');
    });
  });
}

/**
 * MUI theme has a components section that allows specifying style overrides.
 * Components from @inheritComponent
 */
function testThemeStyleOverrides(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('theme style overrides:', () => {
    it("respect theme's styleOverrides custom state", async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const { muiName, testStateOverrides, render, ThemeProvider, createTheme } = getOptions();

      if (!testStateOverrides) {
        return;
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
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

      const { container } = await render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );

      expect(container.firstChild).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's styleOverrides slots", async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const {
        muiName,
        testDeepOverrides,
        testRootOverrides = { slotName: 'root' },
        render,
        ThemeProvider,
        createTheme,
      } = getOptions();

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
      }

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

      const { container, setProps } = await render(
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

    it('overrideStyles does not replace each other in slots', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, classes, testStateOverrides, render, ThemeProvider, createTheme } =
        getOptions();

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
      }

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

      await render(
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
function testThemeVariants(element: React.ReactElement<any>, getOptions: () => ConformanceOptions) {
  describe('theme variants:', () => {
    it("respect theme's variants", async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testVariantProps, render, ThemeProvider, createTheme } = getOptions();

      if (!testVariantProps) {
        throw new Error('missing testVariantProps');
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
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

      const { getByTestId } = await render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
    });

    it('supports custom variant', async function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testCustomVariant, render, ThemeProvider, createTheme } = getOptions();

      if (!ThemeProvider) {
        throwMissingPropError('ThemeProvider');
      }

      if (!createTheme) {
        throwMissingPropError('createTheme');
      }

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

      const { getByTestId } = await render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { variant: 'unknown', 'data-testid': 'custom-variant' })}
        </ThemeProvider>,
      );

      expect(getByTestId('custom-variant')).toHaveComputedStyle({ mixBlendMode: 'darken' });
    });
  });
}

/**
 * MUI theme supports custom palettes.
 * The components that iterate over the palette via `variants` should be able to render with or without applying the custom palette styles.
 */
function testThemeCustomPalette(
  element: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
) {
  describe('theme extended palette:', () => {
    it('should render without errors', function test() {
      const { render, ThemeProvider, createTheme } = getOptions();
      if (!/jsdom/.test(window.navigator.userAgent) || !render || !ThemeProvider || !createTheme) {
        this.skip();
      }

      const theme = createTheme({
        palette: {
          custom: {
            main: '#ff5252',
          },
          unknown: null,
        },
      });

      expect(() => render(<ThemeProvider theme={theme}>{element}</ThemeProvider>)).not.to.throw();
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
  slotPropsProp: testSlotPropsProp,
  slotPropsCallback: testSlotPropsCallback,
  slotsProp: testSlotsProp,
  themeDefaultProps: testThemeDefaultProps,
  themeStyleOverrides: testThemeStyleOverrides,
  themeVariants: testThemeVariants,
  themeCustomPalette: testThemeCustomPalette,
};

/**
 * Tests various aspects of a component that should be equal across MUI
 * components.
 */
function describeConformance(
  minimalElement: React.ReactElement<any>,
  getOptions: () => ConformanceOptions,
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
        // Keep mocking legacy methods because @mui/material v5 still uses them
        addListener: () => {},
        addEventListener: () => {},
        removeListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });
  const {
    after: runAfterHook = () => {},
    only = Object.keys(fullSuite),
    slots,
    skip = [],
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

  after(runAfterHook);

  filteredTests.forEach((testKey) => {
    const test = fullSuite[testKey];
    test(minimalElement, getOptions);
  });
}

export default createDescribe('MUI component API', describeConformance);
