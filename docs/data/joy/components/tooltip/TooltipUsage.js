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
          defaultValue: 'soft',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
      ]}
      renderDemo={(props) => (
        <Tooltip title="Delete" {...props}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}
