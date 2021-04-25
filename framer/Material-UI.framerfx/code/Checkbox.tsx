import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  checked: boolean;
  defaultChecked?: boolean;
  disabled: boolean;
  label: string;
  width: number | string;
  height: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox(props: Props): JSX.Element {
  const {
    checked: checkedProp,
    label,
    onChange,
    // @ts-ignore -- untyped
    size,
    ...other
  } = props;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const control = <MuiCheckbox checked={checked} onChange={handleChange} size={size} />;

  return <FormControlLabel control={control} label={label} {...other} />;
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  label: 'Checkbox',
  width: 100,
  height: 42,
};

addPropertyControls(Checkbox, {
  checked: {
    type: ControlType.Boolean,
    title: 'Checked',
  },
  defaultChecked: {
    type: ControlType.Boolean,
    title: 'Default checked',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
