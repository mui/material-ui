import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import userEvent from '@testing-library/user-event';
import {
  act,
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
} from 'test/utils';
import {
  Unstable_NumberInput as NumberInput,
  numberInputClasses,
  NumberInputOwnerState,
} from '@mui/base/Unstable_NumberInput';

// TODO v6: initialize @testing-library/user-event using userEvent.setup() instead of directly calling methods e.g. userEvent.click() for all related tests in this file
// currently the setup() method uses the ClipboardEvent constructor which is incompatible with our lowest supported version of iOS Safari (12.2) https://github.com/mui/material-ui/blob/master/.browserslistrc#L44
// userEvent.setup() requires Safari 14 or up to work

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
    skip: ['componentProp'],
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
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          onChange={handleChange}
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

      await userEvent.click(incrementButton);
      expect(handleChange.args[0][1]).to.equal(11);
      expect(input.value).to.equal('11');

      await userEvent.click(decrementButton);
      await userEvent.click(decrementButton);
      expect(handleChange.callCount).to.equal(3);
      expect(handleChange.args[2][1]).to.equal(9);
      expect(input.value).to.equal('9');
    });

    it('clicking the increment and decrement buttons changes the value based on shiftMultiplier if the Shift key is held', () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onChange={handleChange}
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

      fireEvent.click(incrementButton, { shiftKey: true });
      fireEvent.click(incrementButton, { shiftKey: true });
      expect(handleChange.args[1][1]).to.equal(30);
      expect(input.value).to.equal('30');

      fireEvent.click(decrementButton, { shiftKey: true });
      expect(handleChange.args[2][1]).to.equal(25);
      expect(handleChange.callCount).to.equal(3);
      expect(input.value).to.equal('25');
    });

    it('clicking on the stepper buttons will focus the input', async () => {
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

      await userEvent.click(incrementButton);

      expect(document.activeElement).to.equal(input);

      act(() => {
        input.blur();
      });

      expect(document.activeElement).to.equal(document.body);

      await userEvent.click(decrementButton);

      expect(document.activeElement).to.equal(input);
    });
  });

  describe('keyboard interaction', () => {
    it('ArrowUp and ArrowDown changes the value', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[ArrowUp]');
      await userEvent.keyboard('[ArrowUp]');
      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.args[1][1]).to.equal(12);
      expect(input.value).to.equal('12');

      await userEvent.keyboard('[ArrowDown]');
      expect(handleChange.callCount).to.equal(3);
      expect(handleChange.args[2][1]).to.equal(11);
      expect(input.value).to.equal('11');
    });

    it('ArrowUp and ArrowDown changes the value based on a custom step', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          step={5}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[ArrowUp]');
      await userEvent.keyboard('[ArrowUp]');
      expect(handleChange.args[1][1]).to.equal(20);
      expect(input.value).to.equal('20');

      await userEvent.keyboard('[ArrowDown]');
      expect(handleChange.args[2][1]).to.equal(15);
      expect(handleChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('ArrowUp and ArrowDown changes the value based on shiftMultiplier if the Shift key is held', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('{Shift>}[ArrowUp]/');
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(25);
      expect(input.value).to.equal('25');

      await userEvent.keyboard('{Shift>}[ArrowDown][ArrowDown]{/Shift}');
      expect(handleChange.args[2][1]).to.equal(15);
      expect(handleChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('PageUp and PageDown changes the value based on shiftMultiplier', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={20}
          shiftMultiplier={5}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[PageUp]');
      expect(handleChange.args[0][1]).to.equal(25);
      expect(input.value).to.equal('25');

      await userEvent.keyboard('[PageDown][PageDown]');
      expect(handleChange.args[2][1]).to.equal(15);
      expect(handleChange.callCount).to.equal(3);
      expect(input.value).to.equal('15');
    });

    it('sets value to max when Home is pressed', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          max={50}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[Home]');
      expect(handleChange.args[0][1]).to.equal(50);
      expect(input.value).to.equal('50');
    });

    it('sets value to min when End is pressed', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          defaultValue={10}
          min={1}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[End]');
      expect(handleChange.args[0][1]).to.equal(1);
      expect(input.value).to.equal('1');
    });

    it('sets value to min when the input has no value and ArrowUp is pressed', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          min={5}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[ArrowUp]');
      expect(handleChange.args[0][1]).to.equal(5);
      expect(input.value).to.equal('5');
    });

    it('sets value to max when the input has no value and ArrowDown is pressed', async () => {
      const handleChange = spy();

      const { getByTestId } = render(
        <NumberInput
          max={9}
          onChange={handleChange}
          slotProps={{ input: { 'data-testid': 'input' } } as any}
        />,
      );

      const input = getByTestId('input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('[ArrowDown]');
      expect(handleChange.args[0][1]).to.equal(9);
      expect(input.value).to.equal('9');
    });

    it('only includes the input element in the tab order', async () => {
      const { getByTestId } = render(
        <NumberInput slotProps={{ input: { 'data-testid': 'input' } } as any} />,
      );

      const input = getByTestId('input') as HTMLInputElement;
      expect(document.activeElement).to.equal(document.body);

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(input);

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);
    });
  });
});
