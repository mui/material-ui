import * as React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function CircularProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="CircularProgress"
      data={[
        {
          var: '--CircularProgress-size',
          defaultValue: '40px',
          helperText: 'Supports only `px` unit',
        },
        {
          var: '--CircularProgress-trackThickness',
          defaultValue: '6px',
        },
        {
          var: '--CircularProgress-progressThickness',
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => <CircularProgress sx={sx} />}
    />
  );
}
