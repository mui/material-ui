import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleColorMode from './ToggleColorMode';

import LanguageIcon from '@mui/icons-material/Language';

function AppAppBar() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'Background',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <LanguageIcon color="primary" sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              color="primary"
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              Acme company
            </Typography>
          </Box>
          <Button color="primary" variant="contained" sx={{ mr: 1 }}>
            Sign up
          </Button>
          <Button color="primary" variant="outlined">
            Sign in
          </Button>
          <ToggleColorMode />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
