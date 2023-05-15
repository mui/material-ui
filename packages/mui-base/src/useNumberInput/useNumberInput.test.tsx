import { expect } from 'chai';
import { spy } from 'sinon';
import * as React from 'react';
import { createRenderer, screen, act, fireEvent } from 'test/utils';
import useNumberInput, { UseNumberInputParameters } from './index';

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

  describe('getInputProps', () => {
    it('should return correct ARIA attributes', () => {
      const props: UseNumberInputParameters = {
        value: 50,
        min: 10,
        max: 100,
        disabled: true,
      };

      const { getInputProps } = invokeUseNumberInput(props);
      const inputProps = getInputProps();

      expect(inputProps.role).to.equal('spinbutton');
      expect(inputProps['aria-valuenow']).to.equal(50);
      expect(inputProps['aria-valuemin']).to.equal(10);
      expect(inputProps['aria-valuemax']).to.equal(100);
      expect(inputProps['aria-disabled']).to.equal(true);
      expect(inputProps.tabIndex).to.equal(0);
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

    it('should call onChange if a change event is fired', () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 2 } });
      });

      expect(handleChange.callCount).to.equal(1);
    });

    it('should call onValueChange when the input is blurred', () => {
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onValueChange: handleValueChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 3 } });
        input.blur();
      });

      expect(handleValueChange.callCount).to.equal(1);
    });

    it('should not call onValueChange when the input has focus', () => {
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onValueChange: handleValueChange });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 4 } });
      });

      expect(handleValueChange.callCount).to.equal(0);
    });

    it('should call onValueChange with a value within max', () => {
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          max: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 9 } });
        input.blur();
      });

      expect(handleValueChange.args[0][1]).to.equal(5);
    });

    it('should call onValueChange with a value within min', () => {
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          min: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: -9 } });
        input.blur();
      });

      expect(handleValueChange.args[0][1]).to.equal(5);
    });

    it('should call onValueChange with a value based on a custom step', () => {
      const handleValueChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({
          onValueChange: handleValueChange,
          min: 0,
          step: 5,
        });

        return <input {...getInputProps()} />;
      }
      render(<NumberInput />);

      const input = screen.getByRole('spinbutton');

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 4 } });
        input.blur();
      });

      expect(handleValueChange.args[0][1]).to.equal(5);
    });
  });
});
