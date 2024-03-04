import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

const theme = extendTheme({ cssVarPrefix: 'demo' });

export default function DarkModeByDefault() {
  return (
    <CssVarsProvider
      defaultMode="dark"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
      disableNestedContext
    >
      <div id="demo_dark-mode-by-default">
        <Sheet sx={{ px: 3, py: 1.5, borderRadius: 'sm' }}>
          <Typography
            component="div"
            endDecorator={
              <Chip variant="outlined" color="primary" size="sm">
                Default
              </Chip>
            }
            fontSize="lg"
          >
            Dark mode
          </Typography>
        </Sheet>
      </div>
    </CssVarsProvider>
  );
}
