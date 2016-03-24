import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/Menu/MenuItem';

const SelectFieldExampleDisabled = () => (
  <SelectField value={1} disabled={true}>
    <MenuItem value={1} primaryText="Never" />
    <MenuItem value={2} primaryText="Every Night" />
  </SelectField>
);

export default SelectFieldExampleDisabled;
