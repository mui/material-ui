import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiCircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  color?: 'inherit' | 'primary' | 'secondary';
  thickness?: number;
  value?: number;
  variant?: 'determinate' | 'indeterminate' | 'static';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'primary',
  thickness: 4,
  value: 75,
  variant: 'static',
  width: 44,
  height: 44,
};

export const CircularProgress: React.SFC<Props> = (props: Props) => {
  const { width, height, ...other } = props;
  const style: React.CSSProperties = {
    width: 'width',
    height: 'height',
  };

  return <MuiCircularProgress size={width} {...other} />;
};

CircularProgress.defaultProps = defaultProps;

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
      return props.variant === 'indeterminate' || props.variant === 'query';
    },
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['determinate', 'indeterminate', 'static'],
  },
});
