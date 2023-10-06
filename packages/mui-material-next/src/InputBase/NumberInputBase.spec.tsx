import * as React from 'react';
import { expectType } from '@mui/types';
import NumberInputBase from '@mui/material-next/NumberInputBase';

<NumberInputBase
  onInvalid={(event: React.FormEvent<HTMLInputElement>) => {
    expectType<React.FormEvent<HTMLInputElement>, typeof event>(event);
  }}
/>;
