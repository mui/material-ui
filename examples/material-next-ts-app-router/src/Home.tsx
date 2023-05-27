'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Material UI - Next.js (App router) example
      </Typography>
    </Box>
  );
}
