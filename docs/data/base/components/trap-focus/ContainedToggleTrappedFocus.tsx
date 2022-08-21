import * as React from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/base/TrapFocus';

export default function ContainedToggleTrappedFocus() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TrapFocus open={open} disableRestoreFocus disableAutoFocus>
        <Stack alignItems="center" spacing={2}>
          <button type="button" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Open'}
          </button>
          {open && (
            <label>
              First name: <input type="text" />
            </label>
          )}
        </Stack>
      </TrapFocus>
    </React.Fragment>
  );
}
