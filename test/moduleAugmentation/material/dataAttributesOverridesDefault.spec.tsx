import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';

// No augmentation here, on purpose. This locks the opt-in contract: with an
// un-augmented `DataAttributesOverrides`, `data-*` keys must stay non-assignable
// on slot props. If a future change widens the default, the `@ts-expect-error`
// below becomes unused and this file fails to compile -- catching the regression
// that the loose/allow-list fixtures (which both augment) cannot.
<Backdrop
  open
  slotProps={{
    root: {
      // @ts-expect-error -- data-* is rejected until DataAttributesOverrides is augmented
      'data-testid': 'backdrop-root',
    },
  }}
/>;

// Menu2 popup slots use their own slot props type, so check them too.
<Menu2Popup
  slotProps={{
    root: {
      // @ts-expect-error -- data-* is rejected until DataAttributesOverrides is augmented
      'data-testid': 'menu2-popup',
    },
  }}
/>;
