import * as React from 'react';
import Radio from '@mui/material/Radio';
import { expectType } from '@mui/types';

// deprecated props
<Radio
  inputProps={{
    'aria-label': 'Radio',
    onChange: () => {},
  }}
  inputRef={null}
/>;

<Radio
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
      'aria-label': 'Radio',
      className: 'input',
    },
  }}
/>;
