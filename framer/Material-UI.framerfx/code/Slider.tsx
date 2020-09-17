import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiSlider from '@material-ui/core/Slider';

interface Props {
  width: number | string;
  height: number;
}

export function Slider(props: Props): JSX.Element {
  const { width, height, ...other } = props;
  return <MuiSlider {...other} />;
}

Slider.defaultProps = {
  width: 160,
  height: 24,
};

addPropertyControls(Slider, {

});
