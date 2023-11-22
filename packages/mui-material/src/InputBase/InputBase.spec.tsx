import * as React from 'react';
import { expectType } from '@mui/types';
import InputBase from '@mui/material/InputBase';

<InputBase
  onInvalid={(event) => {
    expectType<React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
  }}
/>;

// Tests presence of `sx` prop on input and root slot
<InputBase
  slotProps={{
    input: {
      sx: {
        background: 'white',
      },
    },
    root: {
      sx: {
        background: 'black',
      },
    },
  }}
/>;
