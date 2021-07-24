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
}

export interface UseSwitchResult extends SwitchState {
  /**
   * Returns props for an HTML `input` element that is a part of a Switch.
   */
  getInputProps: (otherProps?: React.HTMLAttributes<HTMLInputElement>) => SwitchInputProps;
}

/**
 * Props used by an HTML `input` element that is a part of a Switch.
 */
export interface SwitchInputProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  readOnly?: boolean;
  ref: React.Ref<any>;
  required?: boolean;
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
  onBlur?: React.FocusEventHandler;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  /**
   * If `true`, the component is read only.
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
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

  const handleInputChange = useEventCallback(
    (event: React.ChangeEvent<HTMLInputElement>, otherHandler?: React.FormEventHandler) => {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }

      setCheckedState(event.target.checked);
      onChange?.(event);
      otherHandler?.(event);
    },
  );

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

  const handleFocus = useEventCallback(
    (event: React.FocusEvent, otherHandler?: React.FocusEventHandler) => {
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
      otherHandler?.(event);
    },
  );

  const handleBlur = useEventCallback(
    (event: React.FocusEvent, otherHandler?: React.FocusEventHandler) => {
      handleBlurVisible(event);

      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }

      onBlur?.(event);
      otherHandler?.(event);
    },
  );

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  const getInputProps = (otherProps: React.HTMLAttributes<HTMLInputElement> = {}) => ({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    type: 'checkbox',
    ...otherProps,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange(event, otherProps.onChange),
    onFocus: (event: React.FocusEvent) => handleFocus(event, otherProps.onFocus),
    onBlur: (event: React.FocusEvent) => handleBlur(event, otherProps.onBlur),
    ref: handleRefChange,
  });

  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly),
  } as UseSwitchResult;
}
