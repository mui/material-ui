import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';

export default function RadioUsage() {
  return (
    <JoyUsageDemo
      componentName="RadioGroup"
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
          propName: 'row',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <div>
          <FormLabel
            id="radio-button-usage-label"
            sx={{
              mb: 2,
              fontWeight: 'xl',
              textTransform: 'uppercase',
              fontSize: 'xs',
              letterSpacing: '0.15rem',
              color: 'text.secondary',
            }}
          >
            Pizza crust
          </FormLabel>
          <RadioGroup
            {...props}
            defaultValue="1"
            name="radio-button-usage"
            aria-labelledby="radio-button-usage-label"
          >
            <Radio label="Regular crust" value="1" />
            <Radio label="Deep dish" value="2" />
            <Radio label="Thin crust" value="3" disabled />
          </RadioGroup>
        </div>
      )}
    />
  );
}
