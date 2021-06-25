import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/system';
import { useSwitch, UseSwitchProps } from '@material-ui/unstyled/SwitchUnstyled';

const BasicSwitchRoot = styled('span')(`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #555;
  margin: 10px;
  border-radius: 3px;

  &.disabled {
    opacity: 0.6;
  }
`);

const BasicSwitchInput = styled('input')(`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`);

const BasicSwitchThumb = styled('span')(`
  display: block;
  width: 16px;
  height: 16px;
  background-color: #555;
  margin: 1px;
  border-radius: 2px;

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(20px);
  }
`);

function BasicSwitch(props: UseSwitchProps) {
  const { getInputProps, checked, disabled, focusVisible, pressed } =
    useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
    pressed,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput
        type="checkbox"
        {...getInputProps()}
        aria-label="Demo switch"
      />
    </BasicSwitchRoot>
  );
}

export default function UseSwitchesBasic() {
  return (
    <div>
      <BasicSwitch defaultChecked />
      <BasicSwitch disabled />
    </div>
  );
}
