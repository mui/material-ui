import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function TooltipUsage() {
  return (
    <JoyUsageDemo
      componentName="Tooltip"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'solid',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'placement',
          knob: 'placement',
          defaultValue: 'bottom',
        },
        {
          propName: 'arrow',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'open',
          knob: 'radio',
          options: ['false', 'true'],
          defaultValue: true,
        },
      ]}
      renderDemo={(props) => (
        <Tooltip title="This is a tooltip" {...props}>
          <IconButton size="lg" variant="soft" color="neutral">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}
