// @ts-check
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import TouchRipple from './TouchRipple';
import ButtonBase from './ButtonBase';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import * as PropTypes from 'prop-types';

/**
 * @param {HTMLElement} element
 */
function focusVisible(element) {
  act(() => {
    element.blur();
    fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
    element.focus();
  });
}

function simulatePointerDevice() {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(document.body);
}

describe('<ButtonBase />', () => {
  const render = createClientRender({ strict: true });
  /**
   * @type {ReturnType<typeof createMount>}
   */
  let mount;
  /**
   * @type {Record<string, string>}
   */
  let classes;
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14156632/
  let canFireDragEvents = true;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<ButtonBase />);
    // browser testing config
    try {
      const EventConstructor = window.DragEvent || window.Event;
      // eslint-disable-next-line no-new
      new EventConstructor('');
    } catch (err) {
      canFireDragEvents = false;
    }
  });

  describeConformance(<ButtonBase />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
    after: () => mount.cleanUp(),
  }));

  describe('root node', () => {
    it('should change the button type', () => {
      const { getByText } = render(<ButtonBase type="submit">Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.attribute('type', 'submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      const { getByRole } = render(
        <ButtonBase component="span" role="checkbox" aria-checked={false} />,
      );
      const checkbox = getByRole('checkbox');
      expect(checkbox).to.have.property('nodeName', 'SPAN');
      expect(checkbox)
        .attribute('tabIndex')
        .to.equal('0');
    });

    it('should not apply role="button" if type="button"', () => {
      const { getByText } = render(<ButtonBase type="button">Hello</ButtonBase>);
      expect(getByText('Hello')).to.not.have.attribute('role');
    });

    it('should change the button type to span and set role="button"', () => {
      const { getByRole } = render(<ButtonBase component="span">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'SPAN');
      expect(button).to.not.have.attribute('type');
    });

    it('should automatically change the button to an anchor element when href is provided', () => {
      const { getByText } = render(<ButtonBase href="https://google.com">Hello</ButtonBase>);
      const button = getByText('Hello');

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('role');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('applies role="button" when an anchor is used without href', () => {
      const { getByRole } = render(<ButtonBase component="a">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('type');
    });

    it('should not use an anchor element if explicit component and href is passed', () => {
      const { getByRole } = render(
        // @ts-ignore
        <ButtonBase component="span" href="https://google.com">
          Hello
        </ButtonBase>,
      );
      const button = getByRole('button');
      expect(button).to.have.property('nodeName', 'SPAN');
      expect(button).to.have.attribute('href', 'https://google.com');
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const eventHandlerNames = [
        'onClick',
        'onFocus',
        'onBlur',
        'onKeyUp',
        'onKeyDown',
        'onMouseDown',
        'onMouseLeave',
        'onMouseUp',
      ];

      /**
       * @type {Record<string, ReturnType<typeof spy>>}
       */
      const handlers = eventHandlerNames.reduce((result, n) => {
        // @ts-ignore
        result[n] = spy();
        return result;
      }, {});
      const onDragEnd = spy();
      const onTouchStart = spy();
      const onTouchEnd = spy();

      const { getByText } = render(
        <ButtonBase
          {...handlers}
          onDragEnd={onDragEnd}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          Hello
        </ButtonBase>,
      );
      const button = getByText('Hello');

      // only run in supported browsers
      if (typeof Touch !== 'undefined') {
        const touch = new Touch({ identifier: 0, target: button, clientX: 0, clientY: 0 });

        fireEvent.touchStart(button, { touches: [touch] });
        expect(onTouchStart.callCount).to.equal(1);

        fireEvent.touchEnd(button, { touches: [touch] });
        expect(onTouchEnd.callCount).to.equal(1);
      }

      if (canFireDragEvents) {
        fireEvent.dragEnd(button);
        expect(onDragEnd.callCount).to.equal(1);
      }

      eventHandlerNames.forEach(n => {
        // onKeyDown -> keyDown
        const eventType = n.charAt(2).toLowerCase() + n.slice(3);
        // @ts-ignore eventType isn't a literal here, need const expression
        fireEvent[eventType](button);
        expect(handlers[n].callCount, `should have called the ${n} handler`).to.equal(1);
      });
    });
  });

  describe('ripple', () => {
    describe('interactions', () => {
      it('should not have a focus ripple by default', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                ripplePulsate: 'ripple-pulsate',
              },
            }}
          />,
        );
        const button = getByRole('button');
        simulatePointerDevice();

        focusVisible(button);

        expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse is released', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.mouseUp(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should start the ripple when the mouse is pressed 2', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        fireEvent.mouseUp(button);

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the button blurs', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        button.blur();

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should restart the ripple when the mouse is pressed again', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');

        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(0);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);

        fireEvent.mouseUp(button);
        fireEvent.mouseDown(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(1);
      });

      it('should stop the ripple when the mouse leaves', () => {
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.mouseLeave(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });

      it('should stop the ripple when dragging has finished', function test() {
        if (!canFireDragEvents) {
          this.skip();
        }
        const { getByRole } = render(
          <ButtonBase
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
                child: 'child',
                childLeaving: 'child-leaving',
              },
            }}
          />,
        );
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        fireEvent.dragLeave(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });
    });
  });

  describe('prop: centerRipple', () => {
    it('centers the TouchRipple', () => {
      const wrapper = mount(<ButtonBase centerRipple>Hello</ButtonBase>);
      expect(wrapper.find(TouchRipple).props()).to.have.property('center', true);
    });

    it('is disabled by default', () => {
      const wrapper = mount(<ButtonBase>Hello</ButtonBase>);
      expect(wrapper.find(TouchRipple).props()).to.have.property('center', false);
    });
  });

  describe('focusRipple', () => {
    before(function beforeHook() {
      if (/Version\/10\.\d+\.\d+ Safari/.test(window.navigator.userAgent)) {
        // browserstack quirk
        this.skip();
      }
    });

    it('should pulsate the ripple when focusVisible', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should not stop the ripple when the mouse leaves', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              ripplePulsate: 'ripple-pulsate',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.mouseLeave(button);

      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              ripplePulsate: 'ripple-pulsate',
              rippleVisible: 'rippled-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.keyDown(button, { key: ' ' });

      expect(button.querySelectorAll('.ripple-pulsate .child-leaving')).to.have.lengthOf(1);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(0);
    });

    it('should stop and re-pulsate when space bar is released', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              ripplePulsate: 'ripple-pulsate',
              rippleVisible: 'ripple-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');

      simulatePointerDevice();
      focusVisible(button);
      fireEvent.keyDown(button, { key: ' ' });
      fireEvent.keyUp(button, { key: ' ' });

      expect(button.querySelectorAll('.ripple-pulsate .child-leaving')).to.have.lengthOf(1);
      expect(button.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(2);
      expect(button.querySelectorAll('.ripple-visible')).to.have.lengthOf(3);
    });

    it('should stop on blur and set focusVisible to false', () => {
      const { getByRole } = render(
        <ButtonBase
          focusRipple
          TouchRippleProps={{
            classes: {
              childLeaving: 'child-leaving',
              rippleVisible: 'ripple-visible',
            },
          }}
        />,
      );
      const button = getByRole('button');
      simulatePointerDevice();
      focusVisible(button);

      act(() => {
        button.blur();
      });

      expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
    });
  });

  describe('prop: disabled', () => {
    it('should have a negative tabIndex', () => {
      const { getByText } = render(<ButtonBase disabled>Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.property('tabIndex', -1);
    });

    it('should forward it to native buttons', () => {
      const { getByText } = render(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );
      expect(getByText('Hello')).to.have.property('disabled', true);
    });

    it('should reset the focused state', () => {
      const { getByText, setProps } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(button).not.to.have.class(classes.focusVisible);
    });

    it('should use aria attributes for other components', () => {
      const { getByRole } = render(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      const button = getByRole('button');

      expect(button).not.to.have.attribute('disabled');
      expect(button).to.have.attribute('aria-disabled', 'true');
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = React.forwardRef((props, ref) => (
        <div data-testid="link" ref={ref} {...props} />
      ));
      const { getByTestId } = render(<ButtonBase component={Link}>Hello</ButtonBase>);

      expect(getByTestId('link')).to.have.attribute('role', 'button');
    });
  });

  describe('event: focus', () => {
    it('when disabled should not call onFocus', () => {
      const onFocusSpy = spy();
      const { getByRole } = render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      getByRole('button').focus();

      expect(onFocusSpy.callCount).to.equal(0);
    });

    it('has a focus-visible polyfill', () => {
      const { getByText } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      expect(button).not.to.have.class(classes.focusVisible);
      button.focus();
      expect(button).not.to.have.class(classes.focusVisible);
      focusVisible(button);
      expect(button).to.have.class(classes.focusVisible);
    });

    it('onFocusVisibleHandler() should propagate call to onFocusVisible prop', () => {
      const onFocusVisibleSpy = spy();
      const { getByRole } = render(
        <ButtonBase component="span" onFocusVisible={onFocusVisibleSpy}>
          Hello
        </ButtonBase>,
      );
      simulatePointerDevice();

      focusVisible(getByRole('button'));

      expect(onFocusVisibleSpy.calledOnce).to.equal(true);
      expect(onFocusVisibleSpy.firstCall.args).to.have.lengthOf(1);
    });

    it('can be autoFocused', () => {
      // as of react@16.8.6 autoFocus causes focus to be emitted before refs
      // so we need to check if we're resilient against it
      const { getByText } = render(<ButtonBase autoFocus>Hello</ButtonBase>);

      expect(getByText('Hello')).to.be.focused;
    });
  });

  describe('event: keydown', () => {
    it('ripples on repeated keydowns', () => {
      const { container, getByText } = render(
        <ButtonBase focusRipple TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }}>
          Hello
        </ButtonBase>,
      );

      const button = getByText('Hello');

      button.focus();
      fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);

      // technically the second keydown should be fire with repeat: true
      // but that isn't implemented in IE 11 so we shouldn't mock it here either
      fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' });

      expect(container.querySelectorAll('.ripple-visible')).to.have.lengthOf(1);
    });

    describe('prop: onKeyDown', () => {
      it('call it when keydown events are dispatched', () => {
        const onKeyDownSpy = spy();
        const { getByText } = render(<ButtonBase onKeyDown={onKeyDownSpy}>Hello</ButtonBase>);

        fireEvent.keyDown(getByText('Hello'));

        expect(onKeyDownSpy.callCount).to.equal(1);
      });
    });

    describe('prop: disableTouchRipple', () => {
      it('creates no ripples on click', () => {
        const { getByText } = render(
          <ButtonBase
            disableTouchRipple
            TouchRippleProps={{
              classes: {
                rippleVisible: 'ripple-visible',
              },
            }}
          >
            Hello
          </ButtonBase>,
        );
        const button = getByText('Hello');

        fireEvent.click(button);

        expect(button).not.to.have.class('ripple-visible');
      });
    });

    describe('prop: disableRipple', () => {
      it('removes the TouchRipple', () => {
        const { getByText } = render(
          <ButtonBase disableRipple focusRipple TouchRippleProps={{ className: 'touch-ripple' }}>
            Hello
          </ButtonBase>,
        );

        expect(getByText('Hello').querySelector('.touch-ripple')).to.be.null;
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('calls onClick when a spacebar is pressed on the element', () => {
        const onClickSpy = spy(event => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );

        const button = getByRole('button');
        button.focus();
        fireEvent.keyDown(document.activeElement || document.body, {
          key: ' ',
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        // defaultPrevented?
        expect(onClickSpy.returnValues[0]).to.equal(true);
      });

      it('prevents default with an anchor and empty href', () => {
        const onClickSpy = spy(event => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase component="a" onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );

        const button = getByRole('button');
        button.focus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter' });

        expect(onClickSpy.calledOnce).to.equal(true);
        // defaultPrevented?
        expect(onClickSpy.returnValues[0]).to.equal(true);
      });

      it('should ignore anchors with href', () => {
        const onClick = spy();
        const onKeyDown = spy(event => event.defaultPrevented);
        const { getByText } = render(
          <ButtonBase component="a" href="href" onClick={onClick} onKeyDown={onKeyDown}>
            Hello
          </ButtonBase>,
        );
        const button = getByText('Hello');
        button.focus();
        fireEvent.keyDown(document.activeElement || document.body, {
          key: 'Enter',
        });

        expect(onClick.calledOnce).to.equal(false);
        // defaultPrevented
        expect(onKeyDown.returnValues[0]).to.equal(false);
      });
    });
  });

  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      /**
       * @type {React.RefObject<import('./ButtonBase').ButtonBaseActions>}
       */
      const buttonActionsRef = React.createRef();
      const { getByText } = render(
        <ButtonBase action={buttonActionsRef} focusVisibleClassName="focusVisible">
          Hello
        </ButtonBase>,
      );

      // @ts-ignore
      expect(typeof buttonActionsRef.current.focusVisible).to.equal('function');
      // @ts-ignore
      buttonActionsRef.current.focusVisible();
      expect(getByText('Hello')).to.be.focused;
      expect(getByText('Hello')).to.match('.focusVisible');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('warns on invalid `component` prop', () => {
      // Only run the test on node. On the browser the thrown error is not caught
      if (!/jsdom/.test(window.navigator.userAgent)) {
        return;
      }

      /**
       *
       * @param {import('react').HTMLAttributes<HTMLButtonElement>} props
       */
      function Component(props) {
        return <button type="button" {...props} />;
      }

      // cant match the error message here because flakiness with mocha watchmode
      render(<ButtonBase component={Component} />);

      expect(consoleErrorMock.args()[0][0]).to.include(
        'Invalid prop `component` supplied to `ForwardRef(ButtonBase)`. Expected an element type that can hold a ref',
      );
    });
  });
});
