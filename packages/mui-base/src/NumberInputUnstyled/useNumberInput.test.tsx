import { expect } from 'chai';
import { spy } from 'sinon';
import * as React from 'react';
import { createRenderer, screen, act, fireEvent } from 'test/utils';
import { useNumberInput, UseNumberInputParameters } from './index';

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
    it('should include the incoming uncontrolled props in the output', () => {
      const props: UseNumberInputParameters = {
        defaultValue: 100,
        disabled: true,
        required: true,
      };

      const { getInputProps } = invokeUseNumberInput(props);
      const inputProps = getInputProps();

      expect(inputProps.defaultValue).to.equal(100);
      expect(inputProps.required).to.equal(true);
    });

    it('should call onChange if a change event is fired', () => {
      const handleChange = spy();
      function NumberInput() {
        const { getInputProps } = useNumberInput({ onChange: handleChange });

        // TODO: how to make <input> accept my custom onChange ?!
        // @ts-ignore
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
  });
});
