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
} from '@mui/internal-test-utils';
import { useSwitch, UseSwitchParameters } from '@mui/base/useSwitch';

describe('useSwitch', () => {
  const { render } = createRenderer();
  const invokeUseSwitch = (props: UseSwitchParameters) => {
    const ref = React.createRef<ReturnType<typeof useSwitch>>();
    function TestComponent() {
      const switchDefinition = useSwitch(props);
      React.useImperativeHandle(ref, () => switchDefinition, [switchDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  describe('getInputProps', () => {
    it('should include the incoming uncontrolled props in the output', () => {
      const props: UseSwitchParameters = {
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

    it('should call onChange if a change event is fired', () => {
      const handleChange = spy();
      function Switch() {
        const { getInputProps } = useSwitch({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<Switch />);

      act(() => {
        screen.getByRole('switch').click();
      });

      expect(handleChange.callCount).to.equal(1);
    });

    it('should call focus event handlers if focus events are fired', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }

      const handleBlur = spy();
      const handleFocus = spy();
      const handleFocusVisible = spy();
      function Switch() {
        const { getInputProps } = useSwitch({
          onBlur: handleBlur,
          onFocus: handleFocus,
          onFocusVisible: handleFocusVisible,
        });

        return <input {...getInputProps()} />;
      }
      render(<Switch />);
      const switchElement = screen.getByRole('switch');

      simulatePointerDevice();
      act(() => {
        switchElement.focus();
      });

      expect(handleBlur.callCount).to.equal(0);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      act(() => {
        switchElement.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      focusVisible(switchElement);

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(2);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 2 : 1,
      );
    });
  });
});
