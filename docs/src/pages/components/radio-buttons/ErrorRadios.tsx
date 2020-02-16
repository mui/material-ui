import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function RadioButtonsGroup() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');
  const [error, setError] = React.useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const checkAnswer = () => {
    console.log('CHECKING');
    setError(value === 'wrong');
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl} error={error}>
        <FormLabel component="legend">Age</FormLabel>
        <RadioGroup aria-label="age" name="age1" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="right" control={<Radio />} label="Right Answer" />
          <FormControlLabel value="wrong" control={<Radio />} label="Wrong Answer" />
        </RadioGroup>
        <FormHelperText>Choose wisely</FormHelperText>
        <Button variant="outlined" color="primary" onClick={checkAnswer}>
          Check Answer
        </Button>
      </FormControl>
    </div>
  );
}
