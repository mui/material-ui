import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  focusVisible,
  programmaticFocusTriggersFocusVisible,
  screen,
  simulatePointerDevice,
} from '@mui-internal/test-utils';
import { useCheckbox, UseCheckboxParameters } from '@mui/base/useCheckbox';

describe('useCheckbox', () => {
  const { render } = createRenderer();
  const invokeUseCheckbox = (props: UseCheckboxParameters) => {
    const ref = React.createRef<ReturnType<typeof useCheckbox>>();
    function TestComponent() {
      const checkboxDefinition = useCheckbox(props);
      React.useImperativeHandle(ref, () => checkboxDefinition, [checkboxDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  describe('getInputProps', () => {
    it('should include the incoming uncontrolled props in the output', () => {
      const props: UseCheckboxParameters = {
        defaultChecked: true,
        disabled: true,
        readOnly: true,
        required: true,
      };

      const { getInputProps } = invokeUseCheckbox(props);
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

      const { getInputProps } = invokeUseCheckbox(props);
      const inputProps = getInputProps();

      expect(inputProps!.checked).to.equal(true);
    });

    it('should call onChange if a change event is fired', () => {
      const handleChange = spy();
      function Checkbox() {
        const { getInputProps } = useCheckbox({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<Checkbox />);

      act(() => {
        screen.getByRole('checkbox').click();
      });

      expect(handleChange.callCount).to.equal(1);
    });

    it('should call focus event handlers if focus events are fired', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const handleFocusVisible = spy();
      function Checkbox() {
        const { getInputProps } = useCheckbox({
          onBlur: handleBlur,
          onFocus: handleFocus,
          onFocusVisible: handleFocusVisible,
        });

        return <input {...getInputProps()} />;
      }
      render(<Checkbox />);
      const checkboxElement = screen.getByRole('checkbox');

      simulatePointerDevice();
      act(() => {
        checkboxElement.focus();
      });

      expect(handleBlur.callCount).to.equal(0);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      act(() => {
        checkboxElement.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      focusVisible(checkboxElement);

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(2);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 2 : 1,
      );
    });
  });
});
