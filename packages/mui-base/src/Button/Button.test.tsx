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
import Button, { buttonClasses } from '@mui/base/Button';

describe('<Button />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Button />, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiButton',
    slots: {
      root: {
        expectedClassName: buttonClasses.root,
      },
    },
  }));

  describe('role attribute', () => {
    it('is set when the root component is an HTML element other than a button', () => {
      const { getByRole } = render(<Button component="span" />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is set when the root component is a component that renders an HTML component other than a button', () => {
      const WrappedSpan = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLSpanElement>,
          ref: React.ForwardedRef<HTMLSpanElement>,
        ) => <span role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<Button component={WrappedSpan} />);
      expect(getByRole('button')).not.to.equal(null);
    });

    it('is not set when the root component is a component that renders an HTML button component', () => {
      const WrappedButton = React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLButtonElement>,
          ref: React.ForwardedRef<HTMLButtonElement>,
        ) => <button role={props.role} ref={ref} />,
      );

      const { getByRole } = render(<Button component={WrappedButton} />);
      expect(getByRole('button')).not.to.have.attribute('role');
    });
  });

  describe('prop: focusableWhenDisabled', () => {
    describe('as native button', () => {
      it('has the aria-disabled instead of disabled attribute when disabled', () => {
        const { getByRole } = render(<Button focusableWhenDisabled disabled />);

        const button = getByRole('button');
        expect(button).to.have.attribute('aria-disabled');
        expect(button).not.to.have.attribute('disabled');
      });

      it('can receive focus when focusableWhenDisabled is set', () => {
        const { getByRole } = render(<Button focusableWhenDisabled disabled />);

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        expect(document.activeElement).to.equal(button);
      });

      it('does not respond to user actions when disabled and focused', () => {
        const handleClick = spy();
        const { getByRole } = render(
          <Button focusableWhenDisabled disabled onClick={handleClick} />,
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
        const { getByRole } = render(<Button component="span" focusableWhenDisabled disabled />);

        const button = getByRole('button');
        act(() => {
          button.focus();
        });

        expect(document.activeElement).to.equal(button);
      });

      it('has aria-disabled and tabIndex attributes set', () => {
        const { getByRole } = render(<Button component="span" focusableWhenDisabled disabled />);

        const button = getByRole('button');

        expect(button).to.have.attribute('aria-disabled', 'true');
        expect(button).to.have.attribute('tabindex', '0');
      });

      it('does not respond to user actions when disabled and focused', () => {
        const handleClick = spy();
        const { getByRole } = render(
          <Button component="span" focusableWhenDisabled disabled onClick={handleClick} />,
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

  describe('prop: href', () => {
    it('renders as a link when the "href" prop is provided', () => {
      const { getByRole } = render(<Button href="#" />);
      expect(getByRole('link')).not.to.equal(null);
    });

    it('renders as the element provided in the "component" prop, even with a "href" prop', () => {
      const { getByRole } = render(<Button component="h1" href="#" />);
      expect(getByRole('heading')).not.to.equal(null);
    });

    it('renders as the element provided in the "components.Root" prop, even with a "href" prop', () => {
      const { getByRole } = render(<Button slots={{ root: 'h1' }} href="#" />);
      expect(getByRole('heading')).not.to.equal(null);
    });
  });

  describe('prop: to', () => {
    it('renders as a link when the "to" prop is provided', () => {
      const { container } = render(<Button to="#" />);
      expect(container.querySelector('a')).not.to.equal(null);
    });

    it('renders as the element provided in the "component" prop, even with a "to" prop', () => {
      const { getByRole } = render(<Button component="h1" to="#" />);
      expect(getByRole('heading')).not.to.equal(null);
    });

    it('renders as the element provided in the "components.Root" prop, even with a "to" prop', () => {
      const { getByRole } = render(<Button slots={{ root: 'h1' }} to="#" />);
      expect(getByRole('heading')).not.to.equal(null);
    });
  });
});
