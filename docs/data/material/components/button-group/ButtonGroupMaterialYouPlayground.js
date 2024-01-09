import * as React from 'react';
import Button from '@mui/material-next/Button';
import ButtonGroup from '@mui/material-next/ButtonGroup';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function ButtonGroupMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="ButtonGroup"
      data={[
        {
          propName: 'color',
          knob: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'tertiary'],
        },
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'text',
          options: ['text', 'outlined', 'filled', 'filledTonal', 'elevated'],
        },
        {
          propName: 'size',
          knob: 'select',
          options: ['small', 'medium', 'large'],
          defaultValue: 'medium',
        },
        {
          propName: 'orientation',
          knob: 'select',
          options: ['horizontal', 'vertical'],
          defaultValue: 'horizontal',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <ButtonGroup {...props}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button startIcon={<FavoriteBorder />}>Three</Button>
        </ButtonGroup>
      )}
    />
  );
}
