import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { spy } from 'sinon';
import useRovingTabIndexFocus from './useRovingTabIndex';

type TestComponentProps = {
  initialIndex: number;
  orientation: 'horizontal' | 'vertical';
  isRtl: boolean;
};

const defaultProps: TestComponentProps = {
  initialIndex: 0,
  orientation: 'horizontal',
  isRtl: false,
};

function TestComponent(props: Partial<TestComponentProps>) {
  const { handleKeyDown, focusableIndex, registerElementRef, handleClick } = useRovingTabIndexFocus(
    { ...defaultProps, ...props },
  );

  const button1Ref = React.useRef<HTMLButtonElement>(null);
  const button2Ref = React.useRef<HTMLButtonElement>(null);
  const button3Ref = React.useRef<HTMLButtonElement>(null);
  const button4Ref = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    registerElementRef(0, button1Ref, false);
    registerElementRef(1, button2Ref, false);
    registerElementRef(2, button3Ref, true);
    registerElementRef(3, button4Ref, false);
  }, [registerElementRef]);

  return (
    <div data-testid="container">
      <button
        ref={button1Ref}
        tabIndex={focusableIndex === 0 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-1"
      >
        Button 1
      </button>
      <button
        ref={button2Ref}
        tabIndex={focusableIndex === 1 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-2"
      >
        Button 2
      </button>
      <button
        ref={button3Ref}
        tabIndex={focusableIndex === 2 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-3"
        disabled
      >
        Button 3
      </button>
      <button
        ref={button4Ref}
        tabIndex={focusableIndex === 3 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-4"
      >
        Button 4
      </button>
    </div>
  );
}

describe('useRovingTabIndexFocus', () => {
  const { render } = createRenderer();

  it('initial focusable index is set correctly', () => {
    const initialIndex = 1;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  it('sets focusable index to next enabled element if initial index is on a disabled element', () => {
    const initialIndex = 2;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('0');
  });

  it('setter function updates focusable index correctly', async () => {
    const initialIndex = 0;

    const { user } = render(<TestComponent initialIndex={initialIndex} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');

    await user.click(button2);

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
  });

  it('keyboard navigation updates focusable index correctly', async () => {
    const initialIndex = 0;

    const { user } = render(<TestComponent initialIndex={initialIndex} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  it('does not change focusable index if a non-arrow key is pressed', async () => {
    const initialIndex = 0;

    const { user } = render(<TestComponent initialIndex={initialIndex} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{Enter}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  it.each(['Shift', 'Control', 'Alt', 'Meta'])(
    'does not change focusable index if a %s modifier key is pressed',
    async (modifier) => {
      const initialIndex = 0;

      const { user } = render(<TestComponent initialIndex={initialIndex} />);

      const button1 = screen.getByTestId('button-1');
      const button2 = screen.getByTestId('button-2');
      const button3 = screen.getByTestId('button-3');
      const button4 = screen.getByTestId('button-4');

      await user.click(button1);
      await user.keyboard(`{${modifier}>}{ArrowRight}{/${modifier}}`);

      expect(button1.getAttribute('tabindex')).to.equal('0');
      expect(button2.getAttribute('tabindex')).to.equal('-1');
      expect(button3.getAttribute('tabindex')).to.equal('-1');
      expect(button4.getAttribute('tabindex')).to.equal('-1');
      expect(button1).toHaveFocus();
    },
  );

  it('prevents default behavior of arrow keys when navigating', async () => {
    const initialIndex = 0;

    const { user } = render(<TestComponent initialIndex={initialIndex} />);

    const button1 = screen.getByTestId('button-1');

    await user.click(button1);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    const preventDefaultSpy = spy(event, 'preventDefault');

    fireEvent(button1, event);

    expect(preventDefaultSpy.callCount).to.equal(1);
  });
});
