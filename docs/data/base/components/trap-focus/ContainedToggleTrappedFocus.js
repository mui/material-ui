import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/base/TrapFocus';

export default function BasicTrapFocus() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TrapFocus open={open} disableRestoreFocus disableAutoFocus>
        <Stack>
          <Stack alignItems="center">
            <button type="button" onClick={() => setOpen(!open)}>
              {open ? 'Close' : 'Open'}
            </button>
          </Stack>
          {open && (
            <label>
              First name: <input type="text" />
            </label>
          )}
        </Stack>
      </TrapFocus>
    </Box>
  );
}
