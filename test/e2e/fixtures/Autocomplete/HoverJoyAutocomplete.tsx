import { Autocomplete, CssVarsProvider, StyledEngineProvider } from '@mui/joy';
import * as React from 'react';

function HoverMaterialAutocomplete() {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <Autocomplete
          open
          options={['one', 'two', 'three', 'four', 'five']}
          sx={{ width: 300 }}
          slotProps={{ listbox: { sx: { height: '100px' } } }}
        />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

export default HoverMaterialAutocomplete;
