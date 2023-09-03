import * as React from 'react';
import Box from '@mui/joy/Box';

function ThemeValuesCanBeSpread() {
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} />;
  <Box
    sx={(theme) => ({
      ...theme.typography['body-md'],
      color: theme.palette.primary[500],
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.variants.outlined,
      color: 'primary.500',
    })}
  />;
  <Box
    sx={[
      { color: 'primary.textColor', typography: 'body-sm' },
      (theme) => theme.variants.outlined,
      (theme) => ({
        '&:hover': theme.variants.outlinedHover,
      }),
      (theme) => ({
        '&:disabled': theme.variants.outlinedDisabled,
      }),
    ]}
  />;
}
