import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import userEvent from '@testing-library/user-event';
import { createRenderer, screen } from '@mui/internal-test-utils';
import {
  unstable_useNumberInput as useNumberInput,
  UseNumberInputParameters,
} from '@mui/base/unstable_useNumberInput';

// TODO v6: initialize @testing-library/user-event using userEvent.setup() instead of directly calling methods e.g. userEvent.click() for all related tests in this file
// currently the setup() method uses the ClipboardEvent constructor which is incompatible with our lowest supported version of iOS Safari (12.2) https://github.com/mui/material-ui/blob/master/.browserslistrc#L44
// userEvent.setup() requires Safari 14 or up to work

describe('useNumberInput', () => {
  const { render } = createRenderer();
  const invokeUseNumberInput = (props: UseNumberInputParameters) => {
    const ref = React.createRef<ReturnType<typeof useNumberInput>>();
    function TestComponent() {
      const numberInputDefinition = useNumberInput(props);
      React.useImperativeHandle(ref, () => numberInputDefinition, [numberInputDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  it('should return correct ARIA attributes', () => {
    const INPUT_ID = 'TestInput';

    const props: UseNumberInputParameters = {
      inputId: INPUT_ID,
      value: 50,
      min: 10,
      max: 100,
      disabled: true,
    };

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      invokeUseNumberInput(props);
    const inputProps = getInputProps();
    const incrementButtonProps = getIncrementButtonProps();
    const decrementButtonProps = getDecrementButtonProps();

    expect(inputProps['aria-valuenow']).to.equal(50);
    expect(inputProps['aria-valuemin']).to.equal(10);
    expect(inputProps['aria-valuemax']).to.equal(100);
    expect(inputProps['aria-disabled']).to.equal(true);

    expect(decrementButtonProps.tabIndex).to.equal(-1);
    expect(decrementButtonProps['aria-controls']).to.equal(INPUT_ID);
    expect(decrementButtonProps['aria-disabled']).to.equal(true);

    expect(incrementButtonProps.tabIndex).to.equal(-1);
    expect(incrementButtonProps['aria-controls']).to.equal(INPUT_ID);
    expect(incrementButtonProps['aria-disabled']).to.equal(true);
  });

  it('should accept defaultValue in uncontrolled mode', () => {
    const props: UseNumberInputParameters = {
      defaultValue: 100,
      disabled: true,
      required: true,
    };

    const { getInputProps } = invokeUseNumberInput(props);
    const inputProps = getInputProps();

    expect(inputProps.value).to.equal(100);
    expect(inputProps.required).to.equal(true);
  });

  describe('prop: onInputChange', () => {
    it('should call onInputChange accordingly when inputting valid characters', async () => {
      const handleInputChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onInputChange: handleInputChange });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('-12');

      expect(handleInputChange.callCount).to.equal(3);
      expect(handleInputChange.args[2][0].target.value).to.equal('-12');
      expect(input.value).to.equal('-12');
    });

    it('should not change the input value when inputting invalid characters', async () => {
      const handleInputChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onInputChange: handleInputChange });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input') as HTMLInputElement;

      await userEvent.click(input);

      await userEvent.keyboard('-5a');

      expect(handleInputChange.callCount).to.equal(3);
      expect(input.value).to.equal('-5');
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when the input is blurred and the value has changed', async () => {
      const handleChange = spy();
      function NumberInput(props: { defaultValue: number }) {
        const { getInputProps } = useNumberInput({ ...props, onChange: handleChange });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput defaultValue={0} />);

      const input = screen.getByTestId('test-input');

      await userEvent.click(input);

      await userEvent.keyboard('34');

      expect(handleChange.callCount).to.equal(0);

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(34);
    });

    it('should not call onChange when the input is blurred if the value did not change', async () => {
      const handleChange = spy();
      function NumberInput(props: { defaultValue: number }) {
        const { getInputProps } = useNumberInput({ ...props, onChange: handleChange });

        return <input data-testid="test-input" {...getInputProps()} />;
      }

      render(<NumberInput defaultValue={10} />);

      const input = screen.getByTestId('test-input') as HTMLInputElement;

      await userEvent.click(input);
      await userEvent.keyboard('1');
      expect(input.value).to.equal('101');

      await userEvent.keyboard('[Backspace]');
      expect(input.value).to.equal('10');

      await userEvent.keyboard('[Tab]');
      expect(handleChange.callCount).to.equal(0);
    });

    it('should call onChange with a value within max', async () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          max: 5,
        });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input');

      await userEvent.click(input);

      await userEvent.keyboard('9');

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.args[0][1]).to.equal(5);
    });

    it('should call onChange with a value within min', async () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          min: 5,
        });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input');

      await userEvent.click(input);

      await userEvent.keyboard('-9');

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.args[0][1]).to.equal(5);
    });

    it('should call onChange with a value based on a custom step', async () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          min: 0,
          step: 5,
        });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input');

      await userEvent.click(input);

      await userEvent.keyboard('4');

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.args[0][1]).to.equal(5);
    });

    it('should call onChange with null when the value is cleared', async () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          defaultValue: 9,
        });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input') as HTMLInputElement;

      await userEvent.click(input);
      await userEvent.keyboard('[Backspace]');

      expect(input.value).to.equal('');

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(null);
    });

    it('should call onChange with null when input value is -', async () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          defaultValue: -5,
        });

        return <input data-testid="test-input" {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByTestId('test-input') as HTMLInputElement;

      await userEvent.click(input);
      await userEvent.keyboard('[Backspace]');

      expect(input.value).to.equal('-');

      await userEvent.keyboard('[Tab]');
      expect(document.activeElement).to.equal(document.body);

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(null);
    });
  });

  describe('warnings', () => {
    it('should warn when switching from uncontrolled to controlled', () => {
      const handleChange = spy();
      function NumberInput({ value }: { value?: number }) {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          value,
          componentName: 'TestNumberInput',
        });

        return <input {...getInputProps()} />;
      }
      const { setProps } = render(<NumberInput />);
      expect(() => {
        setProps({ value: 5 });
      }).to.toErrorDev(
        'useControllableReducer: The TestNumberInput component is changing an uncontrolled prop to be controlled: value',
      );
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const handleChange = spy();
      function NumberInput({ value }: { value?: number }) {
        const { getInputProps } = useNumberInput({
          onChange: handleChange,
          value,
          componentName: 'TestNumberInput',
        });

        return <input {...getInputProps()} />;
      }
      const { setProps } = render(<NumberInput value={5} />);
      expect(() => {
        setProps({ value: undefined });
      }).to.toErrorDev(
        'useControllableReducer: The TestNumberInput component is changing a controlled prop to be uncontrolled: value',
      );
    });
  });
});
