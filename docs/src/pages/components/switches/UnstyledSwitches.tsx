import * as React from 'react';
import { styled } from '@material-ui/system';
import SwitchUnstyled, {
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';

const Root = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 20px;
  background: linear-gradient(60deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%);
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 16px;
    height: 16px;
    top: 2px;
    left: 2px;
    border-radius: 16px;
    background-color: rgba(255,255,255,0.7);
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} .${switchUnstyledClasses.thumb} {
    left: 12px;
    top: 2px;
    background-color: rgba(255,255,255,0.9);
  }

  &.${switchUnstyledClasses.pressed} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    transform: scale(0.7);
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);

export default function UnstyledSwitches() {
  const [checked, setChecked] = React.useState(false);

  const withDemoLabel = { 'aria-label': 'Demo switch' };

  return (
    <div>
      <SwitchUnstyled
        checked={checked}
        onChange={() => setChecked((prevChecked) => !prevChecked)}
        components={{ Root }}
        componentsProps={{ input: withDemoLabel, root: { as: 'div' } }}
      />
      <SwitchUnstyled
        components={{ Root }}
        componentsProps={{ input: withDemoLabel }}
        defaultChecked
      />
      <SwitchUnstyled
        components={{ Root }}
        componentsProps={{ input: withDemoLabel }}
        disabled
      />
    </div>
  );
}
