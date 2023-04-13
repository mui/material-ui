import * as React from 'react';
import { expect } from 'chai';
import { ClassNameConfigurator } from '@mui/base/utils';
import { MuiRenderResult, RenderOptions, screen } from './createRenderer';
import createDescribe from './createDescribe';
import {
  ConformanceOptions,
  SlotTestingOptions,
  describeRef,
  randomStringValue,
  testClassName,
  testComponentProp,
  testReactTestRenderer,
} from './describeConformance';

export interface UnstyledConformanceOptions
  extends Omit<Partial<ConformanceOptions>, 'render' | 'skip' | 'classes'> {
  render: (
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions | undefined,
  ) => MuiRenderResult;
  skip?: (keyof typeof fullSuite)[];
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
        return <Element ref={ref} data-foobar={fooBar} lang={lang} data-testid="custom-root" />;
      },
    );

    const otherProps = {
      lang: 'fr',
      fooBar: randomStringValue(),
    };

    render(React.cloneElement(element, { slots: { root: CustomRoot }, ...otherProps }));

    const customRoot = screen.getByTestId('custom-root');
    expect(customRoot).to.have.attribute('lang', otherProps.lang);
    expect(customRoot).to.have.attribute('data-foobar', otherProps.fooBar);
  });

  it('does forward standard props to the root element if an intrinsic element is provided', () => {
    const otherProps = {
      lang: 'fr',
      'data-foobar': randomStringValue(),
      'data-testid': 'custom-root',
    };

    render(React.cloneElement(element, { slots: { root: Element }, ...otherProps }));

    const customRoot = screen.getByTestId('custom-root');
    expect(customRoot).to.have.attribute('lang', otherProps.lang);
    expect(customRoot).to.have.attribute('data-foobar', otherProps['data-foobar']);
  });
}

function testSlotsProp(element: React.ReactElement, getOptions: () => UnstyledConformanceOptions) {
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
    it(`allows overriding the ${slotName} slot with a component`, () => {
      const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

      const components = {
        [slotName]: slotComponent,
      };

      const { getByTestId } = render(React.cloneElement(element, { slots: components }));
      const renderedElement = getByTestId('custom');
      expect(renderedElement).to.have.class(slotOptions.expectedClassName);
    });

    if (slotOptions.testWithElement !== null) {
      it(`allows overriding the ${slotName} slot with an element`, () => {
        const slotElement = slotOptions.testWithElement ?? 'i';

        const components = {
          [slotName]: slotElement,
        };

        const slotProps = {
          [slotName]: {
            'data-testid': 'customized',
          },
        };

        const { getByTestId } = render(
          React.cloneElement(element, { slots: components, slotProps }),
        );
        const renderedElement = getByTestId('customized');
        expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
        expect(renderedElement).to.have.class(slotOptions.expectedClassName);
      });
    }

    if (slotOptions.isOptional) {
      it(`allows omitting the optional ${slotName} slot by providing null`, () => {
        const components = {
          [slotName]: null,
        };

        const { container } = render(React.cloneElement(element, { slots: components }));
        expect(container.querySelectorAll(`.${slotOptions.expectedClassName}`)).to.have.length(0);
      });
    }
  });

  it('uses the component provided in the `component` prop when both `component` and `slots.root` are provided', () => {
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
        slots: { root: RootComponentB },
      }),
    );

    expect(queryByTestId('a')).not.to.equal(null);
    expect(queryByTestId('b')).to.equal(null);
  });
}

function testSlotPropsProp(
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
    it(`sets custom properties on the ${slotName} slot's element`, () => {
      const slotProps = {
        [slotName]: {
          'data-testid': 'custom',
        },
      };

      const { getByTestId } = render(React.cloneElement(element, { slotProps }));

      expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
    });

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
  });
}

interface TestOwnerState {
  'data-testid'?: string;
}

function testSlotPropsCallbacks(
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
    it(`sets custom properties on the ${slotName} slot's element with a callback function`, () => {
      const testId = randomStringValue();
      const className = randomStringValue();

      const slotProps = {
        [slotName]: (ownerState: TestOwnerState) => ({
          'data-testid': `${ownerState['data-testid']}-${slotName}`,
          className,
        }),
      };

      const { getByTestId } = render(
        React.cloneElement(element, { slotProps, 'data-testid': testId }),
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
    it(`sets the ownerState prop on the ${slotName} slot's component`, () => {
      let componentOwnerState;
      const TestComponent = React.forwardRef(
        ({ ownerState }: WithOwnerState, ref: React.Ref<any>) => {
          componentOwnerState = ownerState;

          // @ts-ignore
          return <Element ref={ref} />;
        },
      );

      const slotOverrides = {
        [slotName]: TestComponent,
      };

      const expectedOwnerState = {
        id: 'foo',
      };

      render(React.cloneElement(element, { slots: slotOverrides, id: 'foo' }));
      expect(componentOwnerState).not.to.equal(undefined);
      expect(componentOwnerState).to.deep.include(expectedOwnerState);
    });
  });
}

function testDisablingClassGeneration(
  element: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  it(`does not generate any class names if placed within a ClassNameConfigurator`, () => {
    render(<ClassNameConfigurator disableDefaultClasses>{element}</ClassNameConfigurator>);

    const elementsWithClasses = document.querySelectorAll(`[class]`);

    elementsWithClasses.forEach((el: Element) => {
      // There can be empty class attributes as clsx returns an empty string given falsy arguments.
      expect(el.className.trim()).to.equal('');
    });
  });
}

const fullSuite = {
  componentProp: testComponentProp,
  slotsProp: testSlotsProp,
  slotPropsProp: testSlotPropsProp,
  slotPropsCallbacks: testSlotPropsCallbacks,
  mergeClassName: testClassName,
  propsSpread: testPropForwarding,
  reactTestRenderer: testReactTestRenderer,
  refForwarding: describeRef,
  ownerStatePropagation: testOwnerStatePropagation,
  disableClassGeneration: testDisablingClassGeneration,
};

function describeConformanceUnstyled(
  minimalElement: React.ReactElement,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();

  const filteredTests = Object.keys(fullSuite).filter(
    (testKey) =>
      only.indexOf(testKey) !== -1 && skip.indexOf(testKey as keyof typeof fullSuite) === -1,
  ) as (keyof typeof fullSuite)[];

  after(runAfterHook);

  filteredTests.forEach((testKey) => {
    const test = fullSuite[testKey];
    test(minimalElement, getOptions as any);
  });
}

export default createDescribe('MUI unstyled component API', describeConformanceUnstyled);
