// @flow weak

import React from 'react';
import { FormLabel } from 'material-ui/Form';
import { RadioGroup, Radio } from 'material-ui/Radio';

export default function RadioGroupWithLabelRequired() {
  return (
    <div style={{ width: 100 }}>
      <FormLabel required>Location</FormLabel>
      <RadioGroup selectedValue="home">
        <Radio label="Home" value="home" />
        <Radio label="Work" value="work" />
      </RadioGroup>
    </div>
  );
}
