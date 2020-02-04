import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MuiCheckbox from '@material-ui/core/Checkbox';
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function Checkbox(props) {
  const { checked: checkedProp, label, onChange, size, ...other } = props;
  // tslint:disable-next-line: ban-ts-ignore
  // @ts-ignore

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    setChecked((event.target as HTMLInputElement).checked);
  };

  // tslint:disable-next-line: ban-ts-ignore
  // @ts-ignore
  React.useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const control = <MuiCheckbox checked={checked} onChange={handleChange} size={size} />;

  return <FormControlLabel control={control} label={label} {...other} />;
}

Checkbox.defaultProps = {
  checked: false,
  color: 'secondary',
  disabled: false,
  size: 'medium',
  label: 'Checkbox',
  width: 100,
  height: 42,
};

addPropertyControls(Checkbox, {
  checked: {
    type: ControlType.Boolean,
    title: 'Checked',
  },
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
