/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createClientRender } from './createClientRender';
import {
  testComponentProp,
  testClassName,
  testPropsSpread,
  describeRef,
  findRootComponent,
  testReactTestRenderer,
  testRootClass,
} from './describeConformance';

/**
 * Material-UI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testComponentsProp(element, getOptions) {
  describe('prop: components', () => {
    it('can render another root component with the `components` prop', () => {
      const { mount, testComponentsRootPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

      expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying default props.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeDefaultProps(element, getOptions) {
  const render = createClientRender();

  describe('theme: default components', () => {
    it("respect theme's defaultProps", () => {
      const testProp = 'data-id';
      const { muiName, wrapper } = getOptions();
      const theme = createMuiTheme({
        components: {
          [muiName]: {
            defaultProps: {
              [testProp]: 'testProp',
            },
          },
        },
      });

      if (wrapper) {
        const { container } = render(
          <ThemeProvider theme={theme}>{wrapper(element)}</ThemeProvider>,
        );

        expect(container.firstChild.firstChild).to.have.attribute(testProp, 'testProp');
      } else {
        const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

        expect(container.firstChild).to.have.attribute(testProp, 'testProp');
      }
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying style overrides.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeStyleOverrides(element, getOptions) {
  const render = createClientRender();

  describe('theme: style overrides', () => {
    it("respect theme's styleOverrides custom state", () => {
      const { muiName, testStateOverrides, wrapper } = getOptions();

      if (!testStateOverrides) {
        return;
      }

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createMuiTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              [testStateOverrides.styleKey]: testStyle,
            },
          },
        },
      });

      let testElement;

      const { container } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(wrapper ? wrapper(element) : element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );

      if (wrapper) {
        testElement = container.firstChild.firstChild;
      } else {
        testElement = container.firstChild;
      }
      expect(testElement).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's styleOverrides slots", () => {
      const { muiName, testDeepOverrides, wrapper } = getOptions();

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createMuiTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              root: {
                ...testStyle,
                ...(testDeepOverrides && {
                  [`& .${testDeepOverrides.slotClassName}`]: {
                    marginBottom: '10px',
                  },
                }),
              },
              ...(testDeepOverrides && {
                [testDeepOverrides.slotName]: {
                  marginTop: '10px',
                },
              }),
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>{wrapper ? wrapper(element) : element}</ThemeProvider>,
      );

      let testElement;

      if (wrapper) {
        testElement = container.firstChild.firstChild;
      } else {
        testElement = container.firstChild;
      }

      expect(testElement).to.toHaveComputedStyle(testStyle);

      if (testDeepOverrides) {
        expect(
          testElement.getElementsByClassName(testDeepOverrides.slotClassName)[0],
        ).to.toHaveComputedStyle({
          marginBottom: '10px',
          marginTop: '10px',
        });
      }

      const themeWithoutRootOverrides = createMuiTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              ...(testDeepOverrides && {
                [testDeepOverrides.slotName]: {
                  marginTop: '10px',
                },
              }),
            },
          },
        },
      });

      const { container: containerWithoutRootOverrides } = render(
        <ThemeProvider theme={themeWithoutRootOverrides}>
          {wrapper ? wrapper(element) : element}
        </ThemeProvider>,
      );

      let testElementWithoutRootOverrider;
      if (wrapper) {
        testElementWithoutRootOverrider = containerWithoutRootOverrides.firstChild.firstChild;
      } else {
        testElementWithoutRootOverrider = containerWithoutRootOverrides.firstChild;
      }

      if (testDeepOverrides) {
        expect(
          testElementWithoutRootOverrider.getElementsByClassName(
            testDeepOverrides.slotClassName,
          )[0],
        ).to.toHaveComputedStyle({
          marginTop: '10px',
        });
      }
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying custom variants.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeVariants(element, getOptions) {
  const render = createClientRender();

  describe('theme: variants', () => {
    it("respect theme's variants", () => {
      const { muiName, testVariantProps = {}, wrapper } = getOptions();

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createMuiTheme({
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
          {React.cloneElement(wrapper ? wrapper(element) : element, {
            ...testVariantProps,
            'data-testid': 'with-props',
          })}
          {React.cloneElement(wrapper ? wrapper(element) : element, {
            'data-testid': 'without-props',
          })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
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
  themeDefaultProps: testThemeDefaultProps,
  themeStyleOverrides: testThemeStyleOverrides,
  themeVariants: testThemeVariants,
};

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformanceV5(minimalElement, getOptions) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();
  describe('Material-UI component API', () => {
    after(runAfterHook);

    Object.keys(fullSuite)
      .filter((testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
      .forEach((testKey) => {
        const test = fullSuite[testKey];
        test(minimalElement, getOptions);
      });
  });
}
