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
      const { muiName, render: testRender = render } = getOptions();
      const theme = createMuiTheme({
        components: {
          [muiName]: {
            defaultProps: {
              [testProp]: 'testProp',
            },
          },
        },
      });

      const { container } = testRender(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.have.attribute(testProp, 'testProp');
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
    it("respect theme's styleOverrides custom state", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const { muiName, testStateOverrides, render: testRender = render } = getOptions();

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

      const { container } = testRender(
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

      const { muiName, testDeepOverrides, render: testRender = render } = getOptions();

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

      const { container } = testRender(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.toHaveComputedStyle(testStyle);

      if (testDeepOverrides) {
        expect(
          container.firstChild.getElementsByClassName(testDeepOverrides.slotClassName)[0],
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

      const { container: containerWithoutRootOverrides } = testRender(
        <ThemeProvider theme={themeWithoutRootOverrides}>{element}</ThemeProvider>,
      );

      if (testDeepOverrides) {
        expect(
          containerWithoutRootOverrides.firstChild.getElementsByClassName(
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
    it("respect theme's variants", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testVariantProps = {}, render: testRender = render } = getOptions();

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

      const { getByTestId } = testRender(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
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
