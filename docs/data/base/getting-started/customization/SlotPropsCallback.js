import * as React from 'react';
import { Switch } from '@mui/base/Switch';

const css = `
  .my-switch {
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 32px;
    height: 20px;
    background: #B3C3D3;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
  }

  .my-switch.on {
    background: #007FFF;
  }

  .my-switch.focused .base-Switch-thumb {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  .my-switch .base-Switch-thumb {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition: all 200ms ease;
  }

  .my-switch.on .base-Switch-thumb {
    left: 14px;
    top: 3px;
    background-color: #FFF;
  }

  .my-switch .base-Switch-input {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`;

export default function SlotPropsCallback() {
  const slotProps = {
    root: (ownerState) => ({
      className: `my-switch ${ownerState.checked ? 'on' : 'off'} ${
        ownerState.focusVisible ? 'focused' : ''
      }`,
    }),
  };

  return (
    <div>
      <style type="text/css">{css}</style>
      <Switch slotProps={slotProps} />
    </div>
  );
}
