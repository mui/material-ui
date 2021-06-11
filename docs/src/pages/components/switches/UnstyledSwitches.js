import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import SwitchUnstyled, {
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';

const Root = styled('span')({
  fontSize: 0,
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '60px',
  background:
    'linear-gradient(60deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%)',
  borderRadius: '20px',
  margin: '10px',
  cursor: 'pointer',
  [`&.${switchUnstyledClasses.disabled}`]: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  [`& .${switchUnstyledClasses.thumb}`]: {
    display: 'block',
    width: '24px',
    height: '24px',
    top: '8px',
    left: '8px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'relative',
    transition: 'all 200ms ease',
  },
  [`& .${switchUnstyledClasses.button}`]: {
    display: 'block',
    height: '100%',
    borderRadius: '20px',
  },
  [`&.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb}`]: {
    backgroundColor: 'rgba(255,255,255,1)',
    boxShadow: '0 0 1px 8px rgba(0,0,0,0.25)',
  },
  [`&.${switchUnstyledClasses.checked} .${switchUnstyledClasses.thumb}`]: {
    left: '4px',
    top: '24px',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  [`& .${switchUnstyledClasses.input}`]: {
    cursor: 'inherit',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1,
    margin: 0,
  },
});

export default function UnstyledSwitches() {
  const [checked, setChecked] = React.useState(false);

  const withDemoLabel = { 'aria-label': 'Demo switch' };

  return (
    <div>
      <SwitchUnstyled
        checked={checked}
        onChange={() => setChecked((c) => !c)}
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
