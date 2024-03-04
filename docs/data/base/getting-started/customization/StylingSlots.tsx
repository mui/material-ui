import * as React from 'react';
import { styled } from '@mui/system';
import { Switch, switchClasses } from '@mui/base/Switch';

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

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchClasses.checked} {
    background: #007fff;
  }
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

  .${switchClasses.focusVisible} & {
    background-color: rgb(255 255 255 / 1);
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }

  .${switchClasses.checked} > & {
    left: 14px;
    top: 3px;
    background-color: #fff;
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

export default function StylingSlots() {
  return (
    <Switch slots={{ root: SwitchRoot, thumb: SwitchThumb, input: SwitchInput }} />
  );
}
