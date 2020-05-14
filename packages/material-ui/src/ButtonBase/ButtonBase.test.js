// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
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
  const render = createClientRender();
  /**
   * @type {ReturnType<typeof createMount>}
   */
  const mount = createMount();
  /**
   * @type {Record<string, string>}
   */
  let classes;
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14156632/
  let canFireDragEvents = true;

  before(() => {
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
      expect(checkbox).attribute('tabIndex').to.equal('0');
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
      const onClick = spy();
      const onBlur = spy();
      const onFocus = spy();
      const onKeyUp = spy();
      const onKeyDown = spy();
      const onMouseDown = spy();
      const onMouseLeave = spy();
      const onMouseUp = spy();
      const onDragEnd = spy();
      const onTouchStart = spy();
      const onTouchEnd = spy();

      const { getByText } = render(
        <ButtonBase
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
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

      fireEvent.mouseDown(button);
      expect(onMouseDown.callCount).to.equal(1);

      fireEvent.mouseUp(button);
      expect(onMouseUp.callCount).to.equal(1);

      fireEvent.click(button);
      expect(onClick.callCount).to.equal(1);

      button.focus();
      expect(onFocus.callCount).to.equal(1);

      fireEvent.keyDown(button);
      expect(onKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(button);
      expect(onKeyUp.callCount).to.equal(1);

      button.blur();
      expect(onBlur.callCount).to.equal(1);

      fireEvent.mouseLeave(button);
      expect(onMouseLeave.callCount).to.equal(1);
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

      it('should not crash when changes enableRipple from false to true', () => {
        function App() {
          /** @type {React.MutableRefObject<import('./ButtonBase').ButtonBaseActions | null>} */
          const buttonRef = React.useRef(null);
          const [enableRipple, setRipple] = React.useState(false);

          React.useEffect(() => {
            if (buttonRef.current) {
              buttonRef.current.focusVisible();
            } else {
              throw new Error('buttonRef.current must be available');
            }
          }, []);

          return (
            <div>
              <button
                type="button"
                data-testid="trigger"
                onClick={() => {
                  setRipple(true);
                }}
              >
                Trigger crash
              </button>
              <ButtonBase
                autoFocus
                action={buttonRef}
                TouchRippleProps={{
                  classes: {
                    ripplePulsate: 'ripple-pulsate',
                  },
                }}
                focusRipple
                disableRipple={!enableRipple}
              >
                the button
              </ButtonBase>
            </div>
          );
        }

        const { container, getByTestId } = render(<App />);

        fireEvent.click(getByTestId('trigger'));
        expect(container.querySelectorAll('.ripple-pulsate')).to.have.lengthOf(1);
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
      /**
       * @type {React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement>>}
       */
      const Link = React.forwardRef((props, ref) => (
        <div data-testid="link" ref={ref} {...props} />
      ));
      const { getByTestId } = render(<ButtonBase component={Link}>Hello</ButtonBase>);

      expect(getByTestId('link')).to.have.attribute('role', 'button');
    });
  });

  describe('event: focus', () => {
    it('when disabled should be called onFocus', () => {
      const onFocusSpy = spy();
      const { getByRole } = render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      getByRole('button').focus();

      expect(onFocusSpy.callCount).to.equal(1);
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

      expect(getByText('Hello')).toHaveFocus();
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
        const { getByText } = render(
          <ButtonBase autoFocus onKeyDown={onKeyDownSpy}>
            Hello
          </ButtonBase>,
        );

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

        expect(getByText('Hello').querySelector('.touch-ripple')).to.equal(null);
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('does not call onClick when a spacebar is pressed on the element but prevents the default', () => {
        const onKeyDown = spy((event) => event.defaultPrevented);
        const onClickSpy = spy((event) => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDown} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');
        button.focus();

        fireEvent.keyDown(document.activeElement || document.body, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(0);
        // defaultPrevented?
        expect(onKeyDown.returnValues[0]).to.equal(true);
      });

      it('does call onClick when a spacebar is released on the element', () => {
        const onClickSpy = spy((event) => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');
        button.focus();

        fireEvent.keyUp(document.activeElement || document.body, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(1);
        // defaultPrevented?
        expect(onClickSpy.returnValues[0]).to.equal(false);
      });

      it('does not call onClick when a spacebar is released and the default is prevented', () => {
        const onClickSpy = spy((event) => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase
            onClick={onClickSpy}
            onKeyUp={
              /**
               * @param {React.SyntheticEvent} event
               */
              (event) => event.preventDefault()
            }
            component="div"
          >
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');
        button.focus();

        fireEvent.keyUp(document.activeElement || document.body, {
          key: ' ',
        });

        expect(onClickSpy.callCount).to.equal(0);
      });

      it('calls onClick when Enter is pressed on the element', () => {
        const onClickSpy = spy((event) => event.defaultPrevented);
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');
        button.focus();

        fireEvent.keyDown(document.activeElement || document.body, {
          key: 'Enter',
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        // defaultPrevented?
        expect(onClickSpy.returnValues[0]).to.equal(true);
      });

      it('does not call onClick if Enter was pressed on a child', () => {
        const onClickSpy = spy((event) => event.defaultPrevented);
        const onKeyDownSpy = spy();
        render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDownSpy} component="div">
            <input autoFocus type="text" />
          </ButtonBase>,
        );

        fireEvent.keyDown(document.querySelector('input'), {
          key: 'Enter',
        });

        expect(onKeyDownSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(0);
      });

      it('does not call onClick if Space was released on a child', () => {
        const onClickSpy = spy();
        const onKeyUpSpy = spy();
        render(
          <ButtonBase onClick={onClickSpy} onKeyUp={onKeyUpSpy} component="div">
            <input autoFocus type="text" />
          </ButtonBase>,
        );

        fireEvent.keyUp(document.querySelector('input'), {
          key: ' ',
        });

        expect(onKeyUpSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(0);
      });

      it('prevents default with an anchor and empty href', () => {
        const onClickSpy = spy((event) => event.defaultPrevented);
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
        const onKeyDown = spy((event) => event.defaultPrevented);
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
      expect(getByText('Hello')).toHaveFocus();
      expect(getByText('Hello')).to.match('.focusVisible');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
      PropTypes.resetWarningCache();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('warns on invalid `component` prop: ref forward', () => {
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

      PropTypes.checkPropTypes(
        // @ts-ignore `Naked` is internal
        ButtonBase.Naked.propTypes,
        { classes: {}, component: Component },
        'prop',
        'MockedName',
      );

      expect(consoleErrorMock.messages()[0]).to.include(
        'Invalid prop `component` supplied to `MockedName`. Expected an element type that can hold a ref',
      );
    });

    it('warns on invalid `component` prop: prop forward', () => {
      const Component = React.forwardRef((props, ref) => (
        <button type="button" ref={ref} {...props}>
          Hello
        </button>
      ));

      // cant match the error message here because flakiness with mocha watchmode
      render(<ButtonBase component={Component} />);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Please make sure the children prop is rendered in this custom component.',
      );
    });
  });
});
