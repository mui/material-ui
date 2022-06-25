import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function SwitchVariables() {
  return (
    <JoyVariablesDemo
      componentName="Switch"
      data={[
        { var: '--Switch-gap', defaultValue: '8px' },
        [
          'track',
          [
            { var: '--Switch-track-radius', defaultValue: '16px' },
            { var: '--Switch-track-width', defaultValue: '48px' },
            { var: '--Switch-track-height', defaultValue: '24px' },
          ],
          { defaultOpen: true },
        ],
        [
          'thumb',
          [
            { var: '--Switch-thumb-size', defaultValue: '16px' },
            { var: '--Switch-thumb-radius' },
            { var: '--Switch-thumb-width' },
            { var: '--Switch-thumb-offset' },
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
