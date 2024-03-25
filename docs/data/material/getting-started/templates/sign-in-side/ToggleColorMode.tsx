import * as React from 'react';
import { SxProps, Theme } from '@mui/system';
import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  sx?: SxProps<Theme>;
}

function ToggleColorMode({ mode, toggleColorMode, sx }: ToggleColorModeProps) {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      aria-label="Theme toggle button"
      sx={sx}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}

export default ToggleColorMode;
