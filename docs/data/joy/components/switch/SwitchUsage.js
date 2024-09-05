import * as React from 'react';
import Switch from '@mui/joy/Switch';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SwitchUsage() {
  const [checked, setChecked] = React.useState(false);
  return (
    <JoyUsageDemo
      componentName="Switch"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          options: ['plain', 'outlined', 'soft', 'solid'],
          defaultValue: 'solid',
        },
        {
          formLabel: 'Checked color',
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
        { propName: 'disabled', knob: 'switch' },
      ]}
      renderDemo={(props) => (
        <Switch
          {...props}
          color={checked ? props.color : undefined}
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      )}
    />
  );
}
