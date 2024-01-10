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
    <Box sx={{ maxWidth: '36px' }}>
      <Button
        variant="outlined"
        onClick={toggleColorMode}
        size="small"
        sx={{ minWidth: '30px', p: '4px', ml: 1 }}
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
