import * as React from 'react';
import { expectType } from '@mui/types';
import Badge, { BadgeOwnerState } from '@mui/material-next/Badge';

function classesTest() {
  return (
    <Badge
      badgeContent={4}
      classes={{ badge: 'testBadgeClassName', colorError: 'colorErrorClass' }}
    >
      <div>Hello World</div>
    </Badge>
  );
}

<Badge />;

<Badge component="div" />;

// `size`
<Badge size="large" />;
<Badge size="small" />;

// @ts-expect-error there is no 'medium' size
<Badge size="medium" />;

// `variant`
<Badge variant="standard" />;
<Badge variant="dot" />;

// @ts-expect-error there is no variant `filled`
<Badge variant="filled" />;

// `color`
<Badge color="primary" />;
<Badge color="secondary" />;
<Badge color="tertiary" />;
<Badge color="error" />;
<Badge color="info" />;
<Badge color="warning" />;
<Badge color="success" />;

// @ts-expect-error there is no color `default`
<Badge color="default" />;

<Badge
  slots={{
    root: 'div',
    badge: 'div',
  }}
/>;

<Badge
  slotProps={{
    root: {
      id: 'test',
    },
    badge: {
      id: 'test',
    },
  }}
/>;

<Badge
  slotProps={{
    root: (ownerState) => {
      expectType<BadgeOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'test',
      };
    },
    badge: (ownerState) => {
      expectType<BadgeOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'test',
      };
    },
  }}
/>;
