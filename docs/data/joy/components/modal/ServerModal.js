import * as React from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalDialogTitle from '@mui/joy/ModalDialogTitle';
import ModalDialogDescription from '@mui/joy/ModalDialogDescription';

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
        <ModalDialog layout="center">
          <ModalDialogTitle>Server-side modal</ModalDialogTitle>
          <ModalDialogDescription>
            If you disable JavaScript, you will still see me.
          </ModalDialogDescription>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
