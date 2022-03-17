import * as React from 'react';
import TextField from '@mui/joy/TextField';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

export default function SelectField(props) {
  return <TextField {...props} endAdornment={<ArrowDropDown fontSize="lg" color="neutral" />} />;
}
