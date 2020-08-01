import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiTypography from '@material-ui/core/Typography';

interface Props {
  align: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  color:
    | 'error'
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary';
  noWrap: boolean;
  label: string;
  width: number | string;
  height: number;
}

export function Typography(props: Props): JSX.Element {
  const { height, label, width, ...other } = props;
  return <MuiTypography {...other}>{label}</MuiTypography>;
}

Typography.defaultProps = {
  align: 'inherit' as 'inherit',
  color: 'initial' as 'initial',
  noWrap: false,
  label: 'Typography',
  width: 100,
  height: 38,
};

addPropertyControls(Typography, {
  align: {
    type: ControlType.Enum,
    title: 'Align',
    options: ['center', 'inherit', 'justify', 'left', 'right'],
  },
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: [
      'error',
      'inherit',
      'initial',
      'primary',
      'secondary',
      'textPrimary',
      'textSecondary',
    ],
  },
  noWrap: {
    type: ControlType.Boolean,
    title: 'No wrap',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
