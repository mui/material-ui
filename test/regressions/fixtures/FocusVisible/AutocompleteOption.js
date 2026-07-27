import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Autocomplete options are plain <li> (not ButtonBase), so the ring is keyed to the option's
// keyboard-navigation state and insets (the listbox scrolls).
const theme = createTheme({ focusVisible: true });

export default function AutocompleteOption() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, width: 280 }}>
        <Autocomplete
          open
          options={['One', 'Two', 'Three']}
          renderInput={(params) => <TextField {...params} label="Options" />}
        />
      </Box>
    </ThemeProvider>
  );
}
