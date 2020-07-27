import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import FormControlLabel from '@material-ui/core/FormControlLabel';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiRadio from '@material-ui/core/Radio';

interface Props {
  color?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'medium' | 'small';
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
