import * as React from 'react';
import { expectType } from '@mui/types';
import InputBase from '@mui/material-next/InputBase';

<InputBase
  onInvalid={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    expectType<React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
  }}
/>;
