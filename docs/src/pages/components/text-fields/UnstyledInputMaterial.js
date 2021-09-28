import * as React from 'react';
import { createTheme, ThemeProvider, Input, Stack, NoSsr } from '@mui/material';
import { Input as InputNext } from '@mui/material-next';

export default function UnstyledInputMaterial() {
  return (
    <ThemeProvider theme={createTheme()}>
      <NoSsr>
        <Stack sx={{ m: 1, width: 400 }} gap={1}>
          <p>@mui/material-next</p>
          <InputNext defaultValue="normal" />
          <InputNext defaultValue="small" size="small" />
          <InputNext defaultValue={'multi\nline'} multiline />
          <InputNext defaultValue="fullWidth" fullWidth />
          <InputNext defaultValue="disabled" disabled />
          <InputNext defaultValue="error" error />
          <InputNext defaultValue="search" type="search" />
          <InputNext defaultValue="" placeholder="placeholder" />
          <InputNext
            defaultValue="adornments"
            startAdornment={<span>[</span>}
            endAdornment={<span>]</span>}
          />
        </Stack>
        <Stack sx={{ m: 1, width: 400 }} gap={1}>
          <p>@mui/material</p>
          <Input defaultValue="normal" />
          <Input defaultValue="small" size="small" />
          <Input defaultValue={'multi\nline'} multiline />
          <Input defaultValue="fullWidth" fullWidth />
          <Input defaultValue="disabled" disabled />
          <Input defaultValue="error" error />
          <Input defaultValue="search" type="search" />
          <Input defaultValue="" placeholder="placeholder" />
          <Input
            defaultValue="adornments"
            startAdornment={<span>[</span>}
            endAdornment={<span>]</span>}
          />
        </Stack>
      </NoSsr>
    </ThemeProvider>
  );
}
