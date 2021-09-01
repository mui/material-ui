import * as React from 'react';
import Box from '@mui/material/Box';
import TrapFocus from '@mui/material/Unstable_TrapFocus';

export default function DisableEnforceFocus() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      {open && (
        <TrapFocus disableEnforceFocus open>
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
            <label>
              First name: <input type="text" />
            </label>
            <br />
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </Box>
        </TrapFocus>
      )}
    </Box>
  );
}
