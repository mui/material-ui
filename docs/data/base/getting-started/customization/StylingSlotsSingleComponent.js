import * as React from 'react';
import { styled } from '@mui/system';
import { Switch as BaseSwitch, switchClasses } from '@mui/base/Switch';

const Switch = styled(BaseSwitch)`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  background: #b3c3d3;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  & .${switchClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchClasses.checked} {
    background: #007fff;

    & .${switchClasses.thumb} {
      left: 14px;
      top: 3px;
      background-color: #fff;
    }
  }

  &.${switchClasses.focusVisible} .${switchClasses.thumb} {
    background-color: rgb(255 255 255 / 1);
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }
`;

export default function StylingSlotsSingleComponent() {
  return <Switch />;
}
