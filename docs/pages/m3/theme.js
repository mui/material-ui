import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import {
  createM3Theme,
  Button,
  TextField,
  ActiveIndicator,
  FloatingLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  FilledInput,
  OutlinedInput,
  InputAdornment,
} from '@mui/material/unstable_m3';

const m3Theme = createM3Theme();

export default function M3ThemePage() {
  return (
    <ThemeProvider theme={m3Theme}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          p: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        }}
      >
        <TextField label="Label" helperText="Helper Text" />
        <TextField
          variant="filled"
          label="Label"
          helperText={
            <React.Fragment>
              <span>Helper Text</span>
              <span>5 / 20</span>
            </React.Fragment>
          }
        />
        <TextField variant="outlined" label="Label" helperText="Helper Text" />

        <TextField
          disabled
          value="Hello World"
          variant="filled"
          label="Label"
          helperText={
            <React.Fragment>
              <span>Helper Text</span>
              <span>5 / 20</span>
            </React.Fragment>
          }
          startAdornment="$"
        />
        <TextField
          disabled
          variant="outlined"
          label="Label"
          helperText="Helper Text"
          endAdornment="0.00"
        />

        <FormControl>
          <Box sx={{ display: 'flex' }}>
            <FormLabel>Label</FormLabel>
            <Box
              sx={(theme) => ({
                ...theme.typography['label-small'],
                borderRadius: theme.vars.sys['shape-corner-full'],
                background: theme.vars.sys['color-primary-container'],
                color: theme.vars.sys['color-on-primary-container'],
                display: 'inline-flex',
                padding: '2px 6px',
                ml: 'auto',
              })}
            >
              New
            </Box>
          </Box>
          <Input placeholder="Placeholder" />
          <FormHelperText>Helper Text</FormHelperText>
        </FormControl>

        <FormControl>
          <FilledInput
            label="Label"
            placeholder="Placeholder"
            startAdornment={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            }
            endAdornment={
              <InputAdornment>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="1em"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </InputAdornment>
            }
          />
          <FormHelperText>
            <React.Fragment>
              <span>Helper Text</span>
              <span>5 / 20</span>
            </React.Fragment>
          </FormHelperText>
        </FormControl>

        <OutlinedInput label="Label" placeholder="Placeholder" />

        <Box
          sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1, alignItems: 'baseline' }}
        >
          <FormLabel>Name:</FormLabel>
          <Input
            placeholder="Placeholder"
            startAdornment={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            }
            endAdornment={
              <InputAdornment position="end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="1em"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </InputAdornment>
            }
            sx={{
              '--start-adornment-size': '16px',
            }}
          />

          <FormLabel>Address:</FormLabel>
          <Input placeholder="Placeholder" />

          <FormLabel>Nationality:</FormLabel>
          <Input placeholder="Placeholder" />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
