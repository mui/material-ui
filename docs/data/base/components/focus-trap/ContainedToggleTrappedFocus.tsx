import * as React from 'react';
import Stack from '@mui/system/Stack';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function ContainedToggleTrappedFocus() {
  const [open, setOpen] = React.useState(false);

  return (
    <FocusTrap open={open} disableRestoreFocus disableAutoFocus>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <button type="button" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'}
        </button>
        {open && (
          <label>
            First name: <input type="text" />
          </label>
        )}
      </Stack>
    </FocusTrap>
  );
}
