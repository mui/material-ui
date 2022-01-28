import * as React from 'react';
import TextField from 'docs/src/_experiment/joy/TextField';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function SelectField(props) {
  return <TextField {...props} endAdornment={<ArrowDropDown fontSize="lg" color="neutral" />} />;
}
