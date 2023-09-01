import * as React from 'react';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function ButtonGroupUsage() {
  return (
    <JoyUsageDemo
      componentName="ButtonGroup"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'disabled',
          knob: 'switch',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'orientation',
          knob: 'radio',
          defaultValue: 'horizontal',
          options: ['horizontal', 'vertical'],
        },
        {
          propName: 'spacing',
          knob: 'number',
          defaultValue: 0,
        },
        {
          propName: 'children',
          defaultValue: `<Button />
  ...
  <IconButton />`,
        },
      ]}
      renderDemo={(props) => (
        <ButtonGroup {...props}>
          <Button>Vote</Button>
          <Button>Comment</Button>
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        </ButtonGroup>
      )}
    />
  );
}
