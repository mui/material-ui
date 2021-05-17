import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  value: number;
  valueBuffer: number;
  variant: 'buffer' | 'determinate' | 'indeterminate' | 'query';
  width: number | string;
  height: number;
}

export function LinearProgress(props: Props): JSX.Element {
  const { width, height, ...other } = props;
  const style: React.CSSProperties = {};

  return <MuiLinearProgress style={style} {...other} />;
}

LinearProgress.defaultProps = {
  value: 75,
  valueBuffer: 75,
  variant: 'determinate' as 'determinate',
  width: 200,
  height: 5,
};

addPropertyControls(LinearProgress, {
  value: {
    type: ControlType.Number,
    title: 'Value',
    hidden(props) {
      return props.variant === 'indeterminate';
    },
  },
  valueBuffer: {
    type: ControlType.Number,
    title: 'Value buffer',
    hidden(props) {
      return props.variant !== 'buffer';
    },
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['buffer', 'determinate', 'indeterminate', 'query'],
  },
});
