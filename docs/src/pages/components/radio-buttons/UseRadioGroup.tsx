import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
  labelChecked: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));

const MyFormControlLabel = (props: FormControlLabelProps) => {
  const classes = useStyles();

  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <FormControlLabel
      classes={{
        label: checked ? classes.labelChecked : '',
      }}
      {...props}
    />
  );
};

export default function UseRadioGroup() {
  return (
    <RadioGroup defaultValue="first">
      <MyFormControlLabel value="first" label="First" control={<Radio />} />

      <MyFormControlLabel value="second" label="Second" control={<Radio />} />
    </RadioGroup>
  );
}
