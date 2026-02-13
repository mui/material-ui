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
    registerElementRef(button1Ref, 0);
    registerElementRef(button2Ref, 1);
    registerElementRef(button3Ref, 2);
    registerElementRef(button4Ref, 3);
  }, [registerElementRef]);

  return (
    <div data-testid="container">
      <button
        ref={button1Ref}
        tabIndex={focusableIndex === 0 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-1"
        role="tab"
      >
        Button 1
      </button>
      <button
        ref={button2Ref}
        tabIndex={focusableIndex === 1 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-2"
        role="tab"
      >
        Button 2
      </button>
      <button
        ref={button3Ref}
        tabIndex={focusableIndex === 2 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-testid="button-3"
        role="tab"
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
        role="tab"
      >
        Button 4
      </button>
    </div>
  );
}

describe('useRovingTabIndexFocus', () => {
  const { render } = createRenderer();

  it('should set initial focusable index correctly', () => {
    const initialIndex = 1;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  it('should set focusable index to next enabled element if initial index is on a disabled element', () => {
    const initialIndex = 2;

    render(<TestComponent initialIndex={initialIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('0');
  });

  it('should update focusable index correctly when clicked', async () => {
    const { user } = render(<TestComponent />);

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

  it('should focus correctly using left and right arrow keys on horizontal orientation while skipping disabled elements', async () => {
    const { user } = render(<TestComponent />);

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

  it('should focus correctly using up and down arrow keys on vertical orientation while skipping disabled elements', async () => {
    const { user } = render(<TestComponent orientation="vertical" />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{ArrowDown}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  it('should skip aria-disabled elements when navigating with arrow keys', async () => {
    const { user } = render(<TestComponent />);

    screen.getByTestId('button-2').setAttribute('aria-disabled', 'true');

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-4')).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  it('should skip disabled elements at the start and end when navigating with arrow keys', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    button1.setAttribute('aria-disabled', 'true');
    button4.setAttribute('disabled', 'true');
    button3.removeAttribute('disabled');

    await user.click(button2);
    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('0');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button3).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();
  });

  it('should move to the end of the list when End key is pressed and to the start when Home key is pressed', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{End}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{Home}');

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

  it.each(['button', 'tab', 'menuitem', 'option'])(
    'should only consider elements with the %s role as focusable',
    async (role) => {
      const { user } = render(<TestComponent />);

      const button1 = screen.getByTestId('button-1');
      const button2 = screen.getByTestId('button-2');

      button1.setAttribute('role', role);
      button2.setAttribute('role', role);

      await user.click(button1);
      await user.keyboard('{ArrowRight}');

      expect(button1.getAttribute('tabindex')).to.equal('-1');
      expect(button2.getAttribute('tabindex')).to.equal('0');
      expect(button2).toHaveFocus();
    },
  );

  it('should not change focus if the next focusable element does not have a supported role', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');

    button1.setAttribute('role', 'presentation');
    button2.setAttribute('role', 'presentation');

    await user.click(button1);
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
  });

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

  it('does not prevent default behavior of non-arrow keys', async () => {
    const initialIndex = 0;

    const { user } = render(<TestComponent initialIndex={initialIndex} />);

    const button1 = screen.getByTestId('button-1');

    await user.click(button1);

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    const preventDefaultSpy = spy(event, 'preventDefault');

    fireEvent(button1, event);

    expect(preventDefaultSpy.callCount).to.equal(0);
  });

  it('supports RTL orientation by reversing the behavior of left and right arrow keys', async () => {
    const { user } = render(<TestComponent orientation="horizontal" isRtl />);

    const button1 = screen.getByTestId('button-1');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  it('does not consider RTL direction for vertical orientation', async () => {
    const { user } = render(<TestComponent orientation="vertical" isRtl />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');

    await user.click(button1);
    await user.keyboard('{ArrowDown}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button2).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });
});
