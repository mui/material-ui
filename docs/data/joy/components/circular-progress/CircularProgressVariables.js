import * as React from 'react';
import CircularProgress, {
  circularProgressCssVars,
} from '@mui/joy/CircularProgress';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function CircularProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="CircularProgress"
      data={[
        {
          var: [circularProgressCssVars.size],
          defaultValue: '40px',
          helperText: 'Supports only `px` unit',
        },
        {
          var: [circularProgressCssVars.trackThickness],
          defaultValue: '6px',
        },
        {
          var: [circularProgressCssVars.progressThickness],
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => <CircularProgress sx={sx} />}
    />
  );
}
