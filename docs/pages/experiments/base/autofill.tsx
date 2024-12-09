import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Autofill() {
  return (
    <Box component="form" sx={{ maxWidth: 400, m: 2 }}>
      <TextField
        id="email"
        type="email"
        name="email"
        label="Email"
        placeholder="your@email.com"
        autoComplete="email"
        autoFocus
        required
        fullWidth
        variant="outlined"
      />
      <TextField
        name="password"
        label="Password"
        placeholder="••••••"
        type="password"
        id="password"
        autoComplete="current-password"
        autoFocus
        required
        fullWidth
        variant="outlined"
      />
      <Button type="submit" fullWidth variant="contained">
        Sign in
      </Button>
    </Box>
  );
}
