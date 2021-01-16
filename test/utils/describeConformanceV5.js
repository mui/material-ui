/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createClientRender } from './createClientRender';
import {
  testClassName,
  testPropsSpread,
  describeRef,
  findRootComponent,
  testReactTestRenderer,
  randomStringValue,
} from './describeConformance';
import findOutermostIntrinsic from './findOutermostIntrinsic';

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
 * Material-UI theme has a components section that allows specifying default props, overrides and variants
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeComponents(element, getOptions) {
  const render = createClientRender();

  describe('theme: components', () => {
    it("respect theme's defaultProps", () => {
      const { muiName, testThemeComponentsDefaultPropName: testProp = 'id' } = getOptions();
      const theme = createMuiTheme({
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

    it("respect theme's styleOverrides custom state", () => {
      const { muiName, testStateOverrides } = getOptions();

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

      const { container } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );
      expect(container.firstChild).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's styleOverrides slots", () => {
      const { muiName, testDeepOverrides } = getOptions();

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

      const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

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

      const { container: containerWithoutRootOverrides } = render(
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

    it("respect theme's variants", () => {
      const { muiName, testVariantProps = {} } = getOptions();

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
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
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
    const { classes, mount } = getOptions();
    if (classes.root == null) {
      return;
    }

    const className = randomStringValue();
    let wrapper = mount(React.cloneElement(element, { className }));

    // we established that the root component renders the outermost host previously. We immediately
    // jump to the host component because some components pass the `root` class
    // to the `classes` prop of the root component.
    // https://github.com/mui-org/material-ui/blob/f9896bcd129a1209153106296b3d2487547ba205/packages/material-ui/src/OutlinedInput/OutlinedInput.js#L101
    expect(findOutermostIntrinsic(wrapper).hasClass(classes.root)).to.equal(true);
    expect(findOutermostIntrinsic(wrapper).hasClass(className)).to.equal(true);

    // Test that classes prop works
    const classesProp = { ...classes };
    classesProp.root = `${classesProp.root} ${className}`;

    wrapper = mount(React.cloneElement(element, { classes: classesProp }));
    expect(findOutermostIntrinsic(wrapper).hasClass(className)).to.equal(true);
    expect(findOutermostIntrinsic(wrapper).getDOMNode().getAttribute('classes')).to.equal(null);
  });
}

const fullSuite = {
  componentsProp: testComponentsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
  themeComponents: testThemeComponents,
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
