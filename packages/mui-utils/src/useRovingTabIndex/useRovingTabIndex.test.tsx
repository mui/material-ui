import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen, act } from '@mui/internal-test-utils';
import { spy } from 'sinon';
import useRovingTabIndex, { type UseRovingTabIndexOptions } from './useRovingTabIndex';

let focusNext: (shouldSkipFocusOverride?: (element: HTMLElement | null) => boolean) => number;

function TestComponent(props: Partial<UseRovingTabIndexOptions>) {
  const {
    getItemProps,
    getContainerProps,
    focusNext: focusNextFn,
  } = useRovingTabIndex({
    orientation: 'horizontal',
    ...props,
  });

  focusNext = focusNextFn;

  return (
    <div data-testid="container" tabIndex={-1} {...getContainerProps()}>
      <button {...getItemProps(0)} data-testid="button-1" role="tab">
        Button 1
      </button>
      <button {...getItemProps(1)} data-testid="button-2" role="tab">
        Button 2
      </button>
      <button {...getItemProps(2)} data-testid="button-3" role="tab" disabled>
        Button 3
      </button>
      <button {...getItemProps(3)} data-testid="button-4" role="tab">
        Button 4
      </button>
    </div>
  );
}

describe('useRovingTabIndex', () => {
  const { render } = createRenderer();

  test('should set the first enabled element as focusable when no focusableIndex is provided', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  test('should set focusable index correctly', () => {
    const focusableIndex = 1;

    render(<TestComponent focusableIndex={focusableIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  test('should update focusable index when prop changes', () => {
    const focusableIndex = 1;

    const { setProps } = render(<TestComponent focusableIndex={focusableIndex} />);

    setProps({ focusableIndex: 3 });

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('0');
  });

  test('should set focusable index to next enabled element if initial index is on a disabled element', () => {
    const focusableIndex = 2;

    render(<TestComponent focusableIndex={focusableIndex} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('0');
  });

  test('should not change focusable index if initial index is on a disabled element but there are no enabled elements', () => {
    function TestComponentWithDisabledButtons() {
      const { getItemProps, getContainerProps } = useRovingTabIndex({
        orientation: 'horizontal',
      });

      return (
        <div data-testid="container" tabIndex={-1} {...getContainerProps()}>
          <button {...getItemProps(0)} data-testid="button-1" disabled role="tab">
            Button 1
          </button>
          <button {...getItemProps(1)} data-testid="button-2" disabled role="tab">
            Button 2
          </button>
        </div>
      );
    }

    render(<TestComponentWithDisabledButtons />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
  });

  test('should update focusable index when prop change and the element is disabled', () => {
    function TestComponentWithDisabledButtons() {
      const { getItemProps, getContainerProps } = useRovingTabIndex({
        orientation: 'horizontal',
      });

      return (
        <div data-testid="container" tabIndex={-1} {...getContainerProps()}>
          <button {...getItemProps(0)} data-testid="button-1" disabled role="tab">
            Button 1
          </button>
          <button {...getItemProps(1)} data-testid="button-2" disabled role="tab">
            Button 2
          </button>
        </div>
      );
    }

    const { setProps } = render(<TestComponentWithDisabledButtons />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');

    setProps({ focusableIndex: 1 });

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
  });

  test('should do nothing when there are no children', () => {
    function TestComponentWithDisabledButtons() {
      const { getContainerProps } = useRovingTabIndex({
        orientation: 'horizontal',
      });

      return <div data-testid="container" tabIndex={-1} {...getContainerProps()}></div>;
    }

    const { setProps } = render(<TestComponentWithDisabledButtons />);

    expect(screen.getByTestId('container').getAttribute('tabindex')).to.equal('-1');

    setProps({ focusableIndex: 1 });

    expect(screen.getByTestId('container').getAttribute('tabindex')).to.equal('-1');
  });

  test('should make the controlled prop take precedence over internal state', async () => {
    const focusableIndex = 1;

    const { user } = render(<TestComponent focusableIndex={focusableIndex} />);

    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-3').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-4').getAttribute('tabindex')).to.equal('-1');
  });

  test('should update focusable index correctly when clicked', async () => {
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

  test('should focus correctly using left and right arrow keys on horizontal orientation while skipping disabled elements', async () => {
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

  test('should focus correctly using up and down arrow keys on vertical orientation while skipping disabled elements', async () => {
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

  test('should not wrap focus when navigating with arrow keys if wrap is set to false', async () => {
    const { user } = render(<TestComponent shouldWrap={false} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);
    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();

    await user.click(button4);
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();
  });

  test('should skip elements that do not have the tabindex attribute set', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button4 = screen.getByTestId('button-4');

    button2.removeAttribute('tabindex');

    await user.click(button1);
    await user.keyboard('{ArrowRight}');

    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();
  });

  test('should skip aria-disabled elements when navigating with arrow keys', async () => {
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

  test('should skip disabled elements at the start and end when navigating with arrow keys', async () => {
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

  test('should move to the end of the list when End key is pressed and to the start when Home key is pressed', async () => {
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

  test('does not change focusable index if a non-arrow key is pressed', async () => {
    const { user } = render(<TestComponent />);

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

  test('should not change focus on vertical navigation when orientation is horizontal', async () => {
    const { user } = render(<TestComponent orientation="horizontal" />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');

    await user.click(button1);
    await user.keyboard('{ArrowDown}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  it.each(['Shift', 'Control', 'Alt', 'Meta'])(
    'does not change focusable index if a %s modifier key is pressed',
    async (modifier) => {
      const { user } = render(<TestComponent />);

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

  test('prevents default behavior of arrow keys when navigating', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');

    await user.click(button1);

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    const preventDefaultSpy = spy(event, 'preventDefault');

    fireEvent(button1, event);

    expect(preventDefaultSpy.callCount).to.equal(1);
  });

  test('does not prevent default behavior of non-arrow keys', async () => {
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');

    await user.click(button1);

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    const preventDefaultSpy = spy(event, 'preventDefault');

    fireEvent(button1, event);

    expect(preventDefaultSpy.callCount).to.equal(0);
  });

  test('supports RTL orientation by reversing the behavior of left and right arrow keys', async () => {
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

  test('does not consider RTL direction for vertical orientation', async () => {
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

  test('should skip focus on elements for which shouldFocus returns false', async () => {
    const shouldFocus = (element: HTMLElement | null) =>
      element?.getAttribute('data-disabled') !== 'true';

    const { user } = render(<TestComponent shouldFocus={shouldFocus} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');

    button2.setAttribute('data-disabled', 'true');
    button3.removeAttribute('disabled');

    await user.click(button1);
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('0');
    expect(button3).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button1).toHaveFocus();
  });

  test('focuses first element on arrow right when container is focused', async () => {
    const { user } = render(<TestComponent />);

    const container = screen.getByTestId('container');
    const button1 = screen.getByTestId('button-1');

    container.focus();
    await user.keyboard('{ArrowRight}');

    expect(button1.getAttribute('tabindex')).to.equal('0');
    expect(button1).toHaveFocus();
  });

  test('focuses last element on arrow left when container is focused', async () => {
    const { user } = render(<TestComponent />);

    const container = screen.getByTestId('container');
    const button4 = screen.getByTestId('button-4');

    container.focus();
    await user.keyboard('{ArrowLeft}');

    expect(button4.getAttribute('tabindex')).to.equal('0');
    expect(button4).toHaveFocus();
  });

  test('focusNext function should move focus to the next enabled element', async () => {
    const { user } = render(<TestComponent />);
    let focusNextResult: number | undefined;

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');

    await user.click(button1);

    act(() => {
      focusNextResult = focusNext();
    });

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('0');
    expect(button3.getAttribute('tabindex')).to.equal('-1');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button2).toHaveFocus();
    expect(focusNextResult).to.equal(1);
  });

  test('focusNext function should skip elements for which shouldFocus returns false', async () => {
    let focusNextResult: number | undefined;
    const shouldFocus = (element: HTMLElement | null) => element !== screen.getByTestId('button-2');

    const { user } = render(<TestComponent shouldFocus={shouldFocus} />);

    const button1 = screen.getByTestId('button-1');
    const button2 = screen.getByTestId('button-2');
    const button3 = screen.getByTestId('button-3');
    const button4 = screen.getByTestId('button-4');
    button3.removeAttribute('disabled');

    await user.click(button1);

    act(() => {
      focusNextResult = focusNext();
    });

    expect(button1.getAttribute('tabindex')).to.equal('-1');
    expect(button2.getAttribute('tabindex')).to.equal('-1');
    expect(button3.getAttribute('tabindex')).to.equal('0');
    expect(button4.getAttribute('tabindex')).to.equal('-1');
    expect(button3).toHaveFocus();
    expect(focusNextResult).to.equal(2);
  });

  test('focusNext function should return -1 if there are no next enabled elements to focus', async () => {
    let focusNextResult: number | undefined;
    const { user } = render(<TestComponent />);

    const button1 = screen.getByTestId('button-1');

    await user.click(button1);

    act(() => {
      focusNextResult = focusNext(() => false);
    });

    expect(focusNextResult).to.equal(-1);
  });

  test('should skip null items when focusing', async () => {
    function TestComponentWithNullItems() {
      const { getItemProps, getContainerProps } = useRovingTabIndex({
        orientation: 'horizontal',
      });

      getItemProps(1); // This will create a null item in the elementsRef

      return (
        <div data-testid="container" tabIndex={-1} {...getContainerProps()}>
          <button {...getItemProps(0)} data-testid="button-1">
            Button 1
          </button>
          <button {...getItemProps(2)} data-testid="button-2">
            Button 2
          </button>
        </div>
      );
    }

    const { user } = render(<TestComponentWithNullItems />);

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('-1');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('0');
  });

  test('passing refs to the container and items should not break the hook', () => {
    const containerRef = { current: null } as React.RefObject<HTMLDivElement | null>;
    const buttonRef = { current: null } as React.RefObject<HTMLButtonElement | null>;
    const TestComponentWithRef = React.forwardRef<
      HTMLDivElement,
      { buttonRef: React.Ref<HTMLButtonElement> }
    >((props, ref) => {
      const { getItemProps, getContainerProps } = useRovingTabIndex({
        orientation: 'horizontal',
        ...props,
      });

      return (
        <div data-testid="container" tabIndex={-1} {...getContainerProps(ref)}>
          <button {...getItemProps(0, props.buttonRef)} data-testid="button-1">
            Button 1
          </button>
          <button {...getItemProps(1)} data-testid="button-2">
            Button 2
          </button>
        </div>
      );
    });

    render(<TestComponentWithRef ref={containerRef} buttonRef={buttonRef} />);

    expect(screen.getByTestId('button-1').getAttribute('tabindex')).to.equal('0');
    expect(screen.getByTestId('button-2').getAttribute('tabindex')).to.equal('-1');
    expect(containerRef.current).to.equal(screen.getByTestId('container'));
    expect(buttonRef.current).to.equal(screen.getByTestId('button-1'));
  });
});
