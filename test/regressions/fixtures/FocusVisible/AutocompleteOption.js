import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Autocomplete options are plain <li> (not ButtonBase), so the ring is keyed to the option's
// keyboard-navigation state and insets (the listbox scrolls). The first option renders already
// focus-visible via `renderOption` so the screenshot loop captures the ring; `disablePortal` keeps
// the listbox inside the testcase element so it's in the screenshot.
const theme = createTheme({ focusVisible: true });

export default function AutocompleteOption() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, width: 280, height: 400 }}>
        <Autocomplete
          open
          options={['One', 'Two', 'Three']}
          slotProps={{ popper: { disablePortal: true } }}
          renderOption={(props, option) => {
            // eslint-disable-next-line react/prop-types -- render callback, not a component
            const { key, ...optionProps } = props;
            const className =
              option === 'One'
                ? `${optionProps.className} Mui-focusVisible`
                : optionProps.className;
            return (
              <li key={key} {...optionProps} className={className}>
                {option}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Options" />}
        />
      </Box>
    </ThemeProvider>
  );
}
