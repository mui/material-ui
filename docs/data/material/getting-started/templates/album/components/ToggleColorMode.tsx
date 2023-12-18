// ToggleColorMode.js
import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../Album'; // Corrected import

function ToggleColorMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default ToggleColorMode;
