import InputBase from '@mui/material/InputBase';
import { expectType } from '@mui/types';
import React from 'react';

<InputBase
  onInvalid={(event) => {
    expectType<React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
  }}
/>;
