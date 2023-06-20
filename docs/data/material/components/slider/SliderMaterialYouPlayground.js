import * as React from 'react';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';
import Slider from '@mui/material-next/Slider';
import Box from '@mui/material/Box';

export default function ButtonUsage() {
  return (
    <MaterialYouUsageDemo
      componentName="Slider"
      data={[
        {
          propName: 'min',
          defaultValue: 0,
        },
        {
          propName: 'max',
          defaultValue: 10,
        },
        {
          propName: 'valueLabelDisplay',
          knob: 'select',
          options: ['auto', 'on', 'off'],
          defaultValue: 'off',
        },
        {
          propName: 'size',
          knob: 'select',
          options: ['small', 'medium'],
          defaultValue: 'medium',
        },
        {
          propName: 'marks',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ width: 300 }}>
          <Slider {...props}>Hello world</Slider>
        </Box>
      )}
    />
  );
}
