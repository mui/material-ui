import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import SwitchUnstyled, {
  switchUnstyledClasses,
} from '@material-ui/unstyled/SwitchUnstyled';

const Root = styled('span')({
  display: 'inline-block',
  width: '60px',
  height: '40px',
  background:
    'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%)',
  borderRadius: '20px',
  margin: '10px',
  cursor: 'pointer',

  [`&.${switchUnstyledClasses.disabled}`]: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

const Thumb = styled('span')({
  display: 'block',
  width: '24px',
  height: '24px',
  top: '8px',
  left: '8px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.7)',
  position: 'relative',
  transition: 'all 200ms ease',
});

const Input = styled('input')({
  opacity: 0,
});

export default function UnstyledSwitches() {
  const hiddenInputProps = {
    input: {
      style: { opacity: 0 },
    },
  };

  return (
    <div>
      <SwitchUnstyled components={{ Root, Thumb, Input }} />
      <SwitchUnstyled components={{ Root, Thumb, Input }} disabled />
    </div>
  );
}
