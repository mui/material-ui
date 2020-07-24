import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) =>
  createStyles({
    labelChecked: {
      color: theme.palette.secondary.main,
    },
  }),
);

function MyFormControlLabel(props: FormControlLabelProps) {
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
}

export default function UseRadioGroup() {
  return (
    <RadioGroup name="use-radio-group" defaultValue="first">
      <MyFormControlLabel value="first" label="First" control={<Radio />} />
      <MyFormControlLabel value="second" label="Second" control={<Radio />} />
    </RadioGroup>
  );
}
