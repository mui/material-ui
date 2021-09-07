import * as React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiSelect from '@material-ui/core/Select';
import { FormControl as MuiFormControl } from '@material-ui/core';

const Select = () => <MuiSelect />;

export default function TextFieldComponent(props) {
  return (
    <div>
      <MuiTextField />
      <Select />
      <MuiFormControl />
    </div>
  );
}
