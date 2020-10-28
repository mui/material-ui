import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function GettingStarted() {
  return (<Box
    sx={{
      p: 3,
      color: 'primary.main',
      boxShadow: 3,
      ':hover': {
        backgroundColor: 'primary.light',
        color: 'primary.dark',
      }
    }}
  >
    How to use the sx prop
  </Box>);
}