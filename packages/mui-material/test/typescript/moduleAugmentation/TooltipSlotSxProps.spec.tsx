import * as React from 'react';
import { PaletteColor, Tooltip, Button } from '@mui/material';

declare module '@mui/material' {
  interface Palette {
    custom: PaletteColor;
  }
}

// Tooltip slotProps should only allow valid theme palettes to be accessed

<Tooltip
  title="tooltip"
  slotProps={{
    tooltip: {
      sx: {
        color: (theme) => theme.palette.custom.main,
        // @ts-expect-error Property 'invalid' does not exist on 'Palette'
        backgroundColor: (theme) => theme.palette.invalid.main,
      },
    },
    arrow: {
      sx: {
        color: (theme) => theme.palette.custom.main,
        // @ts-expect-error Property 'invalid' does not exist on 'Palette'
        backgroundColor: (theme) => theme.palette.invalid.main,
      },
    },
  }}
>
  <Button>Hover Me!</Button>
</Tooltip>;
