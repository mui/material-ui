import * as React from 'react';
import useButton from '@mui/base/useButton';
import { createRenderer, fireEvent } from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('useButton', () => {
  const { render } = createRenderer();

  describe('state: active', () => {
    describe('when using a button element', () => {
      it('is set when triggered by mouse', () => {
        function TestComponent() {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { active, getRootProps } = useButton({ ref: buttonRef });

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
          const { getRootProps } = useButton({ ...props, ref });
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
          const { getRootProps } = useButton({ ref });
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
          const { getRootProps } = useButton({ ...props, ref });
          return <button {...getRootProps({ onClick: handleClickInternal })} />;
        }

        const { getByRole } = render(<TestComponent onClick={handleClickExternal} />);
        fireEvent.click(getByRole('button'));

        expect(handleClickInternal.callCount).to.equal(1);
        expect(handleClickExternal.callCount).to.equal(0);
      });
    });
  });
});
