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

export default function RadioButtonsError() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const checkAnswer = () => {
    setError(value === 'worst');
    setHelperText(value === 'worst' ? 'Sorry, wrong answer!' : "You got it!")
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl} error={error}>
        <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="best" control={<Radio />} label="The best!" />
          <FormControlLabel value="worst" control={<Radio />} label="The worst." />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button variant="outlined" color="primary" onClick={checkAnswer}>
          Check Answer
        </Button>
      </FormControl>
    </div>
  );
}
