import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  showCustomTheme: any;
}

function ToggleColorMode({
  mode,
  toggleColorMode,
  showCustomTheme,
}: ToggleColorModeProps) {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: 32, height: 32, p: 1 }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
