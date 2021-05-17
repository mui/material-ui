import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  thickness: number;
  value: number;
  variant: 'determinate' | 'indeterminate';
  width: number | string;
  height: number;
}

export function CircularProgress(props: Props): JSX.Element {
  const { width, height, ...other } = props;

  return <MuiCircularProgress size={width} style={{ width, height }} {...other} />;
}

CircularProgress.defaultProps = {
  thickness: 4,
  value: 75,
  variant: 'determinate' as 'determinate',
  width: 44,
  height: 44,
};

addPropertyControls(CircularProgress, {
  thickness: {
    type: ControlType.Number,
    title: 'Thickness',
    min: 0,
    max: 22,
  },
  value: {
    type: ControlType.Number,
    title: 'Value',
    hidden(props) {
      return props.variant === 'indeterminate';
    },
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['determinate', 'indeterminate'],
  },
});
