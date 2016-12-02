// @flow weak

import React from 'react';
import { FormLabel } from 'material-ui/Form'
import { RadioGroup, Radio } from 'material-ui/Radio';

export default function RadioGroupWithLabelError() {
  return (
    <div style={{ width: 100 }}>
      <RadioGroup selectedValue="home">
        <FormLabel required error>Location</FormLabel>
        <Radio label="Home" value="home" />
        <Radio label="Work" value="work" />
      </RadioGroup>
    </div>
  );
}
