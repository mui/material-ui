import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ColorModeContext } from '../Album';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode() {
  const contextValue = React.useContext(ColorModeContext);

  if (!contextValue) {
    throw new Error('ColorModeContext value is undefined');
  }

  const { mode, toggleColorMode } = contextValue;

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={toggleColorMode}
        sx={{ minWidth: '36px', px: 0, ml: 1 }}
      >
        {mode === 'dark' ? <WbSunnyRoundedIcon /> : <ModeNightRoundedIcon />}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
