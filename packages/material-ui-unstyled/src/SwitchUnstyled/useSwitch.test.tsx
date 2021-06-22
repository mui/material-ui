import { expect } from 'chai';
import React from 'react';
import { spy } from 'sinon';
import { act, createClientRender } from 'test/utils';
import useSwitch, { UseSwitchProps, UseSwitchResult } from './useSwitch';

const TestComponent = React.forwardRef(
  ({ useSwitchProps }: { useSwitchProps?: UseSwitchProps }, ref) => {
    const switchDefinition = useSwitch(useSwitchProps ?? {});
    React.useImperativeHandle(ref, () => switchDefinition, [switchDefinition]);
    return null;
  },
);

describe('useSwitch', () => {
  const render = createClientRender();
  const invokeUseSwitch = (props: UseSwitchProps) => {
    const ref = React.createRef();
    render(<TestComponent useSwitchProps={props} ref={ref} />);
    return ref.current as UseSwitchResult;
  };

  describe('getInputProps', () => {
    it('should include the incoming uncontrolled props in the output', () => {
      const props: UseSwitchProps = {
        defaultChecked: true,
        disabled: true,
        readOnly: true,
        required: true,
      };

      const { getInputProps } = invokeUseSwitch(props);
      const inputProps = getInputProps();

      expect(inputProps.defaultChecked).to.equal(true);
      expect(inputProps.disabled).to.equal(true);
      expect(inputProps.readOnly).to.equal(true);
      expect(inputProps.required).to.equal(true);
    });

    it('should include the incoming controlled prop in the output', () => {
      const props = {
        checked: true,
      };

      const { getInputProps } = invokeUseSwitch(props);
      const inputProps = getInputProps();

      expect(inputProps!.checked).to.equal(true);
    });

    it('should call the provided event handlers when respective events are fired', () => {
      const props = {
        onChange: spy(),
        onFocus: spy(),
        onFocusVisible: spy(),
        onBlur: spy(),
      };

      const dummyChangeEvent = {
        nativeEvent: {
          defaultPrevented: false,
        },
        target: {
          checked: true,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const dummyFocusEvent = {} as React.FocusEvent;
      const dummyBlurEvent = {} as React.FocusEvent;

      act(() => {
        const { getInputProps } = invokeUseSwitch(props);
        const inputProps = getInputProps();
        inputProps.onChange(dummyChangeEvent);
        inputProps.onFocus(dummyFocusEvent);
        inputProps.onBlur(dummyBlurEvent);
      });

      expect(props.onChange.calledWith(dummyChangeEvent)).to.equal(true);
      expect(props.onFocus.calledWith(dummyFocusEvent)).to.equal(true);
      expect(props.onFocusVisible.calledWith(dummyFocusEvent)).to.equal(true);
      expect(props.onBlur.calledWith(dummyBlurEvent)).to.equal(true);
    });
  });
});
