import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

function SelectAlignment() {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="age1">Age</InputLabel>
        <Select value="" input={<Input name="age1" id="age1" />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="age2">year</InputLabel>
        <Select value={10} input={<Input name="year" id="age2" />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input id="name-input" />
        <FormHelperText>Alignment with an input</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectAlignment;
