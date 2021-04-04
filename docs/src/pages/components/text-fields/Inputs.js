import * as React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

export default function Inputs() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input
        defaultValue="Hello world"
        inputProps={{ 'aria-label': 'description' }}
      />
      <Input
        placeholder="Placeholder"
        inputProps={{ 'aria-label': 'description' }}
      />
      <Input
        disabled
        defaultValue="Disabled"
        inputProps={{ 'aria-label': 'description' }}
      />
      <Input
        defaultValue="Error"
        error
        inputProps={{ 'aria-label': 'description' }}
      />
    </Box>
  );
}
