import * as React from 'react';
import { expectType } from '@mui/types';
import Avatar, { AvatarOwnerState } from '@mui/joy/Avatar';

<Avatar />;

<Avatar component="div" />;

// `variant`
<Avatar />;
<Avatar variant="soft" />;
<Avatar variant="outlined" />;
<Avatar variant="solid" />;

// `color`
<Avatar color="primary" />;
<Avatar color="danger" />;
<Avatar color="success" />;
<Avatar color="warning" />;
<Avatar color="neutral" />;

// `size`
<Avatar size="sm" />;
<Avatar size="md" />;
<Avatar size="lg" />;

// @ts-expect-error there is no variant `filled`
<Avatar variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Avatar color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Avatar size="xl2" />;

<Avatar
  slots={{
    root: 'div',
    img: 'div',
    fallback: 'div',
  }}
/>;

<Avatar
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    img: {
      component: 'div',
      'data-testid': 'test',
    },
    fallback: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Avatar
  slotProps={{
    root: (ownerState) => {
      expectType<AvatarOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    img: (ownerState) => {
      expectType<AvatarOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    fallback: (ownerState) => {
      expectType<AvatarOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
