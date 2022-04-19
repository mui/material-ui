import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <PopperUnstyled id={id} open={open} anchorEl={anchorEl}>
        <div
          style={{
            padding: '0.5rem',
            border: '1px solid',
            backgroundColor: '#fff',
            margin: '0.25rem 0px',
          }}
        >
          The content of the Popper.
        </div>
      </PopperUnstyled>
    </div>
  );
}
