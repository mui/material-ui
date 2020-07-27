import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

interface Props {
  checked: boolean;
  color: 'default' | 'primary' | 'secondary';
  disabled: boolean;
  size: 'medium' | 'small';
  label: string;
  width: number | string;
  height: number;
}

export function Checkbox(props: Props): JSX.Element {
  const { checked: checkedProp, label, onChange, size, ...other } = props;
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    setChecked((event.target as HTMLInputElement).checked);
  };

  React.useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const control = <MuiCheckbox checked={checked} onChange={handleChange} size={size} />;

  return <FormControlLabel control={control} label={label} {...other} />;
}

Checkbox.defaultProps = {
  checked: false,
  color: 'secondary' as 'secondary',
  disabled: false,
  size: 'medium' as 'medium',
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
