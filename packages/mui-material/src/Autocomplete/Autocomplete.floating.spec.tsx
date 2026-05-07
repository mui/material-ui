import * as React from 'react';
import { offset, flip, shift, Middleware } from '@floating-ui/react-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FloatingPopup from '@mui/material/FloatingPopup';

// FloatingPopup can be passed as the popper slot
<Autocomplete
  options={['one', 'two', 'three']}
  slots={{ popper: FloatingPopup }}
  renderInput={(params) => <TextField {...params} />}
/>;

// FloatingPopup-specific slotProps compile without `as any`
<Autocomplete
  options={['one', 'two', 'three']}
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      strategy: 'fixed',
      middleware: [offset(8), flip(), shift()],
      transform: false,
      arrowPadding: 4,
    },
  }}
  renderInput={(params) => <TextField {...params} />}
/>;

// Standard Popper props still accepted alongside FloatingPopup props
<Autocomplete
  options={['one', 'two', 'three']}
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      disablePortal: true,
      keepMounted: true,
      placement: 'bottom-end',
      strategy: 'fixed',
    },
  }}
  renderInput={(params) => <TextField {...params} />}
/>;

// Middleware as a variable
const middleware: Middleware[] = [offset(8), flip(), shift()];
<Autocomplete
  options={['one', 'two', 'three']}
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: { middleware },
  }}
  renderInput={(params) => <TextField {...params} />}
/>;

// Without FloatingPopup slot — standard Popper slotProps still work
<Autocomplete
  options={['one', 'two', 'three']}
  slotProps={{
    popper: { placement: 'bottom-end' },
  }}
  renderInput={(params) => <TextField {...params} />}
/>;

// slotProps.popper as a function (ownerState callback form)
<Autocomplete
  options={['one', 'two', 'three']}
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: () => ({
      strategy: 'fixed' as const,
      middleware: [offset(8)],
    }),
  }}
  renderInput={(params) => <TextField {...params} />}
/>;
