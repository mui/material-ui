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
const HELPER_TEXT = 'Lorem ipsum dolor sit amet consectetur';

const renderAdornmentCombinations = (
  color: FormControlProps['color'],
  size?: 'medium' | 'small',
  showHelperText: boolean = false,
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
        <FilledInput
          id={`md3-filled-input-${size}-noAdornments`}
          aria-describedby={
            showHelperText ? `md3-filled-input-helper-text-${size}-noAdornments` : undefined
          }
          defaultValue=""
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-noAdornments`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAdornment`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAdornment`}
          aria-describedby={
            showHelperText ? `md3-filled-input-helper-text-${size}-startAdornment` : undefined
          }
          defaultValue=""
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-startAdornment`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-endAdornment`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-endAdornment`}
          aria-describedby={
            showHelperText ? `md3-filled-input-helper-text-${size}-endAdornment` : undefined
          }
          defaultValue=""
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-endAdornment`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAndEndAdornments`}>{LABEL}</InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAndEndAdornments`}
          aria-describedby={
            showHelperText
              ? `md3-filled-input-helper-text-${size}-startAndEndAdornments`
              : undefined
          }
          defaultValue=""
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
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-startAndEndAdornments`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-noAdornments-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-noAdornments-initialFilled`}
          aria-describedby={
            showHelperText
              ? `md3-filled-input-helper-text-${size}-noAdornments-initialFilled`
              : undefined
          }
          defaultValue={DEFAULT_VALUE}
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-noAdornments-initialFilled`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAdornment-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAdornment-initialFilled`}
          aria-describedby={
            showHelperText
              ? `md3-filled-input-helper-text-${size}-startAdornment-initialFilled`
              : undefined
          }
          defaultValue={DEFAULT_VALUE}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-startAdornment-initialFilled`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-endAdornment-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-endAdornment-initialFilled`}
          aria-describedby={
            showHelperText
              ? `md3-filled-input-helper-text-${size}-endAdornment-initialFilled`
              : undefined
          }
          defaultValue={DEFAULT_VALUE}
          endAdornment={
            <InputAdornment position="end">
              <HighlightOffIcon />
            </InputAdornment>
          }
        />
        {showHelperText && (
          <FormHelperText id={`md3-filled-input-helper-text-${size}-endAdornment-initialFilled`}>
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl size={size} color={color} variant="filled">
        <InputLabel htmlFor={`md3-filled-input-${size}-startAndEndAdornments-initialFilled`}>
          {LABEL}
        </InputLabel>
        <FilledInput
          id={`md3-filled-input-${size}-startAndEndAdornments-initialFilled`}
          aria-describedby={
            showHelperText
              ? `md3-filled-input-helper-text-${size}-startAndEndAdornments-initialFilled`
              : undefined
          }
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
        {showHelperText && (
          <FormHelperText
            id={`md3-filled-input-helper-text-${size}-startAndEndAdornments-initialFilled`}
          >
            {HELPER_TEXT}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default function MaterialYouFilledInput() {
  const [color, setColor] = React.useState<FormControlProps['color']>('primary');
  const [showHelperText, setShowHelperText] = React.useState<boolean>(false);

  return (
    <Stack spacing={4}>
      <CssVarsProvider theme={md3Theme}>
        <Stack
          direction="column"
          gap={4}
          sx={{ backgroundColor: 'background', p: 4, color: 'onBackground' }}
        >
          <Stack direction="row" gap={1}>
            <pre>MD3</pre>
            <ModeSwitcher />
            <Stack
              direction="row"
              component="label"
              htmlFor="selectColor"
              alignItems="center"
              ml={8}
            >
              <pre>Color:</pre>
              <select
                id="selectColor"
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
            <Stack direction="row" component="label" htmlFor="showHelperText" ml={2}>
              <input
                id="showHelperText"
                type="checkbox"
                onChange={(ev) => {
                  setShowHelperText(ev.currentTarget.checked);
                }}
              />
              <pre>Show FormHelperText</pre>
            </Stack>
          </Stack>

          <pre style={{ fontSize: 14, marginBottom: -8 }}>
            From left to right: (1) no adornments, (2) startAdornment only, (3) endAdornment only,
            (4) startAdornment and endAdornment
          </pre>

          <pre>size=&quot;medium&quot; (default)</pre>
          {renderAdornmentCombinations(color, 'medium', showHelperText)}

          <pre>size=&quot;small&quot;</pre>
          {renderAdornmentCombinations(color, 'small', showHelperText)}

          <Divider sx={{ my: 4 }} />
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
