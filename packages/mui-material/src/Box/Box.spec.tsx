import * as React from 'react';
import Box from '@mui/material/Box';

function ThemeValuesCanBeSpread() {
  <Box
    sx={(theme) => ({
      ...theme.typography.body1,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: 'primary.main',
    })}
  />;
}
