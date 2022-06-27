import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import Slider from '@mui/joy/Slider';

export default function SliderVariables() {
  return (
    <JoyVariablesDemo
      componentName="Slider"
      data={[
        { var: '--Slider-track-size', defaultValue: '6px' },
        { var: '--Slider-mark-size', defaultValue: '2px' },
        { var: '--Slider-thumb-size', defaultValue: '14px' },
        { var: '--Slider-thumb-width', defaultValue: '14px' },
        { var: '--Slider-valueLabel-arrowSize', defaultValue: '8px' },
      ]}
      renderDemo={(sx) => (
        <Slider
          defaultValue={3}
          max={10}
          marks
          valueLabelDisplay="on"
          sx={{ ...sx, width: 240, maxWidth: '100%' }}
        />
      )}
    />
  );
}
