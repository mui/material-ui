import * as React from 'react';
import { SliderUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SliderUnstyledRootSlotOverrides {
    variant?: 'one' | 'two';
  }
}

<SliderUnstyled slotProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown color
<SliderUnstyled slotProps={{ root: { variant: 'three' } }} />;
