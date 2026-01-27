import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import useRovingTabIndexFocus from './useRovingTabIndexFocus';

function TestComponent({ initialIndex }: { initialIndex: number }) {
  const { handleElementKeyDown, focusableIndex, registerElementRef, setFocusableIndex } =
    useRovingTabIndexFocus({ initialFocusableIndex: initialIndex, elementCount: 4 });

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
        onKeyDown={handleElementKeyDown}
        onClick={() => setFocusableIndex(0)}
        data-testid="button-1"
      >
        Button 1
      </button>
      <button
        ref={button2Ref}
        tabIndex={focusableIndex === 1 ? 0 : -1}
        onKeyDown={handleElementKeyDown}
        onClick={() => setFocusableIndex(1)}
        data-testid="button-2"
      >
        Button 2
      </button>
      <button
        ref={button3Ref}
        tabIndex={focusableIndex === 2 ? 0 : -1}
        onKeyDown={handleElementKeyDown}
        onClick={() => setFocusableIndex(2)}
        data-testid="button-3"
        disabled
      >
        Button 3
      </button>
      <button
        ref={button4Ref}
        tabIndex={focusableIndex === 3 ? 0 : -1}
        onKeyDown={handleElementKeyDown}
        onClick={() => setFocusableIndex(3)}
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

  it('initial focusable index defaults to 0 if out of bounds', () => {
    const initialIndex = 10;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  it('sets focusable index to 0 if initial index is negative', () => {
    const initialIndex = -5;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
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
});
