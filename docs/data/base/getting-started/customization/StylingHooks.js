import * as React from 'react';
import clsx from 'clsx';
import { useSwitch } from '@mui/base/useSwitch';
import { styled } from '@mui/system';

const SwitchRoot = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  background: #b3c3d3;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: #007fff;
  }
`;

const SwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const SwitchThumb = styled('span')`
  display: block;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-focusVisible {
    background-color: rgb(255 255 255 / 1);
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }

  &.Switch-checked {
    left: 14px;
    top: 3px;
    background-color: #fff;
  }
`;

function Switch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchThumb className={clsx(stateClasses)} />
      <SwitchInput {...getInputProps()} aria-label={props['aria-label']} />
    </SwitchRoot>
  );
}

export default function StylingHooks() {
  return <Switch aria-label="Demo switch" />;
}
