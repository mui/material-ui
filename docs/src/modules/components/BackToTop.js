import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';

export default function BackToTop(props) {
  const { window: windowProp, onClick, sx, ...other } = props;

  const trigger = useScrollTrigger({
    target: windowProp ? windowProp() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick?.(event);
  };

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        {...other}
        onClick={handleClick}
        sx={[{ position: 'fixed', bottom: 16, right: 16, zIndex: 10 }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Fab color="primary" size="small" aria-label="Scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
