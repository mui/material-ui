import * as React from 'react';
import { Box as SystemBox, createBox } from '@mui/system';
import { expectType } from '@mui/types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

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

// Compatibility with Material UI's Box
const defaultTheme = createTheme({});
const CustomBox = createBox({ defaultTheme });
expectType<typeof Box, typeof CustomBox>(CustomBox);

// @ts-expect-error System's Box has different type than Material UI's Box
expectType<typeof SystemBox, typeof CustomBox>(CustomBox);

function ColorTest() {
  <Box
    color={(theme) => theme.vars.palette.common.black}
    sx={(theme) => ({ backgroundColor: theme.vars.palette.background.default })}
  />;
}
