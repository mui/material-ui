import * as React from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

export default function ServerModal() {
  const rootRef = React.useRef(null);

  return (
    <Box
      sx={{
        height: 240,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
          display: 'none',
        },
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        container={() => rootRef.current}
      >
        <ModalDialog
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          layout="center"
        >
          <Typography id="server-modal-title" level="h2">
            Server-side modal
          </Typography>
          <Typography id="server-modal-description" textColor="text.tertiary">
            If you disable JavaScript, you will still see me.
          </Typography>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
