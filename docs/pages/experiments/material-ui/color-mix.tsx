import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { BrandingProvider } from '@mui/docs/branding';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function ColorMixPage() {
  const [value, setValue] = React.useState('oklch(80% 0.30 50)');
  const [primary, setPrimary] = React.useState('oklch(80% 0.30 50)');
  return (
    <ThemeProvider
      disableNestedContext
      theme={createTheme({
        cssVariables: {
          experimental_relativeColor: true,
        },
        colorSchemes: {
          light: {
            palette: { primary: { main: primary } },
          },
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100lvh',
        }}
      >
        <TextField
          label="Primary color"
          value={value}
          onChange={(event) => setValue(event.target.value as string)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setPrimary(value)}>
                  <KeyboardReturnIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPrimary(value);
            }
          }}
          helperText="Try one of: #f00, oklch(80% 0.30 50), hsl(255 50% 50%)"
          sx={{ width: 360 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="text" color="primary">
            Text
          </Button>
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <Button variant="outlined" color="primary">
            Outlined
          </Button>
        </Box>
        <div>
          <BrandingProvider mode="light">
            <HighlightedCode
              language="javascript"
              code={`extendTheme({
  cssVariables: {
    experimental_relativeColor: true,
  },
  colorSchemes: {
    light: {
      palette: { primary: { main: '${primary}' } },
    },
  },
})`}
            />
          </BrandingProvider>
          <BrandingProvider mode="light">
            <HighlightedCode
              language="css"
              code={`
--mui-palette-primary-main: ${primary};
--mui-palette-primary-light:
  color-mix(in oklch, ${primary}, #fff 20%);
--mui-palette-primary-dark:
  color-mix(in oklch, ${primary}, #000 30%);
--mui-palette-primary-contrastText:
  oklch(from var(--mui-palette-primary-main) var(--__l) 0 h / var(--__a));
`}
            />
          </BrandingProvider>
        </div>
      </Box>
    </ThemeProvider>
  );
}
