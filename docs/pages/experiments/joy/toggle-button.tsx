import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

function ColorSchemeToggle({ onClick, sx, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" {...props} sx={sx} disabled />;
  }
  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
      sx={[
        mode === 'dark'
          ? { '& > *:first-of-type': { display: 'none' } }
          : { '& > *:first-of-type': { display: 'initial' } },
        mode === 'light'
          ? { '& > *:last-of-type': { display: 'none' } }
          : { '& > *:last-of-type': { display: 'initial' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkMode />
      <LightMode />
    </IconButton>
  );
}

export default function JoyToggleButton() {
  const [alignment, setAlignment] = React.useState<Array<'left' | 'center'>>(['left']);
  return (
    <CssVarsProvider>
      <CssBaseline />
      <ColorSchemeToggle sx={{ my: 3 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {(['primary', 'neutral', 'danger', 'success', 'warning'] as const).map((color) =>
          (['plain', 'outlined', 'soft', 'solid'] as const).map((variant) => (
            <ToggleButtonGroup
              key={`${variant}-${color}`}
              variant={variant}
              color={color}
              // spacing={0.5}
              value={alignment}
              onChange={(event, newValue) => {
                setAlignment(newValue);
              }}
            >
              <Button value="left">Left Aligned</Button>
              <IconButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </IconButton>
              <IconButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </IconButton>
            </ToggleButtonGroup>
          )),
        )}
      </Box>
    </CssVarsProvider>
  );
}
