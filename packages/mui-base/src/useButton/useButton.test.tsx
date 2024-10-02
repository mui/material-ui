import * as React from 'react';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { useButton } from '@mui/base/useButton';

describe('useButton', () => {
  const { render } = createRenderer();

  describe('state: active', () => {
    describe('when using a button element', () => {
      it('is set when triggered by mouse', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return <button {...getRootProps()} className={active ? 'active' : ''} />;
        }

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        expect(button).to.have.class('active');
        fireEvent.mouseUp(button);
        expect(button).not.to.have.class('active');
      });

      it('is set when triggered by keyboard', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return <button {...getRootProps()} className={active ? 'active' : ''} />;
        }

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        button.focus();
        fireEvent.keyDown(button, { key: ' ' });
        expect(button).to.have.class('active');
        fireEvent.keyUp(button, { key: ' ' });
        expect(button).not.to.have.class('active');
      });

      it('is set when clicked on an element inside the button', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return (
            <button {...getRootProps()} className={active ? 'active' : ''}>
              <span>Click here</span>
            </button>
          );
        }

        const { getByText, getByRole } = render(<TestComponent />);
        const span = getByText('Click here');
        const button = getByRole('button');
        fireEvent.mouseDown(span);
        expect(button).to.have.class('active');
      });

      it('is unset when mouse button is released above another element', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return (
            <div data-testid="parent">
              <button {...getRootProps()} className={active ? 'active' : ''} />
            </div>
          );
        }

        const { getByRole, getByTestId } = render(<TestComponent />);
        const button = getByRole('button');
        const background = getByTestId('parent');
        fireEvent.mouseDown(button);
        expect(button).to.have.class('active');
        fireEvent.mouseUp(background);
        expect(button).not.to.have.class('active');
      });
    });

    describe('when using a span element', () => {
      it('is set when triggered by mouse', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return <span {...getRootProps()} className={active ? 'active' : ''} />;
        }

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        expect(button).to.have.class('active');
        fireEvent.mouseUp(button);
        expect(button).not.to.have.class('active');
      });

      it('is set when triggered by keyboard', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ rootRef: buttonRef });

          return <span {...getRootProps()} className={active ? 'active' : ''} />;
        }

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        button.focus();
        fireEvent.keyDown(button, { key: ' ' });
        expect(button).to.have.class('active');
        fireEvent.keyUp(button, { key: ' ' });
        expect(button).not.to.have.class('active');
      });
    });

    describe('event handlers', () => {
      interface WithClickHandler {
        onClick: React.MouseEventHandler;
      }

      it('calls them when provided in props', () => {
        function TestComponent(props: WithClickHandler) {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ...props, rootRef: ref });
          return <button {...getRootProps()} />;
        }

        const handleClick = spy();

        const { getByRole } = render(<TestComponent onClick={handleClick} />);
        fireEvent.click(getByRole('button'));

        expect(handleClick.callCount).to.equal(1);
      });

      it('calls them when provided in getRootProps()', () => {
        const handleClick = spy();

        function TestComponent() {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ rootRef: ref });
          return <button {...getRootProps({ onClick: handleClick })} />;
        }

        const { getByRole } = render(<TestComponent />);
        fireEvent.click(getByRole('button'));

        expect(handleClick.callCount).to.equal(1);
      });

      it('calls the one provided in getRootProps() when both props and getRootProps have ones', () => {
        const handleClickExternal = spy();
        const handleClickInternal = spy();

        function TestComponent(props: WithClickHandler) {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ...props, rootRef: ref });
          return <button {...getRootProps({ onClick: handleClickInternal })} />;
        }

        const { getByRole } = render(<TestComponent onClick={handleClickExternal} />);
        fireEvent.click(getByRole('button'));

        expect(handleClickInternal.callCount).to.equal(1);
        expect(handleClickExternal.callCount).to.equal(0);
      });

      it('handles onFocusVisible and does not include it in the root props', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // JSDOM doesn't support :focus-visible
          this.skip();
        }

        interface WithFocusVisibleHandler {
          onFocusVisible: React.FocusEventHandler;
        }

        function TestComponent(props: WithFocusVisibleHandler) {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ...props, rootRef: ref });

          // @ts-expect-error onFocusVisible is removed from props
          expect(getRootProps().onFocusVisible).to.equal(undefined);

          return <button {...getRootProps()} />;
        }

        const handleFocusVisible = spy();

        const { getByRole } = render(<TestComponent onFocusVisible={handleFocusVisible} />);

        act(() => {
          getByRole('button').focus();
        });

        expect(handleFocusVisible.callCount).to.equal(1);
      });
    });
  });

  describe('tabIndex', () => {
    it('does not return tabIndex in getRootProps when host component is BUTTON', () => {
      function TestComponent() {
        const ref = React.useRef(null);
        const { getRootProps } = useButton({ rootRef: ref });

        expect(getRootProps().tabIndex).to.equal(undefined);

        return <button {...getRootProps()} />;
      }

      const { getByRole } = render(<TestComponent />);
      expect(getByRole('button')).to.have.property('tabIndex', 0);
    });

    it('returns tabIndex in getRootProps when host component is not BUTTON', () => {
      function TestComponent() {
        const ref = React.useRef(null);
        const { getRootProps } = useButton({ rootRef: ref });

        expect(getRootProps().tabIndex).to.equal(ref.current ? 0 : undefined);

        return <span {...getRootProps()} />;
      }

      const { getByRole } = render(<TestComponent />);
      expect(getByRole('button')).to.have.property('tabIndex', 0);
    });

    it('returns tabIndex in getRootProps if it is explicitly provided', () => {
      const customTabIndex = 3;
      function TestComponent() {
        const ref = React.useRef(null);
        const { getRootProps } = useButton({ rootRef: ref, tabIndex: customTabIndex });
        return <button {...getRootProps()} />;
      }

      const { getByRole } = render(<TestComponent />);
      expect(getByRole('button')).to.have.property('tabIndex', customTabIndex);
    });
  });

  describe('arbitrary props', () => {
    it('are passed to the host component', () => {
      const buttonTestId = 'button-test-id';
      function TestComponent() {
        const { getRootProps } = useButton({});
        return <button {...getRootProps({ 'data-testid': buttonTestId })} />;
      }

      const { getByRole } = render(<TestComponent />);
      expect(getByRole('button')).to.have.attribute('data-testid', buttonTestId);
    });
  });
});
