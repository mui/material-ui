import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformance } from 'test/utils';
import SliderUnstyled from './SliderUnstyled';

describe('<SliderUnstyled />', () => {
  before(function beforeHook() {
    if (typeof Touch === 'undefined') {
      this.skip();
    }
  });

  const mount = createMount();
  const render = createClientRender();

  describeConformance(<SliderUnstyled value={0} />, () => ({
    classes: {},
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));

  it('forwards style props on the Root component', () => {
    let styleProps = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ styleProps: stylePropsProp, theme: themeProp, ...rest }, ref) => {
        styleProps = stylePropsProp;
        theme = themeProp;
        return <span ref={ref} {...rest} />;
      },
    );

    render(<SliderUnstyled components={{ Root }} />);

    expect(styleProps).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <SliderUnstyled
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('styleProps')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
