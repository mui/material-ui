import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';

export default function OverlayCheckbox() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        '& > div': { p: 2, boxShadow: 'sm', borderRadius: 'xs', display: 'flex' },
      }}
    >
      <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
        <Checkbox overlay label="Focus on me" />
      </Sheet>
      <Sheet variant="outlined" sx={{ bgcolor: 'background.body' }}>
        <Checkbox
          label="My parent receives focus"
          overlay
          // Force the outline to appear in the demo. Usually, you don't need this in your project.
          slotProps={{ action: { className: checkboxClasses.focusVisible } }}
        />
      </Sheet>
    </Box>
  );
}
