import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

// Strict opt-in: only the explicitly declared keys become assignable, giving
// teams a closed allow-list. An undeclared `data-*` key still errors.
declare module '@mui/utils/types' {
  interface DataAttributesOverrides {
    'data-testid'?: string;
  }
}

<Backdrop
  open
  slotProps={{
    root: {
      'data-testid': 'backdrop-root',
      // @ts-expect-error -- only the declared keys are allowed in the strict form
      'data-custom': 'forwarded',
    },
  }}
/>;
