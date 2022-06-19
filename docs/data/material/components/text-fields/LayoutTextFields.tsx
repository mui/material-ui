import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function RedNormalBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(255, 0, 0, 0.1)'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}

function RedDenseBar() {
  return (
    <Box
      sx={{
        height: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(255, 0, 0, 0.1)'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}

export default function LayoutTextFields() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { width: '25ch' },
      }}
    >
      <Box my={1}>
        <TextField label={'margin="none"'} id="margin-none" />
      </Box>
      <Box my={1}>
        <RedDenseBar />
        <TextField label={'margin="dense"'} id="margin-dense" margin="dense" />
        <RedDenseBar />
      </Box>
      <Box my={1}>
        <RedNormalBar />
        <TextField label={'margin="normal"'} id="margin-normal" margin="normal" />
        <RedNormalBar />
      </Box>
    </Box>
  );
}
