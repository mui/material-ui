import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

// Augment the shared `DataAttributesOverrides` interface to opt in to typed
// support for `data-testid` on every MUI slot prop. The augmentation flows
// through `SlotComponentProps` / `SlotComponentPropsWithSlotState` in
// `@mui/utils/types`, and via `SlotProps` in `@mui/material`, to every slot
// of every Material component that wires slot props through these helpers.
declare module '@mui/utils/types' {
  interface DataAttributesOverrides {
    'data-testid'?: string;
  }
}

// After augmentation: `data-testid` is assignable on any Material slot prop.
<Backdrop
  open
  slotProps={{
    root: {
      'data-testid': 'backdrop-root',
    },
  }}
/>;
