import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Shared density demo matrix for the CSS-var density adapter (Button only).
// Consumed by the screenshot fixture (density-fixture). `level=default` (no token
// overrides) must stay pixel-identical to the pre-change baseline.
const demos: Record<string, React.ReactNode> = {
  Button: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
          <Button variant="contained" size={size}>
            Contained
          </Button>
          <Button variant="outlined" size={size}>
            Outlined
          </Button>
          <Button variant="text" size={size}>
            Text
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
};

export default demos;
