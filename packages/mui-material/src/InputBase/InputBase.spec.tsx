import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import { expectType } from '@mui/types';

<InputBase
  onInvalid={(event) => {
    expectType<React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
  }}
/>;
