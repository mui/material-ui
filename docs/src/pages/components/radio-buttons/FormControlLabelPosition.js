import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPosition() {
  const [value, setValue] = React.useState('female');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">labelPlacement</FormLabel>
      <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="Top"
          labelPlacement="top"
        />
        <FormControlLabel
          value="start"
          control={<Radio color="primary" />}
          label="Start"
          labelPlacement="start"
        />
        <FormControlLabel
          value="bottom"
          control={<Radio color="primary" />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="End"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  );
}
