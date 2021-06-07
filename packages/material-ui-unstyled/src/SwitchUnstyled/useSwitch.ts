import { useControlled } from '@material-ui/core/utils';
import React, { ChangeEvent, ChangeEventHandler } from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<{ checked: boolean }>;
  onKeyDown?: React.KeyboardEventHandler;
}

export default function useSwitch({
  checked: checkedProp,
  defaultChecked,
  onChange,
  ...props
}: SwitchProps) {
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchUnstyled',
    state: 'checked',
  });

  const handleInputChange = (event: ChangeEvent<{ checked: boolean }>) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange?.(event);
  };

  return {
    getRootProps: () => ({}),
    getInputProps: () => ({
      ...props,
      onChange: handleInputChange,
    }),
    isChecked: checked,
  };
}
