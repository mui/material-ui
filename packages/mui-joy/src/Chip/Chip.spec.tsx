import * as React from 'react';
import { expectType } from '@mui/types';
import Chip, { ChipOwnerState } from '@mui/joy/Chip';

<Chip />;

<Chip component="div" />;

// `variant`
<Chip />;
<Chip variant="soft" />;
<Chip variant="outlined" />;
<Chip variant="solid" />;

// `color`
<Chip color="primary" />;
<Chip color="danger" />;
<Chip color="success" />;
<Chip color="warning" />;
<Chip color="neutral" />;

// `size`
<Chip size="sm" />;
<Chip size="md" />;
<Chip size="lg" />;

// @ts-expect-error there is no variant `filled`
<Chip variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Chip color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Chip size="xl2" />;

<Chip
  slots={{
    root: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
    action: 'div',
    label: 'div',
  }}
/>;

<Chip
  slotProps={{
    root: {
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
    action: {
      component: 'div',
      'data-testid': 'test',
    },
    label: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Chip
  slotProps={{
    root: (ownerState) => {
      expectType<ChipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<ChipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<ChipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    action: (ownerState) => {
      expectType<ChipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    label: (ownerState) => {
      expectType<ChipOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
