import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import { UseSwitchInputSlotProps, UseSwitchParameters } from './useSwitch.types';

/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switches](https://mui.com/components/switches/)
 */
export default function useSwitch(props: UseSwitchParameters) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required,
  } = props;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked',
  });

  const createHandleInputChange =
    (otherProps: React.InputHTMLAttributes<HTMLInputElement>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }

      setCheckedState(event.target.checked);
      onChange?.(event);
      otherProps.onChange?.(event);
    };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const inputRef = React.useRef<any>(null);

  const createHandleFocus =
    (otherProps: React.InputHTMLAttributes<HTMLInputElement>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!inputRef.current) {
        inputRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        onFocusVisible?.(event);
      }

      onFocus?.(event);
      otherProps.onFocus?.(event);
    };

  const createHandleBlur =
    (otherProps: React.InputHTMLAttributes<HTMLInputElement>) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleBlurVisible(event);

      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }

      onBlur?.(event);
      otherProps.onBlur?.(event);
    };

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  const getInputProps = (
    otherProps: React.HTMLAttributes<HTMLInputElement> = {},
  ): UseSwitchInputSlotProps => ({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleRefChange,
    required,
    type: 'checkbox',
    ...otherProps,
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps),
  });

  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly),
  };
}
