import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function SliderUsage() {
  return (
    <JoyUsageDemo
      componentName="Slider"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'solid',
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
        {
          propName: 'orientation',
          knob: 'radio',
          options: ['horizontal', 'vertical'],
          defaultValue: 'horizontal',
        },
        {
          propName: 'valueLabelDisplay',
          knob: 'radio',
          options: ['off', 'on', 'auto'],
          defaultValue: 'off',
        },
        { propName: 'disabled', knob: 'switch' },
        { propName: 'marks', knob: 'switch' },
      ]}
      renderDemo={(props) => (
        <Box
          sx={[
            {
              p: 2,
              lineHeight: 0,
              borderRadius: 'sm',
            },
            props.orientation === 'horizontal' && {
              width: 240,
              maxWidth: '100%',
            },
            props.orientation === 'vertical' && { height: 200 },
          ]}
        >
          <Slider defaultValue={3} max={10} {...props} />
        </Box>
      )}
    />
  );
}
