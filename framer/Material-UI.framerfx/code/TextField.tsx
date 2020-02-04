import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiTextField from '@material-ui/core/TextField';

interface Props {
  autoFocus?: boolean;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  autoFocus: false,
  color: 'primary',
  disabled: false,
  error: false,
  fullWidth: true,
  helperText: '',
  label: 'TextField',
  multiline: false,
  required: false,
  variant: 'standard',
  width: 280,
  height: 56,
};

export const TextField: React.SFC<Props> = (props: Props) => {
  const { width, height, ...other } = props;
  const style: React.CSSProperties = {};

  return <MuiTextField style={style} {...other} />;
};

TextField.defaultProps = defaultProps;

addPropertyControls(TextField, {
  autoFocus: {
    type: ControlType.Boolean,
    title: 'Auto focus',
  },
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  error: {
    type: ControlType.Boolean,
    title: 'Error',
  },
  fullWidth: {
    type: ControlType.Boolean,
    title: 'Full width',
  },
  helperText: {
    type: ControlType.String,
    title: 'Helper text',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  multiline: {
    type: ControlType.Boolean,
    title: 'Multiline',
  },
  placeholder: {
    type: ControlType.String,
    title: 'Placeholder',
  },
  required: {
    type: ControlType.Boolean,
    title: 'Required',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['small', 'medium'],
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['standard', 'outlined', 'filled'],
  },
});
