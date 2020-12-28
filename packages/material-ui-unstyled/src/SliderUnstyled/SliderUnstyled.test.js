import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformance, screen } from 'test/utils';
import SliderUnstyled, {
  sliderUnstyledClasses as classes,
} from '@material-ui/unstyled/SliderUnstyled';

describe('<SliderUnstyled />', () => {
  before(function beforeHook() {
    if (typeof Touch === 'undefined') {
      this.skip();
    }
  });

  const mount = createMount();
  const render = createClientRender();

  describeConformance(<SliderUnstyled value={0} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));

  it('forwards style props on the Root component', () => {
    let styleProps = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ styleProps: stylePropsProp, theme: themeProp, ...other }, ref) => {
        styleProps = stylePropsProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
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

  describe('prop: orientation', () => {
    it('sets the orientation via ARIA', () => {
      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');
      expect(slider).to.have.attribute('aria-orientation', 'vertical');
    });

    it('sets the orientation via appearance for WebKit browsers', function test() {
      if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
        this.skip();
      }

      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');

      expect(slider).to.have.property('tagName', 'INPUT');
      expect(slider).to.have.property('type', 'range');
      // Only relevant if we implement `[role="slider"]` with `input[type="range"]`
      expect(slider).toHaveComputedStyle({ webkitAppearance: 'slider-vertical' });
    });
  });
});
