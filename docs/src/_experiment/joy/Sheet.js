/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

export const IconFrame = ({ children, color }) => (
  <Sheet variant="light" color={color} sx={{ p: 1.5, borderRadius: 'xs' }}>
    <Sheet variant="contained" color={color} sx={{ display: 'flex', p: 1, borderRadius: 'xs' }}>
      {children}
    </Sheet>
  </Sheet>
);
