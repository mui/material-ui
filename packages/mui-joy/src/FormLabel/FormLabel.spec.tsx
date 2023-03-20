import * as React from 'react';
import FormLabel, { FormLabelOwnerState } from '@mui/joy/FormLabel';
import { expectType } from '@mui/types';

<FormLabel component="div" />;

<FormLabel data-testid="any" />;

<FormLabel
  slots={{
    root: 'div',
    asterisk: 'div',
  }}
/>;

<FormLabel
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    asterisk: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<FormLabel
  slotProps={{
    root: (ownerState) => {
      expectType<FormLabelOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    asterisk: (ownerState) => {
      expectType<FormLabelOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
