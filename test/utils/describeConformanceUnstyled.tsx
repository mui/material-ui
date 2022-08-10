import * as React from 'react';
import { expect } from 'chai';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { MuiRenderResult, RenderOptions } from './createRenderer';
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
  testWithElement?: keyof JSX.IntrinsicElements | null;
  expectedClassName: string;
  isOptional?: boolean;
}

export interface UnstyledConformanceOptions
  extends Omit<Partial<ConformanceOptions>, 'render' | 'skip' | 'classes'> {
  render: (
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions | undefined,
  ) => MuiRenderResult;
  skip?: (keyof typeof fullSuite)[];
  slots: Record<string, SlotTestingOptions>;
  testComponentPropWith?: string;
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
  lang: string;
}

interface WithOwnerState {
  ownerState: Record<string, any>;
  expectedOwnerState: Record<string, any>;
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
  const { render, testComponentPropWith: Element = 'div' } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  it('forwards custom props to the root element if a component is provided', () => {
    const CustomRoot = React.forwardRef(
      ({ fooBar, lang }: WithCustomProp, ref: React.ForwardedRef<any>) => {
        // @ts-ignore
        return <Element ref={ref} data-foobar={fooBar} lang={lang} />;
      },
    );

    const otherProps = {
      lang: 'fr',
      fooBar: randomStringValue(),
    };

    const { container } = render(
      React.cloneElement(element, { components: { Root: CustomRoot }, ...otherProps }),
    );

    expect(container.firstChild).to.have.attribute('lang', otherProps.lang);
    expect(container.firstChild).to.have.attribute('data-foobar', otherProps.fooBar);
  });

  it('does forward standard props to the root element if an intrinsic element is provided', () => {
    const otherProps = {
      lang: 'fr',
      'data-foobar': randomStringValue(),
    };

    const { container } = render(
      React.cloneElement(element, { components: { Root: Element }, ...otherProps }),
    );

    expect(container.firstChild).to.have.attribute('lang', otherProps.lang);
    expect(container.firstChild).to.have.attribute('data-foobar', otherProps['data-foobar']);
  });
}

function testComponentsProp(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render, slots, testComponentPropWith: Element = 'div' } = getOptions();

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

    if (slotOptions.testWithElement !== null) {
      it(`allows overriding the ${capitalize(slotName)} slot with an element`, () => {
        const slotElement = slotOptions.testWithElement ?? 'i';

        const components = {
          [capitalize(slotName)]: slotElement,
        };

        const componentsProps = {
          [slotName]: {
            'data-testid': 'customized',
          },
        };

        const { getByTestId } = render(
          React.cloneElement(element, { components, componentsProps }),
        );
        const renderedElement = getByTestId('customized');
        expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
        expect(renderedElement).to.have.class(slotOptions.expectedClassName);
      });
    }

    if (slotOptions.isOptional) {
      it(`alows omitting the optional ${capitalize(slotName)} slot by providing null`, () => {
        const components = {
          [capitalize(slotName)]: null,
        };

        const { container } = render(React.cloneElement(element, { components }));
        expect(container.querySelectorAll(`.${slotOptions.expectedClassName}`)).to.have.length(0);
      });
    }
  });

  it('uses the component provided in component prop when both component and components.Root are provided', () => {
    const RootComponentA = React.forwardRef(
      ({ children }: React.PropsWithChildren<{}>, ref: React.Ref<any>) => (
        // @ts-ignore
        <Element data-testid="a" ref={ref}>
          {children}
        </Element>
      ),
    );

    const RootComponentB = React.forwardRef(
      ({ children }: React.PropsWithChildren<{}>, ref: React.Ref<any>) => (
        // @ts-ignore
        <Element data-testid="b" ref={ref}>
          {children}
        </Element>
      ),
    );

    const { queryByTestId } = render(
      React.cloneElement(element, {
        component: RootComponentA,
        components: { Root: RootComponentB },
      }),
    );

    expect(queryByTestId('a')).not.to.equal(null);
    expect(queryByTestId('b')).to.equal(null);
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

interface TestOwnerState {
  'data-testid'?: string;
}

function testComponentsPropsCallbacks(
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
    it(`sets custom properties on ${capitalize(
      slotName,
    )} slot's element with a callback function`, () => {
      const testId = randomStringValue();
      const className = randomStringValue();

      const componentsProps = {
        [slotName]: (ownerState: TestOwnerState) => ({
          'data-testid': `${ownerState['data-testid']}-${slotName}`,
          className,
        }),
      };

      const { getByTestId } = render(
        React.cloneElement(element, { componentsProps, 'data-testid': testId }),
      );

      expect(getByTestId(`${testId}-${slotName}`)).to.have.class(slotOptions.expectedClassName);
      expect(getByTestId(`${testId}-${slotName}`)).to.have.class(className);
    });
  });
}

function testOwnerStatePropagation(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render, slots, testComponentPropWith: Element = 'div' } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  if (!slots) {
    throwMissingPropError('slots');
  }

  forEachSlot(slots, (slotName) => {
    it(`sets the ownerState prop on ${capitalize(slotName)} slot's component`, () => {
      const TestComponent = React.forwardRef(
        ({ ownerState, expectedOwnerState }: WithOwnerState, ref: React.Ref<any>) => {
          expect(ownerState).not.to.equal(undefined);
          expect(ownerState).to.deep.include(expectedOwnerState);
          // @ts-ignore
          return <Element ref={ref} />;
        },
      );

      const components = {
        [capitalize(slotName)]: TestComponent,
      };

      const componentsProps = {
        [slotName]: {
          expectedOwnerState: {
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
  componentsPropsCallbacks: testComponentsPropsCallbacks,
  mergeClassName: testClassName,
  propsSpread: testPropForwarding,
  reactTestRenderer: testReactTestRenderer,
  refForwarding: describeRef,
  ownerStatePropagation: testOwnerStatePropagation,
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

  describe('MUI unstyled component API', () => {
    after(runAfterHook);

    filteredTests.forEach((testKey) => {
      const test = fullSuite[testKey];
      test(minimalElement, getOptions as any);
    });
  });
}
