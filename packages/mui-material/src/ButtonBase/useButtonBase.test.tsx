import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import useButtonBase, { UseButtonBaseParameters } from './useButtonBase';

interface TestButtonProps extends UseButtonBaseParameters {
  component?: 'button' | 'div';
  id?: string;
}

function TestButton(props: TestButtonProps) {
  const { component = 'div', id, ...params } = props;
  const { eventHandlers, rootRef } = useButtonBase(params);
  const Component = component;
  const focusableProps = component === 'div' ? { tabIndex: 0 } : undefined;

  return (
    <Component
      data-testid={id ?? 'root'}
      ref={rootRef as any}
      {...focusableProps}
      {...eventHandlers}
    />
  );
}

describe('useButtonBase', () => {
  const { render } = createRenderer();

  describe('onClick composition', () => {
    it('calls onClick when not disabled', () => {
      const handleClick = spy();

      render(<TestButton disabled={false} nativeButton={false} onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('root'));

      expect(handleClick.callCount).to.equal(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = spy();

      render(<TestButton disabled nativeButton={false} onClick={handleClick} />);

      fireEvent.click(screen.getByTestId('root'));

      expect(handleClick.callCount).to.equal(0);
    });

    it('stopEventPropagation stops propagation even when disabled', () => {
      const handleParentClick = spy();
      const handleClick = spy();

      render(
        <div onClick={handleParentClick}>
          <TestButton
            disabled
            nativeButton={false}
            onClick={handleClick}
            stopEventPropagation
          />
        </div>,
      );

      fireEvent.click(screen.getByTestId('root'));

      expect(handleParentClick.callCount).to.equal(0);
      expect(handleClick.callCount).to.equal(0);
    });
  });

  describe('keyboard activation', () => {
    it('runs onBeforeKeyDown before onKeyDown', () => {
      const order: string[] = [];

      render(
        <TestButton
          disabled={false}
          nativeButton={false}
          onBeforeKeyDown={() => {
            order.push('before');
          }}
          onKeyDown={() => {
            order.push('user');
          }}
        />,
      );

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });

      fireEvent.keyDown(el, { key: 'Enter' });

      expect(order).to.deep.equal(['before', 'user']);
    });

    it('Enter on keyDown activates click for pseudo-buttons', () => {
      const handleClick = spy();

      render(<TestButton disabled={false} nativeButton={false} onClick={handleClick} />);

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });
      fireEvent.keyDown(el, { key: 'Enter' });

      expect(handleClick.callCount).to.equal(1);
    });

    it('Space on keyDown prevents default and keyUp activates click for pseudo-buttons', () => {
      const handleClick = spy();
      const handleKeyDown = spy();

      render(
        <TestButton
          disabled={false}
          nativeButton={false}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />,
      );

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });

      fireEvent.keyDown(el, { key: ' ' });
      expect(handleKeyDown.callCount).to.equal(1);
      expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
      expect(handleClick.callCount).to.equal(0);

      fireEvent.keyUp(el, { key: ' ' });
      expect(handleClick.callCount).to.equal(1);
    });

    it('does not fire when the event comes from a child element', () => {
      const handleClick = spy();

      function TestWithChild(props: UseButtonBaseParameters) {
        const { eventHandlers, rootRef } = useButtonBase(props);

        return (
          <div data-testid="root" ref={rootRef as React.Ref<HTMLDivElement>} {...eventHandlers}>
            <button type="button" data-testid="child">
              child
            </button>
          </div>
        );
      }

      render(<TestWithChild disabled={false} nativeButton={false} onClick={handleClick} />);

      const child = screen.getByTestId('child');
      act(() => {
        child.focus();
      });

      fireEvent.keyDown(child, { key: 'Enter' });
      fireEvent.keyUp(child, { key: ' ' });

      expect(handleClick.callCount).to.equal(0);
    });

    it('does not fire when disabled', () => {
      const handleClick = spy();

      render(<TestButton disabled nativeButton={false} onClick={handleClick} />);

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });

      fireEvent.keyDown(el, { key: 'Enter' });
      fireEvent.keyUp(el, { key: ' ' });

      expect(handleClick.callCount).to.equal(0);
    });

    it('does not synthesize clicks for native buttons', () => {
      const handleClick = spy();

      render(<TestButton component="button" disabled={false} nativeButton onClick={handleClick} />);

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });

      fireEvent.keyDown(el, { key: 'Enter' });
      fireEvent.keyUp(el, { key: ' ' });

      expect(handleClick.callCount).to.equal(0);
    });

    it('resolves keyboard behavior from the resolved host', () => {
      const handleClick = spy();
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <TestButton
          component="button"
          disabled={false}
          nativeButton={false}
          onClick={handleClick}
        />,
      );

      const el = screen.getByTestId('root');
      act(() => {
        el.focus();
      });

      fireEvent.keyDown(el, { key: 'Enter' });

      expect(handleClick.callCount).to.equal(0);
      errorSpy.mockRestore();
    });
  });

  describe('dev warnings', () => {
    it('warns when nativeButton=true but the resolved host is not a button', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<TestButton component="div" disabled={false} nativeButton />);

      const allArgs = errorSpy.mock.calls.map((call) => call[0]);
      expect(allArgs.length).to.be.greaterThanOrEqual(1);
      expect(
        allArgs.some((msg) =>
          msg.includes('A component that acts as a button expected a native <button>'),
        ),
      ).to.equal(true);
      errorSpy.mockRestore();
    });

    it('warns when nativeButton=false but the resolved host is a button', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<TestButton component="button" disabled={false} nativeButton={false} />);

      const allArgs = errorSpy.mock.calls.map((call) => call[0]);
      expect(allArgs.length).to.be.greaterThanOrEqual(1);
      expect(
        allArgs.some((msg) =>
          msg.includes('A component that acts as a button expected a non-button host'),
        ),
      ).to.equal(true);
      errorSpy.mockRestore();
    });
  });
});
