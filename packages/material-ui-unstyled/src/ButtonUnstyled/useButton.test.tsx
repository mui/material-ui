import * as React from 'react';
import { useButton } from '@material-ui/unstyled/ButtonUnstyled';
import { createClientRender, fireEvent } from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('useButton', () => {
  const render = createClientRender();

  describe('state: active', () => {
    describe('when using a button element', () => {
      it('is set when triggered by mouse', () => {
        const TestComponent = () => {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ ref: buttonRef });

          return <button {...getRootProps()} className={active ? 'active' : ''} />;
        };

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        expect(button).to.have.class('active');
        fireEvent.mouseUp(button);
        expect(button).not.to.have.class('active');
      });

      it('is set when triggered by keyboard', () => {
        const TestComponent = () => {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ ref: buttonRef });

          return <button {...getRootProps()} className={active ? 'active' : ''} />;
        };

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        button.focus();
        fireEvent.keyDown(button, { key: ' ' });
        expect(button).to.have.class('active');
        fireEvent.keyUp(button, { key: ' ' });
        expect(button).not.to.have.class('active');
      });
    });

    describe('when using a span element', () => {
      it('is set when triggered by mouse', () => {
        const TestComponent = () => {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ ref: buttonRef, component: 'span' });

          return <span {...getRootProps()} className={active ? 'active' : ''} />;
        };

        const { getByRole } = render(<TestComponent />);
        const button = getByRole('button');
        fireEvent.mouseDown(button);
        expect(button).to.have.class('active');
        fireEvent.mouseUp(button);
        expect(button).not.to.have.class('active');
      });

      it('is set when triggered by keyboard', () => {
        const TestComponent = () => {
          const buttonRef = React.useRef(null);
          const { active, getRootProps } = useButton({ ref: buttonRef, component: 'span' });

          return <span {...getRootProps()} className={active ? 'active' : ''} />;
        };

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
        const TestComponent = (props: WithClickHandler) => {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ...props, ref });
          return <button {...getRootProps()} />;
        };

        const handleClick = spy();

        const { getByRole } = render(<TestComponent onClick={handleClick} />);
        fireEvent.click(getByRole('button'));

        expect(handleClick.callCount).to.equal(1);
      });

      it('calls them when provided in getRootProps()', () => {
        const handleClick = spy();

        const TestComponent = () => {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ref });
          return <button {...getRootProps({ onClick: handleClick })} />;
        };

        const { getByRole } = render(<TestComponent />);
        fireEvent.click(getByRole('button'));

        expect(handleClick.callCount).to.equal(1);
      });

      it('calls the one provided in getRootProps() when both props and getRootProps have ones', () => {
        const handleClickExternal = spy();
        const handleClickInternal = spy();

        const TestComponent = (props: WithClickHandler) => {
          const ref = React.useRef(null);
          const { getRootProps } = useButton({ ...props, ref });
          return <button {...getRootProps({ onClick: handleClickInternal })} />;
        };

        const { getByRole } = render(<TestComponent onClick={handleClickExternal} />);
        fireEvent.click(getByRole('button'));

        expect(handleClickInternal.callCount).to.equal(1);
        expect(handleClickExternal.callCount).to.equal(0);
      });
    });
  });
});
