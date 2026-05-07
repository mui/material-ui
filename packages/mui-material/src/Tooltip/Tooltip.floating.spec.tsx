import * as React from 'react';
import { offset, flip, shift, Middleware } from '@floating-ui/react-dom';
import Tooltip from '@mui/material/Tooltip';
import FloatingPopup from '@mui/material/FloatingPopup';

// FloatingPopup can be passed as the popper slot
<Tooltip title="Hello" slots={{ popper: FloatingPopup }}>
  <button type="button">Hover</button>
</Tooltip>;

// FloatingPopup-specific slotProps compile without `as any`
<Tooltip
  title="Hello"
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      strategy: 'fixed',
      middleware: [offset(8), flip(), shift()],
      transform: false,
      arrowPadding: 8,
    },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// Arrow + FloatingPopup-specific props
<Tooltip
  title="Hello"
  arrow
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      arrowPadding: 4,
      strategy: 'fixed',
    },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// Standard Popper props still accepted alongside FloatingPopup props
<Tooltip
  title="Hello"
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      disablePortal: true,
      keepMounted: true,
      placement: 'top-start',
      strategy: 'fixed',
      middleware: [offset(12)],
    },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// Middleware as a variable
const middleware: Middleware[] = [offset(8), flip(), shift()];
<Tooltip
  title="Hello"
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: { middleware },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// Without FloatingPopup slot — standard Popper slotProps still work
<Tooltip
  title="Hello"
  slotProps={{
    popper: { placement: 'bottom-end' },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// slotProps.popper as a function (ownerState callback form)
<Tooltip
  title="Hello"
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: () => ({
      strategy: 'fixed' as const,
      middleware: [offset(8)],
    }),
  }}
>
  <button type="button">Hover</button>
</Tooltip>;

// All slot overrides together
<Tooltip
  title="Hello"
  arrow
  slots={{ popper: FloatingPopup }}
  slotProps={{
    popper: {
      strategy: 'absolute',
      transform: true,
      arrowPadding: 2,
      middleware: [offset(4), flip(), shift()],
    },
    tooltip: { sx: { maxWidth: 'none' } },
  }}
>
  <button type="button">Hover</button>
</Tooltip>;
