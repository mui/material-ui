import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const props = {
  size: ['sm', 'md', 'lg'],
  color: ['primary', 'danger', 'info', 'success', 'warning'],
  variant: ['outlined', 'light', 'contained'],
} as const;

export default function JoySwitch() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              p: 2,
              alignItems: 'center',
            },
          }}
        >
          {Object.entries(props).map(([propName, propValue]) => (
            <Box key={propName}>
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Switch checked {...{ [propName]: value }} />
                  {value && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          <Box>
            <Typography color="info.textColor">Fluent</Typography>
            {(
              [
                { checked: false, variant: 'outlined' },
                { checked: true, variant: 'contained' },
                { disabled: true, variant: 'outlined' },
                { disabled: true, checked: true, variant: 'contained' },
              ] as const
            ).map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-track-width': '40px',
                  '--Switch-track-height': '20px',
                  '--Switch-thumb-size': '12px',
                  '--Switch-track-borderColor': '#8A8886', // grey110 in Fluent design
                  '--Switch-track-background': (theme) => theme.vars.palette.background.body,
                  '&:hover': {
                    '--Switch-track-borderColor': '#323130', // grey160 in Fluent design
                    '--Switch-track-background': (theme) => theme.vars.palette.background.body,
                  },
                  '&.Mui-checked': {
                    '--Switch-track-background': '#0078D4',
                    '&:hover': {
                      '--Switch-track-background': '#106EBE',
                    },
                  },
                  '&.Mui-disabled': {
                    '--Switch-thumb-color': '#C8C6C4',
                    '--Switch-track-borderColor': '#C8C6C4',
                  },
                  '&.Mui-disabled.Mui-checked': {
                    '--Switch-track-background': '#C8C6C4',
                    '--Switch-thumb-color': '#F3F2F1',
                  },
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">iOS</Typography>
            {(
              [
                { checked: false },
                { checked: true, color: 'success' },
                { disabled: true, checked: false },
                { disabled: true, checked: true, color: 'success' },
              ] as const
            ).map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-thumb-shadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                  '--Switch-thumb-size': '27px',
                  '--Switch-track-width': '51px',
                  '--Switch-track-height': '31px',
                  '--joy-palette-neutral-containedBg': '#E9E9EA',
                  '--joy-palette-neutral-containedHoverBg': '#E9E9EA',
                  '&.Mui-checked': {
                    '--joy-palette-success-containedBg': '#65C466',
                    '--joy-palette-success-containedHoverBg': '#65C466',
                  },
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">strapi</Typography>
            {(
              [
                { checked: false, color: 'danger' },
                { checked: true, color: 'success' },
                { disabled: true, checked: false, color: 'danger' },
                { disabled: true, checked: true, color: 'success' },
              ] as const
            ).map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-thumb-size': '16px',
                  '--Switch-track-width': '40px',
                  '--Switch-track-height': '24px',
                  '--joy-palette-danger-containedBg': '#EE5E52',
                  '--joy-palette-danger-containedHoverBg': '#EE5E52',
                  '--joy-palette-success-containedBg': '#5CB176',
                  '--joy-palette-success-containedHoverBg': '#5CB176',
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">Material</Typography>
            {(
              [
                { checked: false, variant: 'contained' },
                { checked: true, variant: 'light' },
                { disabled: true, checked: false, variant: 'contained' },
                { disabled: true, checked: true, variant: 'light' },
              ] as const
            ).map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-thumb-shadow':
                    'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
                  '--Switch-thumb-size': '20px',
                  '--Switch-track-width': '34px',
                  '--Switch-track-height': '14px',
                  '--joy-palette-neutral-containedBg': 'rgb(0, 0, 0, 0.38)',
                  '--joy-palette-neutral-containedHoverBg': 'rgb(0, 0, 0, 0.38)',
                  '&.Mui-checked': {
                    '--joy-palette-primary-lightColor': 'rgb(25, 118, 210)',
                    '--joy-palette-primary-lightBg': 'rgba(25, 118, 210, 0.5)',
                    '--joy-palette-primary-lightHoverBg': 'rgba(25, 118, 210, 0.5)',
                  },
                  '&.Mui-disabled': {
                    '--joy-palette-neutral-containedDisabledBg': 'rgb(0, 0, 0, 0.12)',
                    '--Switch-thumb-color': 'rgb(245, 245, 245)',
                  },
                  '&.Mui-disabled.Mui-checked': {
                    '--joy-palette-primary-lightDisabledBg': 'rgba(25, 118, 210, 0.12)',
                    '--Switch-thumb-color': 'rgb(167, 202, 237)',
                  },
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">Chakra UI</Typography>
            {[
              { checked: false },
              { checked: true },
              { disabled: true, checked: false },
              { disabled: true, checked: true },
            ].map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-thumb-size': '16px',
                  '--Switch-track-width': '34px',
                  '--Switch-track-height': '20px',
                  '--joy-palette-neutral-containedBg': '#CBD5E0',
                  '--joy-palette-neutral-containedDisabledBg': '#CBD5E0',
                  '--joy-palette-neutral-containedHoverBg': '#CBD5E0',
                  '--joy-palette-neutral-containedDisabledHoverBg': '#CBD5E0',
                  '--joy-palette-primary-containedBg': '#3182ce',
                  '--joy-palette-primary-containedHoverBg': '#3182ce',
                  '--joy-palette-primary-containedDisabledBg': '#3182ce',
                  '&.Mui-disabled': {
                    opacity: 0.4,
                  },
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">Tailwind UI</Typography>
            {([{ checked: false }, { checked: true, color: 'info' }] as const).map(
              (data, index) => (
                <Switch
                  key={index}
                  {...data}
                  sx={{
                    '--Switch-thumb-size': '20px',
                    '--Switch-track-width': '48px',
                    '--Switch-track-height': '24px',
                    '--joy-palette-neutral-containedBg': '#E9E9EA',
                    '--joy-palette-neutral-containedHoverBg': '#E9E9EA',
                    '--joy-palette-success-containedBg': '#65C466',
                    '--joy-palette-success-containedHoverBg': '#65C466',
                  }}
                />
              ),
            )}
            {[{ checked: false }, { checked: true }].map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--joy-shadowRing': '0 0 0 1px var(--Switch-track-background)',
                  '--Switch-thumb-shadow': 'var(--joy-shadowRing), 0 1px 4px 0 rgba(0,0,0,0.38)',
                  '--Switch-thumb-size': '20px',
                  '--Switch-track-width': '40px',
                  '--Switch-track-height': '16px',
                  '--joy-palette-neutral-containedBg': '#E9E9EA',
                  '--joy-palette-neutral-containedHoverBg': '#E9E9EA',
                  '--joy-palette-success-containedBg': '#65C466',
                  '--joy-palette-success-containedHoverBg': '#65C466',
                }}
              />
            ))}
          </Box>
          <Box>
            <Typography color="info.textColor">Mantine</Typography>
            {(
              [
                { checked: false, variant: 'outlined' },
                { checked: true, variant: 'contained' },
                { disabled: true, checked: false, variant: 'outlined' },
                { disabled: true, checked: true, variant: 'contained' },
              ] as const
            ).map((data, index) => (
              <Switch
                key={index}
                {...data}
                sx={{
                  '--Switch-thumb-size': '14px',
                  '--Switch-thumb-shadow': 'inset 0 0 0 1px #dee2e6',
                  '--Switch-track-width': '38px',
                  '--Switch-track-height': '20px',
                  '--Switch-track-borderColor': '#dee2e6',
                  '--Switch-thumb-color': '#fff',
                  '--Switch-track-background': '#e9ecef',
                  '&.Mui-checked': {
                    '--Switch-thumb-shadow': 'none',
                    '--Switch-track-background': '#228be6',
                    '&:hover': {
                      '--Switch-track-background': '#228be6',
                    },
                  },
                  '&.Mui-disabled': {
                    '--Switch-thumb-color': '#f8f9fa',
                    '--Switch-track-background': '#e9ecef',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
