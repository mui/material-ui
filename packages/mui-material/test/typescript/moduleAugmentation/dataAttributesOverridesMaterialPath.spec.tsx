import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
// The empty import only pulls `@mui/material/utils` into the program so the
// monorepo's source resolution can resolve the augmentation below. Published
// consumers resolve the subpath via the package exports map and do not need it.
import type {} from '@mui/material/utils';

// Augment through the Material-native path. `@mui/material/utils` re-exports
// `DataAttributesOverrides` from `@mui/utils/types`, and augmenting a re-export
// merges into the original interface, so `data-*` becomes assignable on slots.
declare module '@mui/material/utils' {
  interface DataAttributesOverrides {
    [key: `data-${string}`]: string | number | boolean | undefined;
  }
}

<Backdrop
  open
  slotProps={{
    root: {
      'data-testid': 'backdrop-root',
    },
  }}
/>;
