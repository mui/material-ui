import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
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
        <pre>MD2</pre>
        <Stack display="inline-flex" direction="row" gap={4}>
          <Md2FilledInput defaultValue="primary" color="primary" />
          <Md2FilledInput defaultValue="secondary" color="secondary" />
        </Stack>
        <Divider />
      </ThemeProvider>
      <CssVarsProvider theme={md3Theme}>
        <Stack direction="row" gap={1}>
          <pre>MD3</pre>
          <ModeSwitcher />
        </Stack>
        <Stack display="inline-flex" direction="row" gap={4}>
          <FilledInput defaultValue="primary" color="primary" />
          <FilledInput defaultValue="secondary" color="secondary" />
          <FilledInput defaultValue="tertiary" color="tertiary" />
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
