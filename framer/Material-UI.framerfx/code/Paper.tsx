import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiPaper from '@material-ui/core/Paper';

interface Props {
  elevation?: number;
  square?: boolean;
  variant?: 'elevation' | 'outlined';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  elevation: 2,
  square: false,
  variant: 'elevation',
  width: 100,
  height: 100,
};

export const Paper: React.SFC<Props> = (props: Props) => {
  const { width, height, ...other } = props;

  return <MuiPaper style={{ width, height }} {...other} />;
};

Paper.defaultProps = defaultProps;

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
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['elevation', 'outlined'],
  },
});
