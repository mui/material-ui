import * as React from 'react';

import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function ToggleColorMode({
  mode,
  toggleColorMode,
}: ToggleColorModeProps) {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      aria-label="Theme toggle button"
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}
