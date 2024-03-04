import * as React from 'react';
import Stack from '@mui/material/Stack';
import {
  FilledInput as Md2FilledInput,
  FormControl as Md2FormControl,
  InputLabel as Md2InputLabel,
  InputAdornment as Md2InputAdornment,
  FormHelperText as Md2FormHelperText,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FilledInput, FormControl, InputLabel, FormHelperText } from '@mui/material-next';
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
        <Stack direction="column" gap={4} sx={{ p: 4 }}>
          <pre>MD2</pre>
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary</Md2InputLabel>
              <Md2FilledInput
                id="md2-primary"
                defaultValue="primary"
                aria-describedby="md2-primary-helper-text"
              />
              <Md2FormHelperText id="md2-primary-helper-text">
                md2 primary helper text
              </Md2FormHelperText>
            </Md2FormControl>
            <Md2FormControl color="secondary" variant="filled">
              <Md2InputLabel htmlFor="md2-secondary">Secondary</Md2InputLabel>
              <Md2FilledInput
                id="md2-secondary"
                defaultValue="secondary"
                aria-describedby="md2-secondary-helper-text"
              />
              <Md2FormHelperText id="md2-secondary-helper-text">
                md2 secondary helper text
              </Md2FormHelperText>
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
        </Stack>
      </ThemeProvider>

      <CssVarsProvider theme={md3Theme}>
        <Stack
          direction="column"
          gap={4}
          sx={{ backgroundColor: 'background', p: 4, color: 'onBackground' }}
        >
          <Stack direction="row" gap={1}>
            <pre>MD3</pre>
            <ModeSwitcher />
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled">
              <InputLabel htmlFor="md3-primary">Primary</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled">
              <InputLabel htmlFor="md3-secondary">Secondary</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled">
              <InputLabel htmlFor="md3-tertiary">Tertiary</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled" disabled>
              <InputLabel htmlFor="md3-primary">Primary disabled</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary disabled"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled" disabled>
              <InputLabel htmlFor="md3-secondary">Secondary disabled</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary disabled"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled" disabled>
              <InputLabel htmlFor="md3-tertiary">Tertiary disabled</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary disabled"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4}>
            <FormControl color="primary" variant="filled" error>
              <InputLabel htmlFor="md3-primary">Primary error</InputLabel>
              <FilledInput
                id="md3-primary"
                defaultValue="primary error"
                aria-describedby="md3-primary-helper-text"
              />
              <FormHelperText id="md3-primary-helper-text">Primary helper text</FormHelperText>
            </FormControl>
            <FormControl color="secondary" variant="filled" error>
              <InputLabel htmlFor="md3-secondary">Secondary error</InputLabel>
              <FilledInput
                id="md3-secondary"
                defaultValue="secondary error"
                aria-describedby="md3-secondary-helper-text"
              />
              <FormHelperText id="md3-secondary-helper-text">Secondary helper text</FormHelperText>
            </FormControl>
            <FormControl color="tertiary" variant="filled" error>
              <InputLabel htmlFor="md3-tertiary">Tertiary error</InputLabel>
              <FilledInput
                id="md3-tertiary"
                defaultValue="tertiary error"
                aria-describedby="md3-tertiary-helper-text"
              />
              <FormHelperText id="md3-tertiary-helper-text">Tertiary helper text</FormHelperText>
            </FormControl>
          </Stack>

          <Stack display="inline-flex" direction="row" gap={4} mt={8}>
            <FormControl color="primary" variant="filled">
              <InputLabel htmlFor="md3-primary-adornment">WIP Primary adornments</InputLabel>
              <FilledInput
                id="md3-primary-adornment"
                defaultValue="WIP primary adornment"
                startAdornment={
                  <Md2InputAdornment position="start">
                    <SearchIcon />
                  </Md2InputAdornment>
                }
              />
            </FormControl>
            <FormControl color="secondary" variant="filled">
              <InputLabel htmlFor="md3-secondary-adornment">WIP Secondary adornments</InputLabel>
              <FilledInput
                id="md3-secondary-adornment"
                defaultValue="WIP secondary adornment"
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
        </Stack>
      </CssVarsProvider>
    </Stack>
  );
}
