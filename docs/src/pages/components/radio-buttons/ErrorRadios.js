import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function RadioButtonsGroup() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const error = value === 'error';

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl} error={error}>
        <FormLabel component="legend">Age</FormLabel>
        <RadioGroup aria-label="age" name="age1" value={value} onChange={handleChange}>
          <FormControlLabel value="old" control={<Radio />} label="Old" />
          <FormControlLabel value="young" control={<Radio />} label="Young" />
          <FormControlLabel value="error" control={<Radio />} label="Error" />
        </RadioGroup>
        <FormHelperText>Choose an age group</FormHelperText>
      </FormControl>
    </div>
  );
}
