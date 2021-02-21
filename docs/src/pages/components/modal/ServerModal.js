import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';

export default function ServerModal() {
  const rootRef = React.useRef(null);

  return (
    <Box
      sx={{
        height: 300,
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
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <h2 id="server-modal-title">Server-side modal</h2>
          <p id="server-modal-description">
            If you disable JavaScript, you will still see me.
          </p>
        </Box>
      </Modal>
    </Box>
  );
}
