import * as React from 'react';
import { expectType } from '@mui/types';
import Textarea, { TextareaOwnerState } from '@mui/joy/Textarea';

<Textarea component="div" />;

<Textarea data-testid="any" />;

<Textarea
  slots={{
    root: 'div',
    textarea: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Textarea
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    textarea: {
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

<Textarea
  slotProps={{
    root: (ownerState) => {
      expectType<TextareaOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    textarea: (ownerState) => {
      expectType<TextareaOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<TextareaOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<TextareaOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
