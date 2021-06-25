import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';

export interface SwitchState {
  checked: Readonly<boolean>;
  disabled: Readonly<boolean>;
  readOnly: Readonly<boolean>;
  focusVisible: Readonly<boolean>;
  pressed: Readonly<boolean>;
}

export interface UseSwitchResult extends SwitchState {
  getInputProps: (otherProps?: object) => SwitchInputProps;
}

export interface SwitchInputProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  ref: React.Ref<any>;
}

export interface UseSwitchProps {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the component is read only.
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onMouseDown?: React.MouseEventHandler;
}

/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 */
export default function useSwitch(props: UseSwitchProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    onChange,
    onFocus,
    onFocusVisible,
    onBlur,
    onMouseDown,
  } = props;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked',
  });

  const [pressed, setPressed] = React.useState(false);

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

  const handleMouseDown = (event: React.MouseEvent) => {
    setPressed(true);

    document.addEventListener('mouseup', () => setPressed(false), { once: true });

    onMouseDown?.(event);
  };

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  return {
    getInputProps: (otherProps: object = {}) => ({
      checked: checkedProp,
      defaultChecked,
      disabled,
      readOnly,
      required,
      type: 'checkbox',
      ...otherProps,
      onChange: handleInputChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseDown: handleMouseDown,
      ref: handleRefChange,
    }),
    checked,
    disabled: Boolean(disabled),
    readOnly: Boolean(readOnly),
    focusVisible,
    pressed,
  } as UseSwitchResult;
}
