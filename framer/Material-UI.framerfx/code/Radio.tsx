import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import MuiRadio from '@material-ui/core/Radio';

interface Props extends Omit<FormControlLabelProps, 'control'> {
  color: 'default' | 'primary' | 'secondary';
  disabled: boolean;
  size: 'medium' | 'small';
  label: string;
  width: number | string;
  height: number;
}

export function Radio(props: Props): JSX.Element {
  const { label, size, ...other } = props;

  return <FormControlLabel control={<MuiRadio size={size} />} label={label} {...other} />;
}

Radio.defaultProps = {
  color: 'secondary' as 'secondary',
  disabled: false,
  size: 'medium' as 'medium',
  label: 'Radio',
  width: '100%',
  height: 42,
};

addPropertyControls(Radio, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['default', 'primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['medium', 'small'],
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
