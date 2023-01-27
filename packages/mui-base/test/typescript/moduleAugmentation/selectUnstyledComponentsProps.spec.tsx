import * as React from 'react';
import { SelectUnstyled, MultiSelectUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SelectUnstyledRootSlotOverrides {
    variant?: 'one' | 'two';
  }

  interface MultiSelectUnstyledRootSlotOverrides {
    variant?: 'a' | 'b';
  }
}

<SelectUnstyled slotProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<SelectUnstyled slotProps={{ root: { variant: 'three' } }} />;

<MultiSelectUnstyled slotProps={{ root: { variant: 'a' } }} />;

// @ts-expect-error unknown variant
<MultiSelectUnstyled slotProps={{ root: { variant: 'c' } }} />;
