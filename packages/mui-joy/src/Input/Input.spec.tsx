import * as React from 'react';
import { expectType } from '@mui/types';
import Input, { InputOwnerState } from '@mui/joy/Input';

<Input component="div" />;

<Input data-testid="any" />;

<Input
  slots={{
    root: 'div',
    input: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Input
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    input: {
      component: 'div',
      'data-testid': 'test',
    },
    startDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    endDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Input
  slotProps={{
    root: (ownerState) => {
      expectType<InputOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<InputOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<InputOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<InputOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
