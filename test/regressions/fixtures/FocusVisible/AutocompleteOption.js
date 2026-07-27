import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Autocomplete options are plain <li> (not ButtonBase), so the ring is keyed to the option's
// keyboard-navigation state and insets (the listbox scrolls).
const theme = createTheme({ focusVisible: true });

export default function AutocompleteOption() {
  const ref = React.useRef(null);
  // Highlight the first option so the screenshot loop captures the ring (see InsetControls). The
  // listbox is inline (disablePortal) so it lives under this ref.
  React.useLayoutEffect(() => {
    ref.current?.querySelector('.MuiAutocomplete-option')?.classList.add('Mui-focusVisible');
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box ref={ref} sx={{ p: 2, width: 280, height: 400 }}>
        <Autocomplete
          open
          options={['One', 'Two', 'Three']}
          slotProps={{ popper: { disablePortal: true } }}
          renderInput={(params) => <TextField {...params} label="Options" />}
        />
      </Box>
    </ThemeProvider>
  );
}
