import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import countries from './countries';

interface Option {
  label: string;
  detail: string;
}

const getOptionKey = (option: Option) => `${option.label}-${option.detail}`;

// Theme.ts
const customTheme = (outerTheme: Theme) =>
  createTheme({
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiAutocomplete: {
        defaultProps: {
          renderOption: (props, option, state, ownerState) => {
            const { key, ...optionProps } = props;
            const { detail } = option as Option;

            return (
              <Box
                key={key}
                sx={{
                  borderRadius: 1,
                  m: 0.625,
                  [`&.${autocompleteClasses.option}`]: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1,
                  },
                }}
                component="li"
                {...optionProps}
              >
                <Box
                  component="span"
                  sx={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ownerState.getOptionLabel(option)}
                </Box>
                <Chip
                  label={detail}
                  size="small"
                  sx={{
                    ml: 'auto',
                    flexShrink: 0,
                  }}
                />
              </Box>
            );
          },
        },
      },
    },
  });

const languages: readonly Option[] = [
  { detail: 'en-US', label: 'English (US)' },
  { detail: 'en-GB', label: 'English (UK)' },
  { detail: 'es-ES', label: 'Spanish (Spain)' },
  { detail: 'es-MX', label: 'Spanish (Mexico)' },
  { detail: 'fr-FR', label: 'French' },
  { detail: 'de-DE', label: 'German' },
  { detail: 'it-IT', label: 'Italian' },
  { detail: 'ja-JP', label: 'Japanese' },
  { detail: 'ko-KR', label: 'Korean' },
  { detail: 'pt-BR', label: 'Portuguese' },
  { detail: 'zh-CN', label: 'Chinese (Simplified)' },
  { detail: 'zh-TW', label: 'Chinese (Traditional)' },
];

const countryOptions: readonly Option[] = countries.map((country) => ({
  label: `${country.label} (${country.code})`,
  detail: `+${country.countryCallingCode}`,
}));

export default function GloballyCustomizedOptions() {
  return (
    <ThemeProvider theme={customTheme}>
      <Stack spacing={2} sx={{ width: 300 }}>
        <LanguageSelect />
        <CountrySelect />
      </Stack>
    </ThemeProvider>
  );
}

function LanguageSelect() {
  return (
    <Autocomplete
      options={languages}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Preferred language" variant="filled" />
      )}
    />
  );
}

function CountrySelect() {
  return (
    <Autocomplete
      options={countryOptions}
      getOptionLabel={(option) => option.label}
      getOptionKey={getOptionKey}
      renderInput={(params) => <TextField {...params} label="Choose a country" />}
    />
  );
}
