import * as React from 'react';
import { SelectUnstyled } from '@mui/base';

declare module '@mui/base' {
  interface SelectUnstyledRootSlotPropsOverrides {
    variant?: 'one' | 'two';
  }
}

<SelectUnstyled slotProps={{ root: { variant: 'one' } }} />;

// @ts-expect-error unknown variant
<SelectUnstyled slotProps={{ root: { variant: 'three' } }} />;
