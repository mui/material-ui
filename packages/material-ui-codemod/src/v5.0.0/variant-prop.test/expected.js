import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

export default function TextFieldComponent(props) {
  return (
    <div>
      <TextField {...props} variant="standard" />
      <TextField />
      <TextField variant="standard" />
      <TextField variant="filled" />
      <Select {...props} variant="standard" />
      <Select />
      <Select variant="standard" />
      <Select variant="filled" />
      <FormControl {...props} variant="standard" />
      <FormControl />
      <FormControl variant="standard" />
      <FormControl variant="filled" />
    </div>
  );
}
