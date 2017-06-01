// @flow

import React from 'react';
import { FormLabel, FormControl } from 'material-ui/Form';
import { RadioGroup, LabelRadio as Radio } from 'material-ui/Radio';

export default function RadioGroupWithLabelError() {
  return (
    <FormControl style={{ width: 100 }} required error>
      <FormLabel>Location</FormLabel>
      <RadioGroup selectedValue="home">
        <Radio label="Home" value="home" />
        <Radio label="Work" value="work" />
      </RadioGroup>
    </FormControl>
  );
}
