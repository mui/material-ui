// @flow

import React from 'react';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

export default function RadioGroupWithLabelRequired() {
  return (
    <FormControl style={{ width: 100 }} required>
      <FormLabel>Location</FormLabel>
      <RadioGroup selectedValue="home">
        <FormControlLabel value="home" control={<Radio />} label="Home" />
        <FormControlLabel value="work" control={<Radio />} label="Work" />
      </RadioGroup>
    </FormControl>
  );
}
