import * as React from 'react';
import { expect } from 'chai';
import { unstable_capitalize as capitalize } from '@material-ui/utils';
import { MuiRenderResult, RenderOptions } from './createClientRender';
import {
  ConformanceOptions,
  describeRef,
  randomStringValue,
  testClassName,
  testComponentProp,
  testReactTestRenderer,
} from './describeConformance';

export interface SlotTestingOptions {
  testWithComponent?: React.ComponentType;
  testWithElement?: keyof JSX.IntrinsicElements;
  expectedClassName: string;
}

export interface UnstyledConformanceOptions
  extends Omit<Partial<ConformanceOptions>, 'render' | 'skip' | 'classes'> {
  render: (
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions | undefined,
  ) => MuiRenderResult;
  skip?: (keyof typeof fullSuite)[];
  slots: Record<string, SlotTestingOptions>;
}

function throwMissingPropError(field: string): never {
  throw new Error(`missing "${field}" in options

  > describeConformanceUnstyled(element, () => options)
`);
}

interface WithClassName {
  className: string;
}

interface WithCustomProp {
  fooBar: string;
  'aria-label': string;
  tabIndex: number;
}

interface WithStyleProps {
  styleProps: Record<string, any>;
  expectedStyleProps: Record<string, any>;
}

function forEachSlot(
  slots: Record<string, SlotTestingOptions>,
  callback: (slotName: string, options: SlotTestingOptions) => void,
) {
  const slotNames = Object.keys(slots);
  for (let i = 0; i < slotNames.length; i += 1) {
    const slotName = slotNames[i];
    const slot = slots[slotName];

    callback(slotName, slot);
  }
}

function testPropForwarding(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  it('forwards custom props to the root element if a component is provided', () => {
    const CustomRoot = ({ fooBar, tabIndex, 'aria-label': ariaLabel }: WithCustomProp) => {
      return <div data-foobar={fooBar} tabIndex={tabIndex} aria-label={ariaLabel} />;
    };

    const otherProps = {
      tabIndex: '0',
      'aria-label': randomStringValue(),
      fooBar: randomStringValue(),
    };

    const { container } = render(
      React.cloneElement(element, { components: { Root: CustomRoot }, ...otherProps }),
    );

    expect(container.firstChild).to.have.attribute('tabindex', otherProps.tabIndex.toString());
    expect(container.firstChild).to.have.attribute('aria-label', otherProps['aria-label']);
    expect(container.firstChild).to.have.attribute('data-foobar', otherProps.fooBar);
  });

  it('does forward standard props to the root element if an intrinsic element is provided', () => {
    const otherProps = {
      tabIndex: '0',
      'aria-label': randomStringValue(),
    };

    const { container } = render(
      React.cloneElement(element, { components: { Root: 'div' }, ...otherProps }),
    );

    expect(container.firstChild).to.have.attribute('tabindex', otherProps.tabIndex);
    expect(container.firstChild).to.have.attribute('aria-label', otherProps['aria-label']);
  });
}

function testComponentsProp(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  if (!slots) {
    throwMissingPropError('slots');
  }

  const CustomComponent = React.forwardRef(({ className }: WithClassName, ref: React.Ref<any>) => (
    <i className={className} ref={ref} data-testid="custom" />
  ));

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`allows overriding the ${capitalize(slotName)} slot with a component`, () => {
      const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

      const components = {
        [capitalize(slotName)]: slotComponent,
      };

      const { getByTestId } = render(React.cloneElement(element, { components }));
      const renderedElement = getByTestId('custom');
      expect(renderedElement).to.have.class(slotOptions.expectedClassName);
    });

    it(`allows overriding the ${capitalize(slotName)} slot with an element`, () => {
      const slotElement = slotOptions.testWithElement ?? 'i';

      const components = {
        [capitalize(slotName)]: slotElement,
      };

      const { container } = render(React.cloneElement(element, { components }));
      const thumb = container.querySelector(slotElement);
      expect(thumb).to.have.class(slotOptions.expectedClassName);
    });
  });

  it('uses the component provided in component prop when both component and components.Root are provided', () => {
    const RootComponentA = React.forwardRef(
      ({ children }: React.PropsWithChildren<{}>, ref: React.Ref<any>) => (
        <div data-testid="a" ref={ref}>
          {children}
        </div>
      ),
    );

    const RootComponentB = React.forwardRef(
      ({ children }: React.PropsWithChildren<{}>, ref: React.Ref<any>) => (
        <div data-testid="b" ref={ref}>
          {children}
        </div>
      ),
    );

    const { queryByTestId } = render(
      React.cloneElement(element, {
        component: RootComponentA,
        components: { Root: RootComponentB },
      }),
    );

    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(queryByTestId('a')).to.exist;
    expect(queryByTestId('b')).not.to.exist;
  });
}

function testComponentsPropsProp(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  if (!slots) {
    throwMissingPropError('slots');
  }

  forEachSlot(slots, (slotName, slotOptions) => {
    it(`sets custom properties on ${capitalize(slotName)} slot's element`, () => {
      const componentsProps = {
        [slotName]: {
          'data-testid': 'custom',
        },
      };

      const { getByTestId } = render(React.cloneElement(element, { componentsProps }));

      expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
    });

    it(`merges the class names provided in componentsProps.${slotName} with the built-in ones`, () => {
      const componentsProps = {
        [slotName]: {
          'data-testid': 'custom',
          className: randomStringValue(),
        },
      };

      const { getByTestId } = render(React.cloneElement(element, { componentsProps }));

      expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
      expect(getByTestId('custom')).to.have.class(componentsProps[slotName].className);
    });
  });
}

function testStylePropsPropagation(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render, slots } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  if (!slots) {
    throwMissingPropError('slots');
  }

  forEachSlot(slots, (slotName) => {
    it(`sets the styleProps prop on ${capitalize(slotName)} slot's component`, () => {
      const TestComponent = React.forwardRef(
        ({ styleProps, expectedStyleProps }: WithStyleProps, ref: React.Ref<any>) => {
          expect(styleProps).to.deep.include(expectedStyleProps);
          return <div ref={ref} />;
        },
      );

      const components = {
        [capitalize(slotName)]: TestComponent,
      };

      const componentsProps = {
        [slotName]: {
          expectedStyleProps: {
            id: 'foo',
          },
        },
      };

      render(React.cloneElement(element, { components, componentsProps, id: 'foo' }));
    });
  });
}

const fullSuite = {
  componentProp: testComponentProp,
  componentsProp: testComponentsProp,
  componentsPropsProp: testComponentsPropsProp,
  mergeClassName: testClassName,
  propsSpread: testPropForwarding,
  reactTestRenderer: testReactTestRenderer,
  refForwarding: describeRef,
  stylePropsPropagation: testStylePropsPropagation,
};

export default function describeConformanceUnstyled(
  minimalElement: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();

  const filteredTests = Object.keys(fullSuite).filter(
    (testKey) =>
      only.indexOf(testKey) !== -1 && skip.indexOf(testKey as keyof typeof fullSuite) === -1,
  ) as (keyof typeof fullSuite)[];

  describe('Material-UI unstyled component API', () => {
    after(runAfterHook);

    filteredTests.forEach((testKey) => {
      const test = fullSuite[testKey];
      test(minimalElement, getOptions as any);
    });
  });
}
