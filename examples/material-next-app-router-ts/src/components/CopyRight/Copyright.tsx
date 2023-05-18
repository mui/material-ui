'use client';

import {Typography, Link as MuiLink} from '@mui/material';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>
      {new Date().getFullYear()}.
    </Typography>
  );
};
