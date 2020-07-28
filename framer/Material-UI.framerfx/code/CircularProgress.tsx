import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  color: 'inherit' | 'primary' | 'secondary';
  thickness: number;
  value: number;
  variant: 'determinate' | 'indeterminate' | 'static';
  width: number | string;
  height: number;
}

export function CircularProgress(props: Props): JSX.Element {
  const { width, height, ...other } = props;

  return <MuiCircularProgress size={width} style={{ width, height }} {...other} />;
}

CircularProgress.defaultProps = {
  color: 'primary' as 'primary',
  thickness: 4,
  value: 75,
  variant: 'static' as 'static',
  width: 44,
  height: 44,
};

addPropertyControls(CircularProgress, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['inherit', 'primary', 'secondary'],
  },
  thickness: {
    type: ControlType.Number,
    title: 'Thickness',
    min: 0,
    max: 22,
  },
  value: {
    type: ControlType.Number,
    title: 'Value',
    hidden: function hidden(props) {
      return props.variant === 'indeterminate';
    },
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['determinate', 'indeterminate', 'static'],
  },
});
