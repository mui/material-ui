import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="CircularProgress"
      data={[
        {
          var: '--CircularProgress-size',
          defaultValue: '40px',
        },
        {
          var: '--CircularProgress-track-thickness',
          defaultValue: '6px',
        },
        {
          var: '--CircularProgress-progress-thickness',
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => <CircularProgress sx={sx} />}
    />
  );
}
