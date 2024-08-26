import * as React from 'react';
import { expect } from 'chai';
import {
  MuiRenderResult,
  RenderOptions,
  screen,
  createDescribe,
  ConformanceOptions,
  SlotTestingOptions,
  describeRef,
  randomStringValue,
  testComponentProp,
} from '@mui/internal-test-utils';
import { ClassNameConfigurator } from '@mui/base/utils';

export interface UnstyledConformanceOptions
  extends Omit<Partial<ConformanceOptions>, 'render' | 'skip' | 'classes'> {
  render: (
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions | undefined,
  ) => Promise<MuiRenderResult> | MuiRenderResult;
  skip?: (keyof typeof fullSuite)[];
  testComponentPropWith?: string;
  rootElementNameMustMatchComponentProp?: boolean;
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
  element: React.ReactElement<any>,
  getOptions: () => UnstyledConformanceOptions,
) {
  const {
    render,
    testComponentPropWith: Element = 'div',
    rootElementNameMustMatchComponentProp = false,
  } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  it('forwards custom props to the root element if a component is provided', async () => {
    const CustomRoot = React.forwardRef(
      ({ fooBar, lang }: WithCustomProp, ref: React.ForwardedRef<any>) => {
        // @ts-ignore
        return <Element ref={ref} data-foobar={fooBar} lang={lang} data-testid="custom-root" />;
      },
    );

    const otherProps = {
      lang: 'fr',
      fooBar: randomStringValue(),
      ...(rootElementNameMustMatchComponentProp ? { rootElementName: Element } : {}),
    };

    await render(React.cloneElement(element, { slots: { root: CustomRoot }, ...otherProps }));

    const customRoot = screen.getByTestId('custom-root');
    expect(customRoot).to.have.attribute('lang', otherProps.lang);
    expect(customRoot).to.have.attribute('data-foobar', otherProps.fooBar);
  });

  it('does forward standard props to the root element if an intrinsic element is provided', async () => {
    const otherProps = {
      lang: 'fr',
      'data-foobar': randomStringValue(),
      'data-testid': 'custom-root',
      ...(rootElementNameMustMatchComponentProp ? { rootElementName: Element } : {}),
    };

    await render(React.cloneElement(element, { slots: { root: Element }, ...otherProps }));

    const customRoot = screen.getByTestId('custom-root');
    expect(customRoot).to.have.attribute('lang', otherProps.lang);
    expect(customRoot).to.have.attribute('data-foobar', otherProps['data-foobar']);
  });
}

function testSlotsProp(
  element: React.ReactElement<any>,
  getOptions: () => UnstyledConformanceOptions,
) {
  const {
    render,
    slots,
    skip,
    testComponentPropWith: Element = 'div',
    rootElementNameMustMatchComponentProp = false,
  } = getOptions();

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
    it(`allows overriding the ${slotName} slot with a component`, async () => {
      const slotComponent = slotOptions.testWithComponent ?? CustomComponent;

      const components = {
        [slotName]: slotComponent,
      };

      const { getByTestId } = await render(
        React.cloneElement(element, {
          slots: components,
          ...(rootElementNameMustMatchComponentProp ? { rootElementName: 'i' } : {}),
        }),
      );
      const renderedElement = getByTestId('custom');
      expect(renderedElement).to.have.class(slotOptions.expectedClassName);
    });

    if (slotOptions.testWithElement !== null) {
      it(`allows overriding the ${slotName} slot with an element`, async () => {
        const slotElement = slotOptions.testWithElement ?? 'i';

        const components = {
          [slotName]: slotElement,
        };

        const slotProps = {
          [slotName]: {
            'data-testid': 'customized',
          },
        };

        const { getByTestId } = await render(
          React.cloneElement(element, {
            slots: components,
            slotProps,
            ...(rootElementNameMustMatchComponentProp ? { rootElementName: slotElement } : {}),
          }),
        );
        const renderedElement = getByTestId('customized');
        expect(renderedElement.nodeName.toLowerCase()).to.equal(slotElement);
        expect(renderedElement).to.have.class(slotOptions.expectedClassName);
      });
    }

    if (slotOptions.isOptional) {
      it(`allows omitting the optional ${slotName} slot by providing null`, async () => {
        const components = {
          [slotName]: null,
        };

        const { container } = await render(React.cloneElement(element, { slots: components }));
        expect(container.querySelectorAll(`.${slotOptions.expectedClassName}`)).to.have.length(0);
      });
    }
  });

  it('uses the component provided in the `component` prop when both `component` and `slots.root` are provided', async () => {
    if (skip && skip.indexOf('componentProp') >= 0) {
      return;
    }

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

    const { queryByTestId } = await render(
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
  element: React.ReactElement<any>,
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
    it(`sets custom properties on the ${slotName} slot's element`, async () => {
      const slotProps = {
        [slotName]: {
          'data-testid': 'custom',
        },
      };

      const { getByTestId } = await render(React.cloneElement(element, { slotProps }));

      expect(getByTestId('custom')).to.have.class(slotOptions.expectedClassName);
    });

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
  });
}

function testClassName(element: React.ReactElement<any>, getOptions: () => ConformanceOptions) {
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

interface TestOwnerState {
  'data-testid'?: string;
}

function testSlotPropsCallbacks(
  element: React.ReactElement<any>,
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
    it(`sets custom properties on the ${slotName} slot's element with a callback function`, async () => {
      const testId = randomStringValue();
      const className = randomStringValue();

      const slotProps = {
        [slotName]: (ownerState: TestOwnerState) => ({
          'data-testid': `${ownerState['data-testid']}-${slotName}`,
          className,
        }),
      };

      const { getByTestId } = await render(
        React.cloneElement(element, { slotProps, 'data-testid': testId }),
      );

      expect(getByTestId(`${testId}-${slotName}`)).to.have.class(slotOptions.expectedClassName);
      expect(getByTestId(`${testId}-${slotName}`)).to.have.class(className);
    });
  });
}

function testOwnerStatePropagation(
  element: React.ReactElement<any>,
  getOptions: () => UnstyledConformanceOptions,
) {
  const {
    render,
    slots,
    testComponentPropWith: Element = 'div',
    rootElementNameMustMatchComponentProp = false,
  } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  if (!slots) {
    throwMissingPropError('slots');
  }

  forEachSlot(slots, (slotName) => {
    it(`sets the ownerState prop on the ${slotName} slot's component`, async () => {
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

      await render(
        React.cloneElement(element, {
          slots: slotOverrides,
          id: 'foo',
          ...(rootElementNameMustMatchComponentProp ? { rootElementName: Element } : {}),
        }),
      );
      expect(componentOwnerState).not.to.equal(undefined);
      expect(componentOwnerState).to.deep.include(expectedOwnerState);
    });
  });
}

function testDisablingClassGeneration(
  element: React.ReactElement<any>,
  getOptions: () => UnstyledConformanceOptions,
) {
  const { render } = getOptions();

  if (!render) {
    throwMissingPropError('render');
  }

  it(`does not generate any class names if placed within a ClassNameConfigurator`, async () => {
    await render(<ClassNameConfigurator disableDefaultClasses>{element}</ClassNameConfigurator>);

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
  refForwarding: describeRef,
  ownerStatePropagation: testOwnerStatePropagation,
  disableClassGeneration: testDisablingClassGeneration,
};

function describeConformance(
  minimalElement: React.ReactElement<any>,
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

const describeConformanceUnstyled = createDescribe('Base UI component API', describeConformance);

export { describeConformanceUnstyled };
