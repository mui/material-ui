import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiTypography from '@material-ui/core/Typography';

interface Props {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';
  noWrap?: boolean;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit';
  label?: string;
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  align: 'inherit',
  color: 'initial',
  noWrap: false,
  variant: 'body1',
  label: 'Typography',
  width: 100,
  height: 38,
};

export const Typography: React.SFC<Props> = (props: Props) => {
  const { height, label, width, ...other } = props;
  return <MuiTypography {...other}>{label}</MuiTypography>;
};

Typography.defaultProps = defaultProps;

addPropertyControls(Typography, {
  align: {
    type: ControlType.Enum,
    title: 'Align',
    options: ['inherit', 'left', 'center', 'right', 'justify'],
  },
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: [
      'initial',
      'inherit',
      'primary',
      'secondary',
      'textPrimary',
      'textSecondary',
      'error',
    ],
  },
  noWrap: {
    type: ControlType.Boolean,
    title: 'No wrap',
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'caption',
      'button',
      'overline',
      'srOnly',
      'inherit',
    ],
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
