import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiLinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  color?: 'primary' | 'secondary';
  value?: number;
  valueBuffer?: number;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'primary',
  value: 75,
  valueBuffer: 75,
  variant: 'determinate',
  width: 200,
  height: 5,
};

export const LinearProgress: React.SFC<Props> = (props: Props) => {
  const { width, height, ...other } = props;
  const style: React.CSSProperties = {};

  return <MuiLinearProgress style={style} {...other} />;
};

LinearProgress.defaultProps = defaultProps;

addPropertyControls(LinearProgress, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['primary', 'secondary'],
  },
  value: {
    type: ControlType.Number,
    title: 'Value',
    hidden: function hidden(props) {
      return props.variant === 'indeterminate' || props.variant === 'query';
    },
  },
  valueBuffer: {
    type: ControlType.Number,
    title: 'Value buffer',
    hidden: function hidden(props) {
      return props.variant !== 'buffer';
    },
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['determinate', 'indeterminate', 'buffer', 'query'],
  },
});
