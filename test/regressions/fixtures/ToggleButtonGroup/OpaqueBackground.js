import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Buttons overlap borders by a negative margin, so an opaque background set by the
// user must not hide the borders of the selected button.
const sx = {
  backgroundColor: '#fff',
  '&.Mui-selected': {
    backgroundColor: '#fff',
    borderColor: '#1976d2',
  },
};

export default function OpaqueBackground() {
  return (
    <Stack spacing={2} sx={{ padding: 2, alignItems: 'flex-start' }}>
      <ToggleButtonGroup value="center" exclusive>
        <ToggleButton value="left" sx={sx}>
          Left
        </ToggleButton>
        <ToggleButton value="center" sx={sx}>
          Center
        </ToggleButton>
        <ToggleButton value="right" sx={sx}>
          Right
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup value="center" exclusive orientation="vertical">
        <ToggleButton value="left" sx={sx}>
          Left
        </ToggleButton>
        <ToggleButton value="center" sx={sx}>
          Center
        </ToggleButton>
        <ToggleButton value="right" sx={sx}>
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
