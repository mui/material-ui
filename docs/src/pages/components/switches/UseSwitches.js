import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { useSwitch } from '@material-ui/unstyled/SwitchUnstyled';

const FancySwitchElement = styled('span')({
  display: 'inline-block',
  width: '60px',
  height: '40px',
  background:
    'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(87,146,227,1) 100%)',
  borderRadius: '20px',
  margin: '10px',
  cursor: 'pointer',

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

    '&.checked': {
      left: '24px',
      top: '4px',
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(255,255,255,0.9)',
    },
  },

  '&:hover .thumb': {
    transform: 'scale(1.2)',
  },
});

function FancySwitch(props) {
  const { getRootProps, isChecked } = useSwitch(props);

  return (
    <FancySwitchElement {...getRootProps()}>
      <span className={clsx('thumb', { checked: isChecked })} />
    </FancySwitchElement>
  );
}

export default function UseSwitch() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <FancySwitch checked={checked} onChange={() => setChecked((c) => !c)} />
    </div>
  );
}
