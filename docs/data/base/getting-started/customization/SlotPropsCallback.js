import * as React from 'react';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';

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

  .my-switch .thumb {
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

  .my-switch.on .thumb {
    left: 14px;
    top: 3px;
    background-color: #FFF;
  }

  .my-switch .input {
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
      className: `my-switch ${ownerState.checked ? 'on' : 'off'}`,
    }),
    thumb: { className: 'thumb' },
    input: { className: 'input' },
  };

  return (
    <div>
      <style type="text/css">{css}</style>

      <SwitchUnstyled slotProps={slotProps} />
    </div>
  );
}
