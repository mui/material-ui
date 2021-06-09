import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { unstable_useControlled as useControlled } from '@material-ui/utils';

export interface UseSwitchProps extends React.HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function useSwitch(props: UseSwitchProps) {
  const { checked: checkedProp, defaultChecked, disabled, onChange } = props;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchUnstyled',
    state: 'checked',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange?.(event);
  };

  return {
    getInputProps: (otherProps: Record<string, unknown> = {}) => ({
      defaultChecked,
      disabled,
      ...otherProps,
      onChange: handleInputChange,
    }),
    isChecked: checked,
    isDisabled: disabled,
  };
}
