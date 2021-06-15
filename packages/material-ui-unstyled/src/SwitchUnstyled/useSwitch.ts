import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';

export interface UseSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onBlurVisible?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

export default function useSwitch(props: UseSwitchProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onChange,
    onFocus,
    onFocusVisible,
    onBlur,
  } = props;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchUnstyled',
    state: 'checked',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange?.(event);
  };

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
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

  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLInputElement>) => {
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
  });

  const handleBlur = (event: React.FocusEvent) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    onBlur?.(event);
  };

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  return {
    getInputProps: (otherProps: Record<string, unknown> = {}) => ({
      checked: checkedProp,
      defaultChecked,
      disabled,
      ...otherProps,
      onChange: handleInputChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ref: handleRefChange,
    }),
    getRootProps: (otherProps: Record<string, unknown> = {}) => ({
      ...otherProps,
    }),
    isChecked: checked,
    isDisabled: disabled,
    hasVisibleFocus: focusVisible,
  };
}
