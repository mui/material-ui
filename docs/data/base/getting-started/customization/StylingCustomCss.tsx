import * as React from 'react';
import { Switch as SwitchUnstyled, switchClasses } from '@mui/base/Switch';

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

  .my-switch.${switchClasses.checked} {
    background: #007FFF;
  }

  .my-switch .${switchClasses.thumb} {
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

  .my-switch.${switchClasses.checked} .${switchClasses.thumb} {
    left: 14px;
    top: 3px;
    background-color: #FFF;
  }

  .my-switch .${switchClasses.input} {
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

export default function StylingCustomCss() {
  return (
    <div>
      <style type="text/css">{css}</style>
      <SwitchUnstyled className="my-switch" />
    </div>
  );
}
