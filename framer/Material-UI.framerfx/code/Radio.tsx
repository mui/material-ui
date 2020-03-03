import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import FormControlLabel from '@material-ui/core/FormControlLabel';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiRadio from '@material-ui/core/Radio';

interface Props {
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  size?: 'small' | 'medium';
  label?: string;
  width?: number;
  height?: number;
}

export function Radio(props) {
  const { label, size, ...other } = props;

  return <FormControlLabel control={<MuiRadio size={size} />} label={label} {...other} />;
}

Radio.defaultProps = {
  color: 'secondary',
  disabled: false,
  size: 'medium',
  label: 'Radio',
  width: '100%',
  height: 42,
};

addPropertyControls(Radio, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['primary', 'secondary', 'default'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['small', 'medium'],
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
