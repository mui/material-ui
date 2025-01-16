import * as React from 'react';
import { expectType } from '@mui/types';
import Badge, { BadgeOwnerState } from '@mui/joy/Badge';

<Badge />;

<Badge component="div" />;

// `variant`
<Badge variant="soft" />;
<Badge variant="outlined" />;
<Badge variant="solid" />;

// `color`
<Badge color="primary" />;
<Badge color="danger" />;
<Badge color="success" />;
<Badge color="warning" />;
<Badge color="neutral" />;

// @ts-expect-error there is no variant `filled`
<Badge variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Badge color="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Badge elevation="xl2" />;

<Badge
  slots={{
    root: 'div',
    badge: 'div',
  }}
/>;

<Badge
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    badge: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Badge
  slotProps={{
    root: (ownerState) => {
      expectType<BadgeOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    badge: (ownerState) => {
      expectType<BadgeOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
