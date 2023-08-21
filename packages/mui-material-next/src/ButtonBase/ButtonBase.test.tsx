// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import userEvent from '@testing-library/user-event';
import {
  describeConformance,
  act,
  createRenderer,
  fireEvent,
  screen,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from 'test/utils';
import PropTypes from 'prop-types';
import { MuiCancellableEventHandler } from '@mui/base/utils/MuiCancellableEvent';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import ButtonBase, { buttonBaseClasses as classes } from '@mui/material-next/ButtonBase';
import { ButtonBaseActions } from './ButtonBase.types';
import { TouchRippleActions } from './TouchRipple.types';

// TODO v6: initialize @testing-library/user-event using userEvent.setup() instead of directly calling methods e.g. userEvent.click() for all related tests in this file
// currently the setup() method uses the ClipboardEvent constructor which is incompatible with our lowest supported version of iOS Safari (12.2) https://github.com/mui/material-ui/blob/master/.browserslistrc#L44
// userEvent.setup() requires Safari 14 or up to work

describe('<ButtonBase />', () => {
  const { render } = createRenderer();

  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14156632/
  let canFireDragEvents = true;

  before(() => {
    // browser testing config
    try {
      const EventConstructor = window.DragEvent || window.Event;
      // eslint-disable-next-line no-new
      new EventConstructor('');
    } catch (err) {
      canFireDragEvents = false;
    }
  });

  let originalMatchmedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    window.matchMedia = () =>
      ({
        addListener: () => {},
        removeListener: () => {},
      } as unknown as MediaQueryList);
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describeConformance(<ButtonBase />, () => ({
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    classes,
    inheritComponent: 'button',
    render,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'a',
    muiName: 'MuiButtonBase',
    testVariantProps: { disabled: true },
    skip: ['componentsProp'],
  }));

  describe('root node', () => {
    it('should have default button type "button"', () => {
      const { getByText, setProps } = render(<ButtonBase>Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.attribute('type', 'button');

      setProps({ type: undefined });
      expect(getByText('Hello')).to.have.attribute('type', 'button');
    });

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
      expect(getByText('Hello')).not.to.have.attribute('role');
    });

    it('should change the button type to span and set role="button"', () => {
      const { getByRole } = render(<ButtonBase component="span">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'SPAN');
      expect(button).not.to.have.attribute('type');
    });

    it('should automatically change the button to an anchor element when href is provided', () => {
      const { container } = render(<ButtonBase href="https://google.com">Hello</ButtonBase>);
      const button = container.firstChild;

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('role');
      expect(button).not.to.have.attribute('type');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('should use custom LinkComponent when provided in the theme', () => {
      const CustomLink = React.forwardRef((props, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...props} />;
      });
      const theme = extendTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });

      const { container, getByTestId } = render(
        <CssVarsProvider theme={theme}>
          <ButtonBase href="https://google.com">Hello</ButtonBase>
        </CssVarsProvider>,
      );
      const button = container.firstChild;
      expect(getByTestId('customLink')).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', 'https://google.com');
    });

    it('applies role="button" when an anchor is used without href', () => {
      const { getByRole } = render(<ButtonBase component="a">Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.property('nodeName', 'A');
      expect(button).not.to.have.attribute('type');
    });

    it('should not add role="button" if custom component and href are used', () => {
      const CustomLink = React.forwardRef((props, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...props} />;
      });

      const { container } = render(
        <ButtonBase component={CustomLink} href="https://google.com">
          Hello
        </ButtonBase>,
      );
      const button = container.firstChild;
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('data-testid', 'customLink');
      expect(button).to.have.attribute('href', 'https://google.com');
      expect(button).not.to.have.attribute('role', 'button');
    });

    it('should not add role="button" if custom component and to are used', () => {
      const CustomLink = React.forwardRef((props, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        // @ts-expect-error missing types in CustomLink
        const { to, ...other } = props;
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="customLink" ref={ref} {...other} href={to} />;
      });

      const { container } = render(
        // @ts-expect-error missing types in CustomLink
        <ButtonBase component={CustomLink} to="https://google.com">
          Hello
        </ButtonBase>,
      );
      const button = container.firstChild;
      expect(button).not.to.have.attribute('role', 'button');
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
      const onContextMenu = spy();
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
          onContextMenu={onContextMenu}
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

      fireEvent.contextMenu(button);
      expect(onContextMenu.callCount).to.equal(1);

      fireEvent.click(button);
      expect(onClick.callCount).to.equal(1);

      act(() => {
        button.focus();
      });
      expect(onFocus.callCount).to.equal(1);

      fireEvent.keyDown(button);
      expect(onKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(button);
      expect(onKeyUp.callCount).to.equal(1);

      act(() => {
        button.blur();
      });
      expect(onBlur.callCount).to.equal(1);

      fireEvent.mouseLeave(button);
      expect(onMouseLeave.callCount).to.equal(1);
    });
  });

  describe('ripple', () => {
    describe('interactions', () => {
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

      it('should stop the ripple when the context menu opens', () => {
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

        fireEvent.contextMenu(button);

        expect(button.querySelectorAll('.ripple-visible .child-leaving')).to.have.lengthOf(1);
        expect(
          button.querySelectorAll('.ripple-visible .child:not(.child-leaving)'),
        ).to.have.lengthOf(0);
      });
    });
  });

  describe('prop: centerRipple', () => {
    it('centers the TouchRipple', () => {
      const { container, getByRole } = render(
        <ButtonBase
          centerRipple
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      // @ts-ignore
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));
      fireEvent.mouseDown(getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = container.querySelector('.touch-ripple-ripple');
      expect(rippleRipple).not.to.equal(null);
      // @ts-ignore
      const rippleStyle = window.getComputedStyle(rippleRipple);
      expect(rippleStyle).to.have.property('height', '101px');
      expect(rippleStyle).to.have.property('width', '101px');
    });

    it('is disabled by default', () => {
      const { container, getByRole } = render(
        <ButtonBase
          TouchRippleProps={{ classes: { root: 'touch-ripple', ripple: 'touch-ripple-ripple' } }}
        >
          Hello
        </ButtonBase>,
      );
      // @ts-ignore
      stub(container.querySelector('.touch-ripple'), 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 100,
        bottom: 10,
        left: 20,
        top: 20,
      }));
      fireEvent.mouseDown(getByRole('button'), { clientX: 10, clientY: 10 });
      const rippleRipple = container.querySelector('.touch-ripple-ripple');
      expect(rippleRipple).not.to.equal(null);
      // @ts-ignore
      const rippleStyle = window.getComputedStyle(rippleRipple);
      expect(rippleStyle).not.to.have.property('height', '101px');
      expect(rippleStyle).not.to.have.property('width', '101px');
    });
  });

  describe('prop: disabled', () => {
    it('should have a the disabled property', () => {
      const { getByText } = render(<ButtonBase disabled>Hello</ButtonBase>);
      expect(getByText('Hello')).to.have.property('disabled');
    });

    it('should forward it to native buttons', () => {
      const { getByText } = render(
        <ButtonBase disabled component="button">
          Hello
        </ButtonBase>,
      );
      expect(getByText('Hello')).to.have.property('disabled', true);
    });

    it('should reset the focused state upon being disabled', () => {
      const { getByText, setProps } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(button).not.to.have.class(classes.focusVisible);
    });

    it('should not use aria-disabled with button host', () => {
      const { getByRole } = render(<ButtonBase disabled>Hello</ButtonBase>);
      const button = getByRole('button');

      expect(button).to.have.attribute('disabled');
      expect(button).not.to.have.attribute('aria-disabled');
    });

    it('should use aria-disabled for other components', () => {
      const { getByRole, setProps } = render(
        <ButtonBase component="span" disabled>
          Hello
        </ButtonBase>,
      );
      const button = getByRole('button');

      expect(button).not.to.have.attribute('disabled');
      expect(button).to.have.attribute('aria-disabled', 'true');

      setProps({ disabled: false });
      expect(button).not.to.have.attribute('aria-disabled');
    });
  });

  describe('prop: focusableWhenDisabled', () => {
    it('should be focusable when disabled if focusableWhenDisabled is true', () => {
      const { getByText } = render(
        <ButtonBase disabled focusableWhenDisabled>
          Hello
        </ButtonBase>,
      );
      const button = getByText('Hello');
      simulatePointerDevice();

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = React.forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => (
        <div data-testid="link" ref={ref} {...props} />
      ));
      const { getByTestId } = render(<ButtonBase component={Link}>Hello</ButtonBase>);

      expect(getByTestId('link')).to.have.attribute('role', 'button');
    });
  });

  describe('event: focus', () => {
    it('should call onFocus', async () => {
      const onFocusSpy = spy();
      render(
        <ButtonBase component="div" onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      await userEvent.keyboard('[Tab]');

      expect(onFocusSpy.callCount).to.equal(1);
    });

    it('when disabled should not call onFocus', async () => {
      const onFocusSpy = spy();
      render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy}>
          Hello
        </ButtonBase>,
      );

      await userEvent.keyboard('[Tab]');

      expect(onFocusSpy.callCount).to.equal(0);
    });

    it('when disabled and focusableWhenDisabled should call onFocus', async () => {
      const onFocusSpy = spy();
      render(
        <ButtonBase component="div" disabled onFocus={onFocusSpy} focusableWhenDisabled>
          Hello
        </ButtonBase>,
      );

      await userEvent.keyboard('[Tab]');

      expect(onFocusSpy.callCount).to.equal(1);
    });

    it('has a focus-visible polyfill', () => {
      const { getByText } = render(<ButtonBase>Hello</ButtonBase>);
      const button = getByText('Hello');
      simulatePointerDevice();

      expect(button).not.to.have.class(classes.focusVisible);

      act(() => {
        button.focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(button).to.have.class(classes.focusVisible);
      } else {
        expect(button).not.to.have.class(classes.focusVisible);
      }

      focusVisible(button);

      expect(button).to.have.class(classes.focusVisible);
    });

    it('removes focus-visible if focus is re-targetted', () => {
      const eventLog: string[] = [];
      function Test() {
        const focusRetargetRef = React.useRef<HTMLButtonElement>(null);
        return (
          <div
            onFocus={() => {
              const { current: focusRetarget } = focusRetargetRef;
              if (focusRetarget === null) {
                throw new TypeError('Nothing to focus. Test cannot work.');
              }
              focusRetarget.focus();
            }}
          >
            <button ref={focusRetargetRef} type="button">
              you cannot escape me
            </button>
            <ButtonBase
              onBlur={() => eventLog.push('blur')}
              onFocus={() => eventLog.push('focus')}
              onFocusVisible={() => eventLog.push('focus-visible')}
            >
              Hello
            </ButtonBase>
          </div>
        );
      }
      const { getByText } = render(<Test />);
      const buttonBase = getByText('Hello');
      const focusRetarget = getByText('you cannot escape me');
      simulatePointerDevice();

      focusVisible(buttonBase);

      expect(focusRetarget).toHaveFocus();
      expect(eventLog).to.deep.equal(['focus-visible', 'focus', 'blur']);
      expect(buttonBase).not.to.have.class(classes.focusVisible);
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
      const touchRippleTestId = 'touch-ripple-test-id';

      it('is enabled by default', () => {
        const { getAllByTestId } = render(
          <ButtonBase
            TouchRippleProps={{
              // @ts-ignore allow for test id
              'data-testid': touchRippleTestId,
            }}
          >
            Hello World
          </ButtonBase>,
        );

        expect(getAllByTestId(touchRippleTestId).length).to.equal(1);
      });

      it('removes the TouchRipple when disableRipple is true', () => {
        const { queryByTestId } = render(
          <ButtonBase
            TouchRippleProps={{
              // @ts-ignore allow for test id
              'data-testid': touchRippleTestId,
            }}
            disableRipple
          >
            Hello World
          </ButtonBase>,
        );

        expect(queryByTestId(touchRippleTestId)).to.equal(null);
      });
    });

    describe('keyboard accessibility for non interactive elements', () => {
      it('does not call onClick when a spacebar is pressed on the element but prevents the default', () => {
        const onKeyDown = spy();
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDown} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('does call onClick when a spacebar is released on the element', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyUp(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(1);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });

      it('does not call onClick when a spacebar is released and the default is prevented', () => {
        const onClickSpy = spy();
        const onKeyUp: MuiCancellableEventHandler<React.KeyboardEvent> = (event) => {
          event.preventDefault();
          event.defaultMuiPrevented = true;
        };
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} onKeyUp={onKeyUp} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyUp(button, {
            key: ' ',
          });
        });

        expect(onClickSpy.callCount).to.equal(0);
      });

      it('calls onClick when Enter is pressed on the element', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase onClick={onClickSpy} component="div">
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: 'Enter',
          });
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('does not call onClick if Enter was pressed on a child', () => {
        const onClickSpy = spy();
        const onKeyDownSpy = spy();
        render(
          <ButtonBase onClick={onClickSpy} onKeyDown={onKeyDownSpy} component="div">
            <input autoFocus type="text" />
          </ButtonBase>,
        );

        fireEvent.keyDown(screen.getByRole('textbox'), {
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

        fireEvent.keyUp(screen.getByRole('textbox'), {
          key: ' ',
        });

        expect(onKeyUpSpy.callCount).to.equal(1);
        expect(onClickSpy.callCount).to.equal(0);
      });

      it('prevents default with an anchor and empty href', () => {
        const onClickSpy = spy();
        const { getByRole } = render(
          <ButtonBase component="a" onClick={onClickSpy}>
            Hello
          </ButtonBase>,
        );
        const button = getByRole('button');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, { key: 'Enter' });
        });

        expect(onClickSpy.calledOnce).to.equal(true);
        expect(onClickSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
      });

      it('should ignore anchors with href', () => {
        const onClick = spy();
        const onKeyDown = spy();
        const { getByText } = render(
          <ButtonBase component="a" href="href" onClick={onClick} onKeyDown={onKeyDown}>
            Hello
          </ButtonBase>,
        );
        const button = getByText('Hello');

        act(() => {
          button.focus();
          fireEvent.keyDown(button, {
            key: 'Enter',
          });
        });

        expect(onClick.callCount).to.equal(0);
        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });
  });

  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      /**
       * @type {React.RefObject<import('./ButtonBase.types').ButtonBaseActions>}
       */
      const buttonActionsRef = React.createRef<ButtonBaseActions>();
      const { getByText } = render(
        <ButtonBase action={buttonActionsRef} focusVisibleClassName="focusVisible">
          Hello
        </ButtonBase>,
      );

      // @ts-ignore
      expect(typeof buttonActionsRef.current.focusVisible).to.equal('function');

      act(() => {
        // @ts-ignore
        buttonActionsRef.current.focusVisible();
      });

      expect(getByText('Hello')).toHaveFocus();
      expect(getByText('Hello')).to.match('.focusVisible');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns on invalid `component` prop: ref forward', function test() {
      // Only run the test on node. On the browser the thrown error is not caught
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      function Component(props: React.HTMLAttributes<HTMLButtonElement>) {
        return <button type="button" {...props} />;
      }

      expect(() => {
        PropTypes.checkPropTypes(
          ButtonBase.propTypes,
          { classes: {}, component: Component },
          'prop',
          'MockedName',
        );
      }).toErrorDev(
        'Invalid prop `component` supplied to `MockedName`. Expected an element type that can hold a ref',
      );
    });

    it('warns on invalid `component` prop: prop forward', () => {
      const Component = React.forwardRef((props, ref: React.ForwardedRef<HTMLButtonElement>) => (
        <button type="button" ref={ref} {...props}>
          Hello
        </button>
      ));

      // cant match the error message here because flakiness with mocha watchmode

      expect(() => {
        render(<ButtonBase component={Component} />);
      }).toErrorDev('Please make sure the children prop is rendered in this custom component.');
    });
  });

  describe('prop: type', () => {
    it('is `button` by default', () => {
      render(<ButtonBase />);

      expect(screen.getByRole('button')).to.have.property('type', 'button');
    });

    it('can be changed to other button types', () => {
      render(<ButtonBase type="submit" />);

      expect(screen.getByRole('button')).to.have.property('type', 'submit');
    });

    it('allows non-standard values', () => {
      render(<ButtonBase type="fictional-type" />);

      expect(screen.getByRole('button')).to.have.attribute('type', 'fictional-type');
      // By spec non-supported types result in the default type for `<button>` which is `submit`
      expect(screen.getByRole('button')).to.have.property('type', 'submit');
    });

    it('is forwarded to anchor components', () => {
      render(<ButtonBase component="a" href="some-recording.ogg" download type="audio/ogg" />);

      expect(screen.getByRole('link')).to.have.attribute('type', 'audio/ogg');
      expect(screen.getByRole('link')).to.have.property('type', 'audio/ogg');
    });

    it('is forwarded to custom components', () => {
      const CustomButton = React.forwardRef((props, ref: React.ForwardedRef<HTMLButtonElement>) => (
        <button ref={ref} {...props} />
      ));
      render(<ButtonBase component={CustomButton} type="reset" />);

      expect(screen.getByRole('button')).to.have.property('type', 'reset');
    });
  });

  describe('prop: touchRippleRef', () => {
    it('should return a ref', () => {
      const ref = React.createRef<TouchRippleActions>();
      render(<ButtonBase touchRippleRef={ref} />);
      expect(ref.current).not.to.equal(null);
    });
  });

  describe('classes', () => {
    it('should render focus visible class', () => {
      const { container } = render(<ButtonBase />);

      const button = container.querySelector('button');
      expect(button).not.to.equal(null);
      act(() => {
        button!.focus();
      });

      expect(button).to.have.class(classes.focusVisible);
    });

    it('should render active class', () => {
      const { container } = render(<ButtonBase />);

      const button = container.querySelector('button');
      expect(button).not.to.equal(null);
      fireEvent.mouseDown(button!);

      expect(button).to.have.class(classes.active);
    });
  });

  describe('prop: tabIndex', () => {
    it('should apply user value of tabIndex', () => {
      const { getByRole } = render(<ButtonBase tabIndex={5} />);

      expect(getByRole('button')).to.have.property('tabIndex', 5);
    });
  });
});
