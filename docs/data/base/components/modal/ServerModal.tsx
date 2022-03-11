import * as React from 'react';
import Modal from '@mui/base/ModalUnstyled';
import { styled } from '@mui/system';
import Box from '@mui/system/Box';

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ServerModal() {
  const rootRef = React.useRef<HTMLDivElement>(null);

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
      <StyledModal
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
            position: 'relative',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            p: 4,
          }}
        >
          <h2 id="server-modal-title">Server-side modal</h2>
          <span id="server-modal-description" style={{ marginTop: '16px' }}>
            If you disable JavaScript, you will still see me.
          </span>
        </Box>
      </StyledModal>
    </Box>
  );
}
