import * as React from 'react';
import Badge from '@mui/material/Badge';

function classesTest() {
  return (
    <Badge badgeContent={4} classes={{ badge: 'testBadgeClassName' }}>
      <div>Hello World</div>
    </Badge>
  );
}
