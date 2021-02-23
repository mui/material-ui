import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiPaper from '@material-ui/core/Paper';

interface Props {
  elevation: number;
  square: boolean;
  width: number | string;
  height: number;
}

export function Paper(props: Props): JSX.Element {
  const { width, height, ...other } = props;

  return <MuiPaper style={{ width, height }} {...other} />;
}

Paper.defaultProps = {
  elevation: 2,
  square: false,
  width: 100,
  height: 100,
};

addPropertyControls(Paper, {
  elevation: {
    type: ControlType.Number,
    title: 'Elevation',
    min: 0,
    max: 24,
  },
  square: {
    type: ControlType.Boolean,
    title: 'Square',
  },
});
