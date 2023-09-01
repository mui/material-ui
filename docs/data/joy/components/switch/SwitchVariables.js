import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function SwitchVariables() {
  return (
    <JoyVariablesDemo
      componentName="Switch"
      data={[
        { var: '--Switch-gap', defaultValue: '8px' },
        [
          'Track',
          [
            { var: '--Switch-trackRadius', defaultValue: '16px' },
            { var: '--Switch-trackWidth', defaultValue: '48px' },
            { var: '--Switch-trackHeight', defaultValue: '24px' },
          ],
          { defaultOpen: true },
        ],
        [
          'Thumb',
          [
            { var: '--Switch-thumbSize', defaultValue: '16px' },
            { var: '--Switch-thumbRadius' },
            { var: '--Switch-thumbWidth' },
            { var: '--Switch-thumbOffset' },
          ],
        ],
      ]}
      renderDemo={(sx) => (
        <Switch
          sx={sx}
          startDecorator={<Typography>Off</Typography>}
          endDecorator={<Typography>On</Typography>}
        />
      )}
    />
  );
}
