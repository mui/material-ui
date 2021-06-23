import * as React from 'react';
import { styled } from '@material-ui/system';
import SwitchUnstyled, {
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';

const Root = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 60px;
  background: linear-gradient(60deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%);
  border-radius: 20px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 24px;
    height: 24px;
    top: 8px;
    left: 8px;
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
    left: 4px;
    top: 24px;
    width: 32px;
    height: 32px;
    background-color: rgba(255,255,255,0.9);
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
