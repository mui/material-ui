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

  [`&.${switchUnstyledClasses.checked} .${switchUnstyledClasses.thumb}`]: {
    left: '4px',
    top: '24px',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

export default function UnstyledSwitches() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <SwitchUnstyled
        value={checked}
        onChange={() => setChecked((c) => !c)}
        components={{ Root }}
      />
      <SwitchUnstyled components={{ Root }} />
      <SwitchUnstyled components={{ Root }} disabled />
    </div>
  );
}
