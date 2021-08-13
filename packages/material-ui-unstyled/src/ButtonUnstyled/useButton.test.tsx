import * as React from 'react';
import { useButton } from '@material-ui/unstyled/ButtonUnstyled';
import { createClientRender, fireEvent } from 'test/utils';
import { expect } from 'chai';

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
  });
});
