import * as React from 'react';
import { expectType } from '@mui/types';
import InputBase from '@mui/material/InputBase';

<InputBase
  onInvalid={(event) => {
    expectType<React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
  }}
/>;
