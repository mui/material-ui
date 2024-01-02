import * as React from 'react';
import Stack from '@mui/material/Stack';
import {
  FilledInput as Md2FilledInput,
  FormControl as Md2FormControl,
  InputLabel as Md2InputLabel,
  InputAdornment as Md2InputAdornment,
  FormHelperText as Md2FormHelperText,
  Divider,
  Box,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  FilledInput,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material-next';
import { FormControlProps } from '@mui/material-next/FormControl/FormControl.types';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ModeSwitcher } from '.';

const md2Theme = createTheme();

const md3Theme = extendTheme();

const COLORS = ['primary', 'secondary', 'tertiary', 'error', 'info', 'success', 'warning'];

const LABEL = 'Your e-mail address or username';
const DEFAULT_VALUE = 'mister.willy.wonka@gmail.com';

const renderAdornmentCombinations = (
  color: FormControlProps['color'],
  size?: 'medium' | 'small',
) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 180px)',
        gridTemplateRows: '1fr 1fr',
        gap: '1.5rem',
      }}
    >
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-noAdornments`}>{LABEL}</InputLabel>
        <FilledInput id={`md3-filled-input-${size}-noAdornments`} defaultValue="" />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAdornment`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAdornment`}
          defaultValue=""
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-endAdornment`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-endAdornment`}
          defaultValue=""
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAndEndAdornments`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAndEndAdornments`}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-noAdornments-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-noAdornments-initialFilled`}
          defaultValue={DEFAULT_VALUE}
        />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAdornment-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAdornment-initialFilled`}
          defaultValue={DEFAULT_VALUE}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-endAdornment-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-endAdornment-initialFilled`}
          defaultValue={DEFAULT_VALUE}
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAndEndAdornments-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAndEndAdornments-initialFilled`}
          defaultValue={DEFAULT_VALUE}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default function MaterialYouFilledInput() {
  const [color, setColor] = React.useState<FormControlProps['color']>('primary');

  return (
    <Stack spacing={4}>
      <CssVarsProvider theme={md3Theme}>
        <Stack
          direction="column"
          gap={4}
          sx={{ backgroundColor: 'background', p: 4, color: 'onBackground' }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <pre>MD3</pre>
            <ModeSwitcher />
            <select
              onChange={(ev) => {
                // @ts-ignore
                setColor(ev.currentTarget.value);
              }}
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Stack>

          <pre style={{ fontSize: 14, marginBottom: -8 }}>
            From left to right: (1) no adornments, (2) startAdornment only, (3) endAdornment only,
            (4) startAdornment and endAdornment
          </pre>

          <pre>size=&quot;medium&quot; (default)</pre>
          {renderAdornmentCombinations(color, 'medium')}

          <pre>size=&quot;small&quot;</pre>
          {renderAdornmentCombinations(color, 'small')}

          <Divider sx={{ mt: 4, mb: 12 }} />

          <pre>FormHelperText</pre>

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
        </Stack>
      </CssVarsProvider>

      <ThemeProvider theme={md2Theme}>
        <Stack direction="column" gap={4} sx={{ p: 4 }}>
          <pre>MD2</pre>
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
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary adornments</Md2InputLabel>
              <Md2FilledInput
                id="md2-primary"
                defaultValue="primary primary primary primary"
                endAdornment={
                  <Md2InputAdornment position="end">
                    <SearchIcon />
                  </Md2InputAdornment>
                }
              />
            </Md2FormControl>
            <Md2FormControl color="secondary" variant="filled">
              <Md2InputLabel htmlFor="md2-secondary">
                Secondary etc abc etc abc etc abc 123 321
              </Md2InputLabel>
              <Md2FilledInput
                id="md2-secondary"
                defaultValue="secondary secondary secondary secondary"
                endAdornment={<Md2InputAdornment position="end">$</Md2InputAdornment>}
              />
            </Md2FormControl>
          </Stack>
          <Stack display="inline-flex" direction="row" gap={4}>
            <Md2FormControl color="primary" variant="filled">
              <Md2InputLabel htmlFor="md2-primary">Primary abc 123 def 456 ghi 789</Md2InputLabel>
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
        </Stack>
      </ThemeProvider>
    </Stack>
  );
}
