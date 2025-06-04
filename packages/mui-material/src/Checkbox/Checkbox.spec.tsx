import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { expectType } from '@mui/types';

// deprecated props
<Checkbox
  inputProps={{
    'aria-label': 'Checkbox',
    onChange: () => {},
  }}
  inputRef={null}
/>;

<Checkbox
  slots={{
    root: 'div',
    input: 'input',
  }}
  slotProps={{
    root: {
      className: 'root',
      disableRipple: true,
      hidden: true,
    },
    input: {
      ref: (elm) => {
        expectType<HTMLInputElement | null, typeof elm>(elm);
      },
      'aria-label': 'Checkbox',
      className: 'input',
    },
  }}
/>;
