import SliderUnstyled, { sliderUnstyledClasses as classes } from '@mui/core/SliderUnstyled';
import { expect } from 'chai';
import * as React from 'react';
import { spy, stub } from 'sinon';
import {
  createClientRender,
  createMount,
  describeConformance,
  fireEvent,
  screen,
} from 'test/utils';

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
    render,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
    skip: [
      'themeDefaultProps', // unstyled
      'themeStyleOverrides', // unstyled
      'themeVariants', // unstyled
    ],
  }));

  it('forwards style props on the Root component', () => {
    let ownerState = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ ownerState: ownerStateProp, theme: themeProp, ...other }, ref) => {
        ownerState = ownerStateProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
      },
    );

    render(<SliderUnstyled components={{ Root }} />);

    expect(ownerState).not.to.equal(null);
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
    expect(element.getAttribute('ownerState')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });

  describe('prop: marks', () => {
    it('does not cause unknown-prop error', () => {
      const marks = [
        {
          value: 33,
        },
      ];
      expect(() => {
        render(<SliderUnstyled marks={marks} />);
      }).not.to.throw();
    });
  });

  describe('prop: orientation', () => {
    it('sets the orientation via ARIA', () => {
      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');
      expect(slider).to.have.attribute('aria-orientation', 'vertical');
    });

    it('does not set the orientation via appearance for WebKit browsers', function test() {
      if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
        this.skip();
      }

      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');

      expect(slider).to.have.property('tagName', 'INPUT');
      expect(slider).to.have.property('type', 'range');
      // Only relevant if we implement `[role="slider"]` with `input[type="range"]`
      // We're not setting this by default because it changes horizontal keyboard navigation in WebKit: https://bugs.chromium.org/p/chromium/issues/detail?id=1162640
      expect(slider).not.toHaveComputedStyle({ webkitAppearance: 'slider-vertical' });
    });
  });

  describe('prop: valueLabelDisplay', () => {
    it('renders a slider', () => {
      render(<SliderUnstyled value={30} valueLabelDisplay="auto" />);

      expect(screen.getByRole('slider')).to.have.attribute('aria-valuenow', '30');
    });
  });

  [
    ['readonly range', Object.freeze([2, 1])],
    ['range', [2, 1]],
  ].forEach(([valueLabel, value]) => {
    it(`calls onChange even if the ${valueLabel} did not change`, () => {
      const handleChange = spy();
      const { container } = render(
        <SliderUnstyled min={0} max={5} onChange={handleChange} value={value} />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      // pixel:  0   20  40  60  80  100
      // slider: |---|---|---|---|---|
      // values: 0   1   2   3   4   5
      // value:      ↑   ↑
      // mouse:           ↑
      fireEvent.mouseDown(container.firstChild, {
        buttons: 1,
        clientX: 41,
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).not.to.equal(value);
      expect(handleChange.args[0][1]).to.deep.equal(value.slice().sort((a, b) => a - b));
    });
  });
});
