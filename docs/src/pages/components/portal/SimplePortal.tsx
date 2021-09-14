import * as React from 'react';
import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';

export default function SimplePortal() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {show ? 'Unmount children' : 'Mount children'}
      </button>
      <Box sx={{ p: 1, my: 1, border: '1px solid' }}>
        It looks like I will render here.
        {show ? (
          <Portal container={container.current}>
            <span>But I actually render here!</span>
          </Portal>
        ) : null}
      </Box>
      <Box sx={{ p: 1, my: 1, border: '1px solid' }} ref={container} />
    </div>
  );
}
