import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

export default function DifferentChildren() {
  const falsyCondition = 1 === 2;

  return (
    <Stack spacing={2}>
      {/* With tooltip */}
      <ToggleButtonGroup value="one">
        <Tooltip title="tooltip">
          <ToggleButton value="one">One</ToggleButton>
        </Tooltip>
        <Tooltip title="tooltip">
          <span>
            <ToggleButton value="two" disabled>
              Two
            </ToggleButton>
          </span>
        </Tooltip>
        <Tooltip title="tooltip">
          <span>
            <ToggleButton value="three" disabled>
              Three
            </ToggleButton>
          </span>
        </Tooltip>
      </ToggleButtonGroup>

      {/* Single button */}
      <ToggleButtonGroup value="one">
        <ToggleButton value="one">One</ToggleButton>
      </ToggleButtonGroup>

      {/* Conditional elements */}
      <ToggleButtonGroup value="one">
        <ToggleButton value="one">One</ToggleButton>
        <ToggleButton value="two">Two</ToggleButton>
        {falsyCondition ? <ToggleButton value="three">Three</ToggleButton> : undefined}
      </ToggleButtonGroup>
    </Stack>
  );
}
