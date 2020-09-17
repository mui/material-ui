import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiSlider from '@material-ui/core/Slider';

interface Props {
  color: 'primary' | 'secondary';
  disabled: boolean;
  max: number;
  min: number;
  orientation: 'horizontal' | 'vertical';
  step: number;
  track: 'inverted' | 'normal' | false;
  valueLabelDisplay: 'auto' | 'off' | 'on';
  width: number | string;
  height: number;
}

export function Slider(props: Props): JSX.Element {
  const { width, height, ...other } = props;
  return <MuiSlider {...other} />;
}

Slider.defaultProps = {
  color: 'primary' as 'primary',
  disabled: false,
  max: 100,
  min: 0,
  orientation: 'horizontal' as 'horizontal',
  step: 1,
  track: 'normal' as 'normal',
  valueLabelDisplay: 'off' as 'off',
  width: 160,
  height: 24,
};

addPropertyControls(Slider, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  max: {
    type: ControlType.Number,
    title: 'Max',
  },
  min: {
    type: ControlType.Number,
    title: 'Min',
  },
  orientation: {
    type: ControlType.Enum,
    title: 'Orientation',
    options: ['horizontal', 'vertical'],
  },
  step: {
    type: ControlType.Number,
    title: 'Step',
  },
  track: {
    type: ControlType.Enum,
    title: 'Track',
    options: ['inverted', 'normal', false],
  },
  valueLabelDisplay: {
    type: ControlType.Enum,
    title: 'Value label display',
    options: ['auto', 'off', 'on'],
  },
});
