import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

export default function TextFieldComponent(props) {
  return (
    <div>
      <TextField variant="standard" {...props} />
      <TextField variant="outlined" />
      <TextField variant="standard" />
      <TextField variant="filled" />
      <Select variant="standard" {...props} />
      <Select variant="outlined" />
      <Select variant="standard" />
      <Select variant="filled" />
      <FormControl variant="standard" {...props} />
      <FormControl variant="outlined" />
      <FormControl variant="standard" />
      <FormControl variant="filled" />
      <Autocomplete
        options={[]}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      <CustomSelect />
      <SelectedRoute />
      <FromToSelect />
      <FromToSelectDrawer />
    </div>
  );
}
