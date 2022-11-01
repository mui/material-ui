import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function DarkModeByDefault() {
  return (
    <CssVarsProvider
      defaultMode="dark"
      // these props are specific to this demo, you might not need them in your app.
      colorSchemeSelector="#demo_dark-mode-by-default"
      modeStorageKey="demo_dark-mode-by-default"
    >
      <Sheet
        id="demo_dark-mode-by-default"
        sx={{ px: 3, py: 1.5, borderRadius: 'sm' }}
      >
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
    </CssVarsProvider>
  );
}
