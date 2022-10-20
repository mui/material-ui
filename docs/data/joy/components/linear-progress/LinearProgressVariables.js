import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';

export default function LinearProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="LinearProgress"
      data={[
        {
          var: '--LinearProgress-thickness',
          defaultValue: '6px',
        },
        {
          var: '--LinearProgress-radius',
          helperText: "Default to root's thickness",
        },
        {
          var: '--LinearProgress-progress-thickness',
          helperText: "Default to root's thickness",
        },
        {
          var: '--LinearProgress-progress-radius',
          helperText: "Default to root's thickness",
        },
      ]}
      renderDemo={(sx) => (
        <Box sx={{ width: 300 }}>
          <LinearProgress sx={sx} />
        </Box>
      )}
    />
  );
}
