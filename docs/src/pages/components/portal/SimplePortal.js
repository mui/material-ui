import React from 'react';
import Portal from '@material-ui/core/Portal';
import Box from '@material-ui/core/Box';

export default function SimplePortal() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button onClick={handleClick}>{show ? 'Unmount children' : 'Mount children'}</button>
      <Box p={1} m={1} border={1}>
        It looks like I will render here.
        {show ? (
          <Portal container={container.current}>
            <span>But I actually render here!</span>
          </Portal>
        ) : null}
      </Box>
      <Box p={1} m={1} border={1} ref={container} />
    </div>
  );
}
