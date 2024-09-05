import * as React from 'react';
import { expectType } from '@mui/types';
import Alert, { AlertOwnerState } from '@mui/joy/Alert';

<Alert />;

<Alert component="div" />;

// `variant`
<Alert />;
<Alert variant="soft" />;
<Alert variant="outlined" />;
<Alert variant="solid" />;

// `color`
<Alert color="primary" />;
<Alert color="danger" />;
<Alert color="success" />;
<Alert color="warning" />;
<Alert color="neutral" />;

// `size`
<Alert size="sm" />;
<Alert size="md" />;
<Alert size="lg" />;

// @ts-expect-error there is no variant `filled`
<Alert variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Alert color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Alert size="xl2" />;

<Alert
  slots={{
    root: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;
<Alert
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
  }}
/>;
<Alert
  slotProps={{
    root: (ownerState) => {
      expectType<AlertOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<AlertOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<AlertOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
