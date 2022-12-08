import * as React from 'react';
import {
  act,
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
} from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

describe('<ButtonUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<ButtonUnstyled />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiButton',
    slots: {
      root: {
        expectedClassName: buttonUnstyledClasses.root,
      },
    },
  }));

  describe('role attribute', () => {
    it('is set when the root component is an HTML element other than a button', () => {
      const { getByRole } = render(<ButtonUnstyled component="span" />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is set when the root component is a component that renders an HTML component other than a button', () => {
      const WrappedSpan = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLSpanElement>,
          ref: React.ForwardedRef<HTMLSpanElement>,
        ) => <span role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<ButtonUnstyled component={WrappedSpan} />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is not set when the root component is a component that renders an HTML button component', () => {
      const WrappedButton = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLButtonElement>,
          ref: React.ForwardedRef<HTMLButtonElement>,
        ) => <button role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<ButtonUnstyled component={WrappedButton} />);
      expect(getByRole('button')).not.to.have.attribute('role');
    });
  });

  describe('prop: focusableWhenDisabled', () => {
    describe('as native button', () => {
      it('has the aria-disabled instead of disabled attribute when disabled', () => {
        const { getByRole } = render(<ButtonUnstyled focusableWhenDisabled disabled />);

        const button = getByRole('button');
        expect(button).to.have.attribute('aria-disabled');
        expect(button).not.to.have.attribute('disabled');
      });

      it('can receive focus when focusableWhenDisabled is set', () => {
        const { getByRole } = render(<ButtonUnstyled focusableWhenDisabled disabled />);

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        expect(document.activeElement).to.equal(button);
      });

      it('does not respond to user actions when disabled and focused', () => {
        const handleClick = spy();
        const { getByRole } = render(
          <ButtonUnstyled focusableWhenDisabled disabled onClick={handleClick} />,
        );

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        act(() => {
          button.click();
          fireEvent.keyDown(button, { key: 'Enter' });
          fireEvent.keyUp(button, { key: ' ' });
        });

        expect(handleClick.callCount).to.equal(0);
      });
    });

    describe('as non-button element', () => {
      it('can receive focus when focusableWhenDisabled is set', () => {
        const { getByRole } = render(
          <ButtonUnstyled component="span" focusableWhenDisabled disabled />,
        );

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        expect(document.activeElement).to.equal(button);
      });

      it('has aria-disabled and tabIndex attributes set', () => {
        const { getByRole } = render(
          <ButtonUnstyled component="span" focusableWhenDisabled disabled />,
        );

        const button = getByRole('button');

        expect(button).to.have.attribute('aria-disabled', 'true');
        expect(button).to.have.attribute('tabindex', '0');
      });

      it('does not respond to user actions when disabled and focused', () => {
        const handleClick = spy();
        const { getByRole } = render(
          <ButtonUnstyled component="span" focusableWhenDisabled disabled onClick={handleClick} />,
        );

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        act(() => {
          button.click();
          fireEvent.keyDown(button, { key: 'Enter' });
          fireEvent.keyUp(button, { key: ' ' });
        });

        expect(handleClick.callCount).to.equal(0);
      });
    });
  });
});
