import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { useSwitch } from '@material-ui/unstyled/SwitchUnstyled';

const FancySwitchElement = styled('span')({
  display: 'inline-block',
  width: '40px',
  height: '60px',
  background:
    'linear-gradient(60deg, rgba(104,34,195,1) 0%, rgba(87,146,227,1) 100%)',
  borderRadius: '20px',
  margin: '10px',
  position: 'relative',
  cursor: 'pointer',
  fontSize: 0,

  '& .thumb': {
    display: 'block',
    width: '24px',
    height: '24px',
    top: '8px',
    left: '8px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'relative',
    transition: 'all 200ms ease',
    boxShadow: '0 0 15px rgba(0,0,0,0.25)',
  },

  '&.checked .thumb': {
    left: '4px',
    top: '24px',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  '&:not(.disabled):hover .thumb': {
    transform: 'scale(1.2)',
  },

  '& input': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1,
    margin: 0,
    cursor: 'inherit',
  },

  '&.disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

function FancySwitch(props) {
  const { getRootProps, getInputProps, isChecked } = useSwitch(props);

  return (
    <FancySwitchElement
      {...getRootProps()}
      className={clsx({ disabled: props.disabled, checked: isChecked })}
    >
      <span className="thumb" />
      <input type="checkbox" {...getInputProps()} />
    </FancySwitchElement>
  );
}

export default function UseSwitch() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <FancySwitch checked={checked} onChange={() => setChecked((c) => !c)} />
      <FancySwitch defaultChecked />
      <FancySwitch disabled />
    </div>
  );
}
