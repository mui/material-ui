import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../Album';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={colorMode.toggleColorMode}
        sx={{ minWidth: '36px', px: 0, ml: 1 }}
      >
        {theme.palette.mode === 'dark' ? (
          <WbSunnyRoundedIcon />
        ) : (
          <ModeNightRoundedIcon />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
