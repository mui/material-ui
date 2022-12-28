import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function ComposedTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          defaultValue="Composed TextField"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Some important helper text
        </FormHelperText>
      </FormControl>
      <FormControl disabled variant="standard">
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" defaultValue="Composed TextField" />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl error variant="standard">
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          defaultValue="Composed TextField"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue="Composed TextField"
          label="Name"
        />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" defaultValue="Composed TextField" />
      </FormControl>
    </Box>
  );
}
