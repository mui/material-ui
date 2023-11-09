import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {
  FilledInput as Md2FilledInput,
  FormControl as Md2FormControl,
  InputLabel as Md2InputLabel,
  InputAdornment as Md2InputAdornment,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FilledInput, FormControl, InputLabel } from '@mui/material-next';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ModeSwitcher } from '.';

const md2Theme = createTheme();

const md3Theme = extendTheme();

export default function MaterialYouInputs() {
  return (
    <Stack spacing={4}>
      <ThemeProvider theme={md2Theme}>
        <pre>MD2</pre>
        <Stack display="inline-flex" direction="row" gap={4}>
          <Md2FormControl color="primary" variant="filled">
            <Md2InputLabel htmlFor="md2-primary">Primary</Md2InputLabel>
            <Md2FilledInput id="md2-primary" defaultValue="primary" />
          </Md2FormControl>
          <Md2FormControl color="secondary" variant="filled">
            <Md2InputLabel htmlFor="md2-secondary">Secondary</Md2InputLabel>
            <Md2FilledInput id="md2-secondary" defaultValue="secondary" />
          </Md2FormControl>
        </Stack>
        <Stack display="inline-flex" direction="row" gap={4}>
          <Md2FormControl color="primary" variant="filled">
            <Md2InputLabel htmlFor="md2-primary">Primary adornments</Md2InputLabel>
            <Md2FilledInput
              id="md2-primary"
              defaultValue="primary"
              startAdornment={
                <Md2InputAdornment position="start">
                  <SearchIcon />
                </Md2InputAdornment>
              }
            />
          </Md2FormControl>
          <Md2FormControl color="secondary" variant="filled">
            <Md2InputLabel htmlFor="md2-secondary">Secondary adornments</Md2InputLabel>
            <Md2FilledInput
              id="md2-secondary"
              defaultValue="secondary"
              startAdornment={<Md2InputAdornment position="start">$</Md2InputAdornment>}
            />
          </Md2FormControl>
        </Stack>
        <Divider />
      </ThemeProvider>
      <CssVarsProvider theme={md3Theme}>
        <Stack direction="row" gap={1}>
          <pre>MD3</pre>
          <ModeSwitcher />
        </Stack>
        <Stack display="inline-flex" direction="row" gap={4}>
          <FormControl color="primary" variant="filled">
            <InputLabel htmlFor="md3-primary">Primary</InputLabel>
            <FilledInput id="md3-primary" defaultValue="primary" />
          </FormControl>
          <FormControl color="secondary" variant="filled">
            <InputLabel htmlFor="md3-secondary">Secondary</InputLabel>
            <FilledInput id="md3-secondary" defaultValue="secondary" />
          </FormControl>
          <FormControl color="tertiary" variant="filled">
            <InputLabel htmlFor="md3-tertiary">Tertiary</InputLabel>
            <FilledInput id="md3-tertiary" defaultValue="tertiary" />
          </FormControl>
        </Stack>
        <Stack display="inline-flex" direction="row" gap={4}>
          <FormControl color="primary" variant="filled">
            <InputLabel htmlFor="md3-primary">Primary adornments</InputLabel>
            <FilledInput
              id="md3-primary"
              defaultValue="primary"
              startAdornment={
                <Md2InputAdornment position="start">
                  <SearchIcon />
                </Md2InputAdornment>
              }
            />
          </FormControl>
          <FormControl color="secondary" variant="filled">
            <InputLabel htmlFor="md3-secondary">Secondary adornments</InputLabel>
            <FilledInput
              id="md3-secondary"
              defaultValue="secondary"
              startAdornment={
                <Md2InputAdornment position="start">
                  <SearchIcon />
                </Md2InputAdornment>
              }
              endAdornment={
                <Md2InputAdornment position="end">
                  <HighlightOffIcon />
                </Md2InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
