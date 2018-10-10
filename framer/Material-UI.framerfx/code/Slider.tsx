import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiSlider from '@material-ui/core/Slider';

interface Props {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  max?: number;
  min?: number;
  orientation?: 'horizontal' | 'vertical';
  step?: number;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'primary',
  disabled: false,
  max: 100,
  min: 0,
  orientation: 'horizontal',
  step: 1,
  valueLabelDisplay: 'off',
  width: 160,
  height: 40,
};

const style: React.CSSProperties = {
  padding: '8px 20px',
};

export const Slider: React.SFC<Props> = (props: Props) => {
  const { width, height, ...other } = props;
  return (
    <div style={style}>
      <MuiSlider {...other} />
    </div>
  );
};

Slider.defaultProps = defaultProps;

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
  valueLabelDisplay: {
    type: ControlType.Enum,
    title: 'Value label display',
    options: ['on', 'auto', 'off'],
  },
});
