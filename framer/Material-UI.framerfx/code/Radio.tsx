import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import MuiRadio from '@material-ui/core/Radio';

interface Props extends Omit<FormControlLabelProps, 'control'> {
  disabled: boolean;
  label: string;
  width: number | string;
  height: number;
}

export function Radio(props: Props): JSX.Element {
  const {
    label,
    // @ts-ignore -- untyped
    size,
    ...other
  } = props;

  return <FormControlLabel control={<MuiRadio size={size} />} label={label} {...other} />;
}

Radio.defaultProps = {
  disabled: false,
  label: 'Radio',
  width: '100%',
  height: 42,
};

addPropertyControls(Radio, {
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
