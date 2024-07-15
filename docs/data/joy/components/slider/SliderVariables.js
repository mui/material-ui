import * as React from 'react';
import Slider from '@mui/joy/Slider';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function SliderVariables() {
  return (
    <JoyVariablesDemo
      componentName="Slider"
      data={[
        { var: '--Slider-trackSize', defaultValue: '6px' },
        { var: '--Slider-markSize', defaultValue: '2px' },
        { var: '--Slider-thumbSize', defaultValue: '14px' },
        { var: '--Slider-thumbWidth', defaultValue: '14px' },
        { var: '--Slider-valueLabelArrowSize', defaultValue: '8px' },
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
