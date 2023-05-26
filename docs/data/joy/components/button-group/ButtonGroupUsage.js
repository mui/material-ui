import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="ButtonGroup"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'outlined',
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
          propName: 'orientation',
          knob: 'radio',
          defaultValue: 'horizontal',
          options: ['horizontal', 'vertical'],
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
          <Button disabled>Comment</Button>
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        </ButtonGroup>
      )}
    />
  );
}
