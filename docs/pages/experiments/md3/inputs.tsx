import * as React from 'react';
import Stack from '@mui/material/Stack';
import Md2FilledInput from '@mui/material/FilledInput';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FilledInput from '@mui/material-next/FilledInput';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import { ModeSwitcher } from '.';

const md2Theme = createTheme();

const md3Theme = extendTheme();

export default function MaterialYouInputs() {
  return (
    <Stack spacing={4}>
      <ThemeProvider theme={md2Theme}>
        <Stack display="inline-flex" direction="row" gap={4}>
          <Md2FilledInput defaultValue="Hello" color="primary" />
          <Md2FilledInput defaultValue="Hello" color="secondary" />
        </Stack>
      </ThemeProvider>
      <CssVarsProvider theme={md3Theme}>
        <ModeSwitcher />
        <Stack display="inline-flex" direction="row" gap={4}>
          <FilledInput defaultValue="Hello" color="primary" />
          <FilledInput defaultValue="Hello" color="secondary" />
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
