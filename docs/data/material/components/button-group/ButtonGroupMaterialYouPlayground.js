import * as React from 'react';
import Button from '@mui/material-next/Button';
import ButtonGroup from '@mui/material-next/ButtonGroup';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function ButtonGroupMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="ButtonGroup"
      data={[
        {
          propName: 'variant',
          defaultValue: 'outlined',
          options: ['text', 'outlined', 'filled', 'filledTonal', 'elevated'],
          knob: 'select',
        },
        {
          propName: 'orientation',
          defaultValue: 'horizontal',
          options: ['vertical', 'horizontal'],
          knob: 'select',
        },
        {
          propName: 'color',
          defaultValue: 'primary',
          knob: 'select',
          options: ['primary', 'secondary', 'tertiary'],
        },{
          propName: 'size',
          defaultValue: 'medium',
          knob: 'select',
          options: ['small', 'medium', 'large'],
        },
        {
          propName: 'disabled',
          defaultValue: false,
          knob: 'switch',
        },
      ]}
      renderDemo={(props) => (
        <ButtonGroup {...props}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )}
    />
  );
}
