import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onKeyDown?: React.KeyboardEventHandler;
}

export default function useSwitch({ checked, disabled, onChange, onKeyDown }: SwitchProps) {
  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (!disabled && e.key === ' ') {
      e.preventDefault();
      onChange?.(!checked);
    }

    onKeyDown?.(e);
  };

  return {
    getRootProps: () => ({
      tabIndex: 0,
      role: 'checkbox',
      onClick: () => !disabled && onChange?.(!checked),
      onKeyDown: handleKeyDown,
    }),
    isChecked: checked,
  };
}
