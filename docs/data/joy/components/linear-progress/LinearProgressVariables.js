import * as React from 'react';
import LinearProgress, { linearProgressCssVars } from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function LinearProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="LinearProgress"
      data={[
        {
          var: [linearProgressCssVars.thickness],
          defaultValue: '6px',
        },
        {
          var: [linearProgressCssVars.radius],
          helperText: "Default to root's thickness",
        },
        {
          var: [linearProgressCssVars.progressThickness],
          helperText: "Default to root's thickness",
        },
        {
          var: [linearProgressCssVars.progressRadius],
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
