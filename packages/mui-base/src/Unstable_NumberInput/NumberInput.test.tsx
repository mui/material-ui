import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import userEvent from '@testing-library/user-event';
import NumberInput, {
  numberInputClasses,
  NumberInputOwnerState,
} from '@mui/base/Unstable_NumberInput';
import { act, createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';

describe('<NumberInput />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<NumberInput />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiNumberInput',
    slots: {
      root: {
        expectedClassName: numberInputClasses.root,
      },
      input: {
        expectedClassName: numberInputClasses.input,
        testWithElement: 'input',
      },
      incrementButton: {
        expectedClassName: numberInputClasses.incrementButton,
        testWithElement: 'button',
      },
      decrementButton: {
        expectedClassName: numberInputClasses.decrementButton,
        testWithElement: 'button',
      },
    },
  }));

  it('should be able to attach input ref passed through props', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <NumberInput slotProps={{ input: { 'data-testid': 'input', ref: inputRef } as any }} />,
    );

    expect(inputRef.current).to.deep.equal(getByTestId('input'));
  });

  it('passes ownerState to all the slots', () => {
    interface SlotProps {
      ownerState: NumberInputOwnerState;
      children?: React.ReactNode;
    }

    const CustomComponent = React.forwardRef(
      ({ ownerState, children }: SlotProps, ref: React.Ref<any>) => {
        return (
          <div
            ref={ref}
            data-disabled={ownerState.disabled}
            data-focused={ownerState.focused}
            data-readonly={ownerState.readOnly}
            data-decrementdisabled={ownerState.isDecrementDisabled}
            data-incrementdisabled={ownerState.isIncrementDisabled}
            data-testid="custom"
          >
            {children}
          </div>
        );
      },
    );

    const slots = {
      root: CustomComponent,
      input: CustomComponent,
      decrementButton: CustomComponent,
      incrementButton: CustomComponent,
    };

    const { getAllByTestId } = render(<NumberInput readOnly disabled slots={slots} />);
    const renderedComponents = getAllByTestId('custom');

    expect(renderedComponents.length).to.equal(4);
    for (let i = 0; i < renderedComponents.length; i += 1) {
      expect(renderedComponents[i]).to.have.attribute('data-disabled', 'true');
      expect(renderedComponents[i]).to.have.attribute('data-focused', 'false');
      expect(renderedComponents[i]).to.have.attribute('data-readonly', 'true');
      expect(renderedComponents[i]).to.have.attribute('data-decrementdisabled', 'true');
      expect(renderedComponents[i]).to.have.attribute('data-incrementdisabled', 'true');
    }
  });

  describe('step buttons', () => {
    it('clicking the increment and decrement buttons changes the value', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          onValueChange={handleValueChange}
          slotProps={
            {
              input: {
                'data-testid': 'input',
              },
              incrementButton: {
                'data-testid': 'increment-btn',
              },
              decrementButton: {
                'data-testid': 'decrement-btn',
              },
            } as any
          }
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;
      const incrementButton = getByTestId('increment-btn');
      const decrementButton = getByTestId('decrement-btn');

      await user.click(incrementButton);
      expect(handleValueChange.args[0][1]).to.equal(11);
      expect(input.value).to.equal('11');

      await user.click(decrementButton);
      await user.click(decrementButton);
      expect(handleValueChange.callCount).to.equal(3);
      expect(handleValueChange.args[2][1]).to.equal(9);
      expect(input.value).to.equal('9');
    });

    it('clicking the increment and decrement buttons changes the value based on shiftMultiplier if the Shift key is held', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onValueChange={handleValueChange}
          slotProps={
            {
              input: {
                'data-testid': 'input',
              },
              incrementButton: {
                'data-testid': 'increment-btn',
              },
              decrementButton: {
                'data-testid': 'decrement-btn',
              },
            } as any
          }
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;
      const incrementButton = getByTestId('increment-btn');
      const decrementButton = getByTestId('decrement-btn');

      await user.keyboard('{Shift>}');
      await user.click(incrementButton);
      await user.click(incrementButton);
      expect(handleValueChange.args[1][1]).to.equal(30);
      expect(input.value).to.equal('30');

      await user.click(decrementButton);
      expect(handleValueChange.args[2][1]).to.equal(25);
      expect(handleValueChange.callCount).to.equal(3);
      expect(input.value).to.equal('25');
    });

    it('clicking on the stepper buttons will focus the input', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          slotProps={
            {
              input: {
                'data-testid': 'input',
              },
              incrementButton: {
                'data-testid': 'increment-btn',
              },
              decrementButton: {
                'data-testid': 'decrement-btn',
              },
            } as any
          }
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;
      const incrementButton = getByTestId('increment-btn');
      const decrementButton = getByTestId('decrement-btn');

      expect(document.activeElement).to.equal(document.body);

      await user.click(incrementButton);

      expect(document.activeElement).to.equal(input);

      act(() => {
        input.blur();
      });

      expect(document.activeElement).to.equal(document.body);

      await user.click(decrementButton);

      expect(document.activeElement).to.equal(input);
    });
  });

  describe('keyboard interaction', () => {
    it('ArrowUp and ArrowDown changes the value', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowUp]');
      expect(handleValueChange.callCount).to.equal(2);
      expect(handleValueChange.args[1][1]).to.equal(12);
      expect(input.value).to.equal('12');

      await user.keyboard('[ArrowDown]');
      expect(handleValueChange.callCount).to.equal(3);
      expect(handleValueChange.args[2][1]).to.equal(11);
      expect(input.value).to.equal('11');
    });

    it('ArrowUp and ArrowDown changes the value based on a custom step', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          step={5}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[ArrowUp]');
      await user.keyboard('[ArrowUp]');
      expect(handleValueChange.args[1][1]).to.equal(20);
      expect(input.value).to.equal('20');

      await user.keyboard('[ArrowDown]');
      expect(handleValueChange.args[2][1]).to.equal(15);
      expect(handleValueChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('ArrowUp and ArrowDown changes the value based on shiftMultiplier if the Shift key is held', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('{Shift>}[ArrowUp]/');
      expect(handleValueChange.callCount).to.equal(1);
      expect(handleValueChange.args[0][1]).to.equal(25);
      expect(input.value).to.equal('25');

      await user.keyboard('{Shift>}[ArrowDown][ArrowDown]{/Shift}');
      expect(handleValueChange.args[2][1]).to.equal(15);
      expect(handleValueChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('PageUp and PageDown changes the value based on shiftMultiplier', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[PageUp]');
      expect(handleValueChange.args[0][1]).to.equal(25);
      expect(input.value).to.equal('25');

      await user.keyboard('[PageDown][PageDown]');
      expect(handleValueChange.args[2][1]).to.equal(15);
      expect(handleValueChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('sets value to max when Home is pressed', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          max={50}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[Home]');
      expect(handleValueChange.args[0][1]).to.equal(50);
      expect(input.value).to.equal('50');
    });

    it('sets value to min when End is pressed', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          min={1}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[End]');
      expect(handleValueChange.args[0][1]).to.equal(1);
      expect(input.value).to.equal('1');
    });

    it('sets value to min when the input has no value and ArrowUp is pressed', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          min={5}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[ArrowUp]');
      expect(handleValueChange.args[0][1]).to.equal(5);
      expect(input.value).to.equal('5');
    });

    it('sets value to max when the input has no value and ArrowDown is pressed', async () => {
      const user = userEvent.setup();
      const handleValueChange = spy();

      const { getByTestId } = render(
        <NumberInput
          max={9}
          onValueChange={handleValueChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await user.click(input);

      await user.keyboard('[ArrowDown]');
      expect(handleValueChange.args[0][1]).to.equal(9);
      expect(input.value).to.equal('9');
    });
  });

  describe('prop: readOnly', () => {
    it('stepper buttons should not be in the tab order when readOnly is false', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <NumberInput slotProps={{ input: { 'data-testid': 'input' } } as any} />,
      );

      const input = getByTestId('input') as HTMLInputElement;
      expect(document.activeElement).to.equal(document.body);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(input);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);
    });

    it('tab order should be increment button, decrement button when readOnly is true', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <NumberInput
          readOnly
          slotProps={
            {
              input: {
                'data-testid': 'input',
              },
              incrementButton: {
                'data-testid': 'increment-btn',
              },
              decrementButton: {
                'data-testid': 'decrement-btn',
              },
            } as any
          }
        />,
      );

      const incrementButton = getByTestId('increment-btn');
      const decrementButton = getByTestId('decrement-btn');
      expect(document.activeElement).to.equal(document.body);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(decrementButton);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(incrementButton);

      await user.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);
    });
  });
});
