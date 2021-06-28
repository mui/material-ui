import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/system';
import { useSwitch, UseSwitchProps } from '@material-ui/unstyled/SwitchUnstyled';

const BasicSwitchRoot = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 20px;
  background: linear-gradient(60deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%);
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`);

const BasicSwitchInput = styled('input')(`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`);

const BasicSwitchThumb = styled('span')(`
  display: block;
  width: 16px;
  height: 16px;
  top: 2px;
  left: 2px;
  border-radius: 16px;
  background-color: rgba(255,255,255,0.7);
  position: relative;
  transition: all 200ms ease;

  &.focusVisible {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.checked {
    left: 12px;
    top: 2px;
    background-color: rgba(255,255,255,0.9);
  }
`);

function BasicSwitch(props: UseSwitchProps) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

export default function UseSwitchesBasic() {
  return (
    <div>
      <BasicSwitch defaultChecked />
      <BasicSwitch />
      <BasicSwitch defaultChecked disabled />
      <BasicSwitch disabled />
    </div>
  );
}
